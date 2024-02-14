import {Suspense} from "react";
import Loading from "@/components/loading/Loading";
import "./projectPage.scss";
import MediaLayout from "@/app/projects/[slug]/_components/MediaLayout";
import VideoLayout from "@/app/projects/[slug]/_components/VideoLayout";

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
        <main>
            <Suspense fallback={<Loading/>}>
                {project.attributes.layout === "singleImage" ? <MediaLayout project={project}/> : ""}
                {project.attributes.layout === "video" ? <VideoLayout project={project}/> : ""}
            </Suspense>
        </main>
    )
}