import {Suspense} from "react";
import Loading from "@/app/Loading";
import Link from "next/link";
import Image from "next/image";
import "./ProjectList.scss";
import PortfolioFilterButton from "@/app/projects/components/PortfolioFilterButton";

async function getProjects(category){

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    let apiUrl = 'http://localhost:1337/api/projects?populate=*'
    if (category) {
        apiUrl += `&filters[categories][slug][$eq]=${category}`;
    }

    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}`
        },
        next: {revalidate : 60}
    })

    const data = await res.json()

    return data.data
}

async function getCategories() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch('http://localhost:1337/api/categories', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { revalidate: 60 }
    });

    const data = await res.json();

    return data.data.map(category => ({...category, active: false}));
}

export default async function Projects({ searchParams }) {
    const projects = await getProjects(searchParams.category);
    const categories = await getCategories();

    return (
        <main>
            <nav>
                <div>
                    <h2>Nav</h2>
                </div>
            </nav>
            <div className="container">
                <div className="titleWrapper">
                    <h1>Portfolio</h1>
                    <div className="titleSeparator"></div>
                </div>
                <Suspense fallback={<Loading/>}>
                    <div className="portfolio__tags">
                        {categories.map((category) => (
                            <PortfolioFilterButton key={category.id} type="category" name={category.attributes.name} slug={category.attributes.slug}/>
                        ))}
                    </div>
                    <div className="grid cards">
                        {projects.map((project) => (
                            <Link href={`/projects/${project.attributes.slug}`} key={project.id}>
                                <div className="projectCard" id={project.attributes.slug}>
                                    <div className="projectCard__categories">
                                        {project.attributes.categories.data.map((category) => (
                                            <span key={category.id}>{category.attributes.name}</span>
                                        ))}
                                    </div>
                                    <div className="projectCard__content">
                                        <h2 className="projectCard__title">{project.attributes.name}</h2>
                                        <p className="projectCard__subheading">{project.attributes.medium}</p>
                                    </div>
                                    <Image
                                        src={`/../../assets/img/project-cards/${project.attributes.slug}_card.jpg`}
                                        width={500}
                                        height={500}
                                        alt="image"
                                        className="projectCard__image"
                                    />
                                </div>
                            </Link>
                        ))}
                        {projects.length === 0 && (
                            <p className="text-center">No projects.</p>
                        )}

                    </div>
                </Suspense>
            </div>
        </main>
    )
}