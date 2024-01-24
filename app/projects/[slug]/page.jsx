import Link from "next/link";
import {Suspense} from "react";
import Loading from "@/app/Loading";
import "./projectPage.scss";
import Image from 'next/image'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {MediaSingleImage,} from "@/app/projects/[slug]/components/MediaSinglelmage";
import {MediaYoutube} from "@/app/projects/[slug]/components/MediaYoutube";

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

function formatProjectDate(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleDateString('fr-FR', { month: 'long' });
    return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${dateObject.getFullYear()}`;
}


export default async function Project({ params }) {
    const project = await getProject(params.slug);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <main>
            <Suspense fallback={<Loading/>}>
                <div className="container--twoColumns projectPage" key={project.id}>
                    <Link href="/projects" className="projectPage__backButton">Retour</Link>
                    <div className="projectPage__info">
                        <h1 className="projectPage__info__title">{project.attributes.name}</h1>
                        <span className="projectPage__info__medium">{project.attributes.medium}</span>
                        <div className="projectPage__info__date">
                            {formatProjectDate(project.attributes.date)}
                        </div>
                        <section className="projectPage__info__section">
                            <div className="projectPage__info__techsWrapper">
                                {project.techs.map((tech) => (
                                    <div key={tech.id} className="projectPage__info__techsWrapper__techWrapper">
                                        <Image
                                            width={28}
                                            height={28}
                                            className="projectPage__info__techsWrapper__techWrapper__techImage"
                                            src={`http://localhost:1337${tech.icon}`}
                                            alt={`Logo ${tech.attributes.name}`}
                                        />
                                        <span className="projectPage__info__techsWrapper__techWrapper__techTooltip">{tech.attributes.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="projectPage__info__section">
                            <MDXRemote
                                source={project.attributes.description}
                            />
                        </section>
                        <hr/>
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
                    <div className="projectPage__media">
                        {project.attributes.layout === "singleImage" ? <MediaSingleImage data={project.attributes.images.data} />: ""}
                        {project.attributes.layout === "youtube" ? <MediaYoutube data={project.attributes.youtube} />: ""}
                    </div>
                </div>
            </Suspense>
        </main>
    )
}