import Link from "next/link";

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

                <div key={project.id}>
                    <Link href={`/projects/${project.attributes.slug}`}>
                        <div className="card" id={project.attributes.slug}>
                            <div className="card__categories">
                            </div>
                            <div className="card__content">
                                <h2 className="card__title">{project.attributes.name}</h2>
                                <p className="card__subheading">{project.attributes.medium}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            {projects.length === 0 && (
                <p className="text-center">No projects.</p>
            )}

        </div>
    )
}