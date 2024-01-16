import Link from "next/link";

async function getProject(slug){

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch('http://localhost:1337/api/projects?populate=*&filters[slug][$eq]='+slug, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}`
        },
        next: {revalidate : 60}
    })

    const data = await res.json()

    return data.data[0]
}

export default async function Project({ params }) {
    const project = await getProject(params.slug);

    return (
        <div>
            <Link href="/projects">Retour</Link>
            <div key={project.id}>
                <p>#{project.id}</p>
                <h3>Nom du projet : {project.attributes.name}</h3>
                <p>Medium : {project.attributes.medium}</p>
                <p>Catégories</p>
                {project.attributes.categories.data.map((category) => (
                    <span key={category.id}>{category.attributes.name}</span>
                ))}
                <p>Techs</p>
                {project.attributes.techs.data.map((tech) => (
                    <span key={tech.id}>{tech.attributes.name}</span>
                ))}
                <p>{project.attributes.description}</p>
            </div>

        </div>
    )
}