import Link from "next/link";

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
        // Handle case when project is not found
        return <div>Project not found</div>;
    }

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
                {project.techs.map((tech) => (
                    <>
                        <span key={tech.id}>
                            {tech.attributes.name}
                        </span>
                        <img src={`http://localhost:1337${tech.icon}`} alt={`Logo ${tech.attributes.name}`}/>
                    </>
                ))}
                <p>{project.attributes.description}</p>
            </div>

        </div>
    )
}