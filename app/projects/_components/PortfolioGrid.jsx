"use client"

import Loading from "@/components/loading/Loading";
import Link from "next/link";
import Image from "next/image";
import {Suspense} from "react";

export default function PortfolioGrid({ projects }) {

    const handleScroll = (event) => {
        const container = event.target;
        const scrollAmount = event.deltaY;
        container.scrollTo({
            top: 0,
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <Suspense fallback={<Loading />}>
            <div className="portfolio">
                <div className="portfolio__wrapper">
                    <div className="portfolio__grid__wrapper" onWheel={handleScroll}>
                        <div className="portfolio__grid">
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
                        </div>
                    </div>
                </div>
            </div>
            {projects.length === 0 && (
                <p className="text-center">Aucun projet à afficher.</p>
            )}
        </Suspense>
    )
}