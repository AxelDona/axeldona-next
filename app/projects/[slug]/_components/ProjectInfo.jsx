"use client"

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {MainProjectButton} from "@/components/buttons/MainProjectButton";
import {SecondaryProjectButton} from "@/components/buttons/SecondaryProjectButton";
import { FiArrowLeft, FiChevronDown, FiMaximize2 } from "react-icons/fi";

function formatProjectDate(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleDateString('fr-FR', { month: 'long' });
    return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${dateObject.getFullYear()}`;
}

export default function ProjectInfo({project, minimal = false, collapsible = false}) {

    const [isExpanded, setIsExpanded] = useState(!collapsible);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <motion.div
            className={`projectPage__info ${collapsible ? "collapsible" : "fixed"} ${
                isExpanded ? "expanded" : "collapsed"
            }`}
            initial={{ opacity: collapsible ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            onClick={() => collapsible && !isExpanded && toggleExpand()}
        >
            {minimal || collapsible ? "" : <Link href="/projects" className="projectPage__backButton"><FiArrowLeft className="icon"/>&nbsp;Retour</Link>}
            <div className="projectPage__info__header"
                onClick={(e) => {
                    if (isExpanded && collapsible) {
                        e.stopPropagation();
                        toggleExpand();
                    }
                }}>
                <h1 className="projectPage__info__header__title">{project.attributes.name}</h1>
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <span className="projectPage__info__header__subheading">{project.attributes.medium} // {formatProjectDate(project.attributes.date)}</span>
                <div className="projectPage__info__header__icon closeIcon">
                    <FiChevronDown/>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="projectPage__info__collapsibleSection"
                        initial={{ height: collapsible ? 0 : "auto", opacity: collapsible ? 0 : 1 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.25, ease: "easeInOut" },
                            opacity: { duration: 0.4, delay: 0.2 }
                        }}
                    >
                        <section className="projectPage__info__collapsibleSection__content">
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer">
                                            {props.children}
                                        </a>
                                    ),
                                }}
                            >{project.attributes.description}</ReactMarkdown>
                            <div className="projectPage__info__collapsibleSection__credits">
                                <ReactMarkdown
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <a {...props} target="_blank" rel="noopener noreferrer">
                                                {props.children}
                                            </a>
                                        ),
                                    }}
                                >{project.attributes.credits}</ReactMarkdown>
                            </div>
                        </section>
                        <section className="projectPage__info__collapsibleSection__footer">
                            <div className="projectPage__info__collapsibleSection__footer__techsWrapper">
                                {project.techs.map((tech) => (
                                    <div
                                        key={tech.id}
                                        className="projectPage__info__collapsibleSection__footer__techsWrapper__techWrapper"
                                    >
                                        <Image
                                            width={50}
                                            height={50}
                                            className="projectPage__info__collapsibleSection__footer__techsWrapper__techWrapper__techImage"
                                            src={`http://localhost:1337${tech.icon}`}
                                            alt={`Logo ${tech.attributes.name}`}
                                        />
                                        <span className="projectPage__info__collapsibleSection__footer__techsWrapper__techWrapper__techTooltip">
                      {tech.attributes.name}
                    </span>
                                    </div>
                                ))}
                            </div>
                            <div className="projectPage__info__collapsibleSection__footer__buttonsWrapper">
                                {project.attributes.secondaryButtons.length !== 0
                                    ? project.attributes.secondaryButtons.map((button) => (
                                        <SecondaryProjectButton
                                            key={button.id}
                                            url={button.url}
                                            text={button.text}
                                            icon={button.icon}
                                            targetBlank={true}
                                        />
                                    ))
                                    : ""}
                                {project.attributes.mainButton && (
                                    <MainProjectButton
                                        url={project.attributes.mainButton.url}
                                        text={project.attributes.mainButton.text}
                                        targetBlank={true}
                                    />
                                )}
                            </div>
                            <section className="projectPage__info__collapsibleSection__footer__categories">
                                <hr />
                                {project.attributes.categories.data.map((category, index) => (
                                    <span
                                        key={category.id}
                                        className="projectPage__info__collapsibleSection__footer__categories__list"
                                    >
                                    <Link href={`/projects?categories=${category.attributes.slug}`}>
                                    {category.attributes.name}
                                    </Link>
                                        {index < project.attributes.categories.data.length - 1 && ", "}
                                </span>
                                ))}
                            </section>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
            {collapsible && (
                <>
                    <div className="projectPage__info__icon openIcon">
                        <FiMaximize2/>
                    </div>
                </>
            )}
        </motion.div>
    )
}