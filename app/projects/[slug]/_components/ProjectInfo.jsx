import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {MDXRemote} from "next-mdx-remote/rsc";
import Image from "next/image";
import {SecondaryProjectButton} from "@/components/buttons/SecondaryProjectButton";
import {MainProjectButton} from "@/components/buttons/MainProjectButton";

function formatProjectDate(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleDateString('fr-FR', { month: 'long' });
    return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${dateObject.getFullYear()}`;
}

export default async function ProjectInfo({project, minimal}) {

    return (
        <div className="projectPage__info">
            {minimal === true ? "" : <Link href="/projects" className="projectPage__backButton"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Retour</Link>}
            <h1 className="projectPage__info__title">{project.attributes.name}</h1>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <span className="projectPage__info__medium">{project.attributes.medium} // {formatProjectDate(project.attributes.date)}</span>
            <div>

            </div>
            <section className="projectPage__info__section">
                <MDXRemote
                    source={project.attributes.description}
                />
                <div className="projectPage__info__section__credits">
                    {project.attributes.credits ? <MDXRemote source={project.attributes.credits}/> : ""}
                </div>
            </section>
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
            {minimal === true ? "" : <div className="projectPage__info__buttonsWrapper">
                {project.attributes.secondaryButtons.length !== 0 ? project.attributes.secondaryButtons.map((button) => (
                    <SecondaryProjectButton key={button.id} url={button.url} text={button.text} icon={button.icon} targetBlank={true}/>
                )) : ""}
                {project.attributes.mainButton &&  <MainProjectButton url={project.attributes.mainButton.url} text={project.attributes.mainButton.text} targetBlank={true}/>}
            </div>}
            <hr/>
            {minimal === true ? "" : <section className="projectPage__info__section">
                {project.attributes.categories.data.map((category, index) => (
                    <span key={category.id} className="projectPage__info__section__categories">
                                    <Link href={`/projects?categories=${category.attributes.slug}`}>
                                        {category.attributes.name}
                                    </Link>
                        {index < project.attributes.categories.data.length - 1 && ", "}
                                </span>
                ))}
            </section>}
        </div>
    )
}