import Link from "next/link";
import {Suspense} from "react";
import Loading from "@/app/Loading";
import "./project.scss";
import Image from 'next/image'

async function getProject(slug) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch(`http://localhost:1337/api/projects?populate=*&filters[slug][$eq]=${slug}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { revalidate: 60 }
    });

    const data = await res.json();

    // Check if data is available
    if (data.data && data.data.length > 0) {
        const project = data.data[0];

        // Fetch tech icons for each tech in the project
        const techsPromises = project.attributes.techs.data.map(async (tech) => {
            const techIcon = await getTechIcon(tech.attributes.slug);

            // Check if techIcon is not null before accessing its properties
            return { ...tech, icon: techIcon.attributes.icon.data ? techIcon.attributes.icon.data.attributes.url : "" };
        });

        // Wait for all tech icons to be fetched
        const techs = await Promise.all(techsPromises);

        // Update project with the techs including their icons
        return { ...project, techs };
    }

    return null;
}

async function getTechIcon(slug) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch(`http://localhost:1337/api/techs?populate=*&filters[slug][$eq]=${slug}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { revalidate: 60 }
    });

    const data = await res.json();

    return data.data[0];
}

export default async function Project({ params }) {
    const project = await getProject(params.slug);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <Link href="/projects">Retour</Link>
            <Suspense fallback={<Loading/>}>
                <div className="container projetPage" key={project.id}>
                    <div className="projectPage__info">
                        <h1 className="projectPage__info__title">{project.attributes.name}</h1>
                        <span className="projectPage__info__medium">{project.attributes.medium}</span>
                        <section className="projectPage__info__section">
                            <div className="projectPage__info__techsWrapper">
                                {project.techs.map((tech) => (
                                    <Image
                                        key={tech.id}
                                        width={30}
                                        height={30}
                                        src={`http://localhost:1337${tech.icon}`}
                                        alt={`Logo ${tech.attributes.name}`}
                                        title={tech.attributes.name}
                                    />
                                ))}
                            </div>
                        </section>
                        <section className="projectPage__info__section">
                            <p>{project.attributes.description}</p>
                        </section>
                    </div>
                    <div className="projectPage__image"></div>
                    <section className="projectPage__info__section">
                        <h2 className="projectPage__info__section__title">Catégories</h2>
                        {project.attributes.categories.data.map((category, index) => (
                            <span key={category.id} className="projectPage__info__section__categories">
                                    <Link href={`/projects?categories=${category.attributes.slug}`}>
                                        {category.attributes.name}
                                    </Link>
                                {index < project.attributes.categories.data.length - 1 && ", "}
                                </span>
                        ))}
                    </section>

                </div>
            </Suspense>
        </div>
    )
}