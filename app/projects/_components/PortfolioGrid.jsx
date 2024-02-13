"use client"

import Loading from "@/components/loading/Loading";
import Link from "next/link";
import Image from "next/image";
import {Suspense, useRef} from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export default function PortfolioGrid({ projects }) {

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <Suspense fallback={<Loading />}>
            <div className="portfolio">
                <div ref={targetRef} className="portfolio__wrapper">
                    <div className="portfolio__grid__wrapper">
                        <motion.div className="portfolio__grid" style={{x}}>
                            {projects.map((project) => (
                                <Link href={`/projects/${project.attributes.slug}`} key={project.id}>
                                    <div className="portfolio__grid__card" id={project.attributes.slug}>
                                        <div className="portfolio__grid__card__categories">
                                        </div>
                                        <div className="portfolio__grid__card__content">
                                            <h2 className="portfolio__grid__card__content__title">{project.attributes.name}</h2>
                                            <p className="portfolio__grid__card__content__subheading">{project.attributes.medium}</p>
                                        </div>
                                        <Image
                                            src={`http://localhost:1337${project.attributes.card.data.attributes.url}`}
                                            width={350}
                                            height={350}
                                            alt="image"
                                            className="portfolio__grid__card__image"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
            {projects.length === 0 && (
                <p className="text-center">Aucun projet à afficher.</p>
            )}
        </Suspense>
    )
}