import Link from "next/link";
import Image from "next/image";
import "./ProjectList.scss";

async function getProjects(){

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch('http://localhost:1337/api/projects?populate=*', {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}`
        },
        next: {revalidate : 60}
    })

    const data = await res.json()

    return data.data
}

export default async function ProjectList() {
    const projects = await getProjects();

    return (
        <div className="grid cards">
            {projects.map((project) => (
                <Link href={`/projects/${project.attributes.slug}`} key={project.id}>
                    <div className="projectCard" id={project.attributes.slug}>
                        <div className="projectCard__categories">
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
    )
}