import "./projects.scss";
import {Header} from "@/components/header/Header";
import PortfolioGrid from "@/app/projects/_components/PortfolioGrid";

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
            <main className="under-header">
                <PortfolioGrid projects={projects}/>
            </main>
        </>
    )
}