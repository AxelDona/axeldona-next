import Link from "next/link";
import {Suspense} from "react";
import Loading from "@/components/loading/Loading";
import "./projectPage.scss";
import Image from 'next/image'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {MediaSingleImage,} from "@/app/projects/[slug]/_components/MediaSinglelmage";
import {MediaYoutube} from "@/app/projects/[slug]/_components/MediaYoutube";
import {MainProjectButton} from "@/components/buttons/MainProjectButton";
import {SecondaryProjectButton} from "@/components/buttons/SecondaryProjectButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

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
                <div className="projectNav projectNav--left">
                    <div className="projectNav__image"></div>
                </div>
                <div className="projectNav projectNav--right">
                    <div className="projectNav__image"></div>
                </div>
                <div className="projectPage" key={project.id}>
                    <div className="projectPage__mediaWrapper">
                        <div className="projectPage__media">
                            {project.attributes.layout === "singleImage" ? <MediaSingleImage data={project.attributes.images.data} />: ""}
                            {project.attributes.layout === "youtube" ? <MediaYoutube data={project.attributes.youtube} />: ""}
                        </div>
                    </div>
                    <div className="projectPage__info">
                        <Link href="/projects" className="projectPage__backButton"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Retour</Link>
                        <h1 className="projectPage__info__title">{project.attributes.name}</h1>
                        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                        <span className="projectPage__info__medium">{project.attributes.medium} // {formatProjectDate(project.attributes.date)}</span>
                        <section className="projectPage__info__section">
                            <MDXRemote
                                source={project.attributes.description}
                            />
                        </section>
                        <div className="projectPage__info__date">

                        </div>
                        <section className="projectPage__info__section">
                            <div className="projectPage__info__techsWrapper">
                                {project.techs.map((tech) => (
                                    <div key={tech.id} className="projectPage__info__techsWrapper__techWrapper">
                                        <Image
                                            width={50}
                                            height={50}
                                            className="projectPage__info__techsWrapper__techWrapper__techImage"
                                            src={`http://localhost:1337${tech.icon}`}
                                            alt={`Logo ${tech.attributes.name}`}
                                        />
                                        <span className="projectPage__info__techsWrapper__techWrapper__techTooltip">{tech.attributes.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <div className="projectPage__info__buttonsWrapper">
                            {project.attributes.secondaryButtons.length !== 0 ? project.attributes.secondaryButtons.map((button) => (
                                <SecondaryProjectButton key={button.id} url={button.url} text={button.text} icon={button.icon} targetBlank={true}/>
                            )) : ""}
                            {project.attributes.mainButton &&  <MainProjectButton url={project.attributes.mainButton.url} text={project.attributes.mainButton.text} targetBlank={true}/>}
                        </div>
                        <hr/>
                        <section className="projectPage__info__section">
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
                </div>
            </Suspense>
        </main>
    )
}