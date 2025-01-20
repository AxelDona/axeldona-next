"use client"

import Link from "next/link";
import Image from "next/image";
import {SecondaryProjectButton} from "@/components/buttons/SecondaryProjectButton";
import {MainProjectButton} from "@/components/buttons/MainProjectButton";
import { FiArrowLeft } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import {useState} from "react";

function formatProjectDate(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleDateString('fr-FR', { month: 'long' });
    return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${dateObject.getFullYear()}`;
}

export default function ProjectInfo({project, minimal = false, collapsible = false}) {

    const [isCollapsible, setIsCollapsible] = useState(collapsible);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div
            className={`projectPage__info ${isCollapsible ? "collapsible" : ""} ${isExpanded ? "expanded" : "collapsed"}`}
            onClick={() => !isExpanded && toggleExpand()}
        >
            {minimal === true ? "" : <Link href="/projects" className="projectPage__backButton"><FiArrowLeft className="icon"/>&nbsp;Retour</Link>}
            <h1 className="projectPage__info__title">{project.attributes.name}</h1>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <span className="projectPage__info__medium">{project.attributes.medium} // {formatProjectDate(project.attributes.date)}</span>
            <div className="projectPage__info__collapsible">
                <section className="projectPage__info__section">
                    <ReactMarkdown>{project.attributes.description}</ReactMarkdown>
                    <div className="projectPage__info__section__credits">
                        <ReactMarkdown>{project.attributes.credits}</ReactMarkdown>
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
                {minimal === true ? "" : <section className="projectPage__info__section">
                    <hr/>
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
        </div>
    )
}