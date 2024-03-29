"use client"

import Loading from "@/components/loading/Loading";
import Link from "next/link";
import Image from "next/image";
import {Suspense, useRef, useState} from "react";

export default function PortfolioGrid({ projects }) {
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [mouseMovementSinceClick, setMouseMovementSinceClick] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);
        setMouseMovementSinceClick(e.screenX);
    }
    const handleMouseLeave = () => {
        setIsMouseDown(false);
    }
    const handleMouseUp = () => {
        setIsMouseDown(false);
    }
    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x-startX)*2;
        itemsRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleWheelScroll = (e) => {
        e.preventDefault();
        itemsRef.current.scrollLeft += 6*(e.deltaY);
    };

    const preventDragHandler = (e) => {
        e.preventDefault();
    }

    const handleClick = (e) => {
        const delta = Math.abs(e.screenX - mouseMovementSinceClick);
        if (delta > 6) {
            e.preventDefault();
        }
        setMouseMovementSinceClick(0);
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="portfolio">
                <div className="portfolio__wrapper">
                        <div className="portfolio__grid" ref={itemsRef} id="scrollableContent"
                             onMouseDown={handleMouseDown}
                             onMouseLeave={handleMouseLeave}
                             onMouseUp={handleMouseUp}
                             onMouseMove={handleMouseMove}
                             onWheel={handleWheelScroll}
                             onDragStart={preventDragHandler}
                        >
                            {projects.map((project) => (
                                <Link href={`/projects/${project.attributes.slug}`}
                                      key={project.id}
                                      onClick={handleClick}>
                                    <div className="portfolio__grid__card" id={project.attributes.slug}>
                                        <div className="portfolio__grid__card__categories">
                                        </div>
                                        <div className="portfolio__grid__card__content">
                                            <h2 className="portfolio__grid__card__content__title">{project.attributes.name}</h2>
                                            <p className="portfolio__grid__card__content__subheading">{project.attributes.medium}</p>
                                        </div>
                                        <Image
                                            src={`http://localhost:1337${project.attributes.card.data.attributes.url}`}
                                            width={500}
                                            height={500}
                                            alt="image"
                                            className="portfolio__grid__card__image"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                </div>
            </div>
            {projects.length === 0 && (
                <p className="text-center">Aucun projet à afficher.</p>
            )}
        </Suspense>
    )
}