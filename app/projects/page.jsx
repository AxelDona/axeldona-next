import {Suspense} from "react";
import Loading from "@/components/loading/Loading";
import Link from "next/link";
import Image from "next/image";
import "./projects.scss";
import {Header} from "@/components/header/Header";

async function getProjects(params) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    let apiUrl = 'http://localhost:1337/api/projects?populate=*&sort=date:desc';

    if (params) {
        const filterKeys = Object.keys(params);

        filterKeys.forEach((key, typeIndex) => {
            const values = params[key].split(',');

            values.forEach((value, valueIndex) => {
                apiUrl += `&filters[$and][${typeIndex}][$or][${valueIndex}][${key}][slug][$eq]=${value}`;
            });
        });
    }

    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}`,
        },
        next: { revalidate: 60 },
    });

    const data = await res.json();

    return data.data;
}

export default async function Projects({ searchParams }) {
    const projects = await getProjects(searchParams);
    return (
        <>
            <Header/>
            <main>
                <div className="container portfolio">
                    <Suspense fallback={<Loading/>}>
                        <div className="portfolio__grid">
                            {projects.map((project) => (
                                <Link href={`/projects/${project.attributes.slug}`} key={project.id}>
                                    <div className="portfolio__grid__card" id={project.attributes.slug}>
                                        <div className="portfolio__grid__card__categories">
                                        </div>
                                        <div className="portfolio__grid__card__content">
                                            <h2 className="portfolio__grid__card__content__title">{project.attributes.name}</h2>
                                            <p className="portfolio__grid__card__content__subheading">{project.attributes.medium}</p>
                                        </div>
                                        <Image
                                            src={`http://localhost:1337${project.attributes.card.data.attributes.url}`}
                                            width={350}
                                            height={350}
                                            alt="image"
                                            className="portfolio__grid__card__image"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {projects.length === 0 && (
                            <p className="text-center">Aucun projet à afficher.</p>
                        )}
                    </Suspense>
                </div>
            </main>
        </>
    )
}