"use client"
import Link from "next/link";
import PortfolioFilterButton from "@/app/projects/components/PortfolioFilterButton";
import "./PortfolioFilters.scss"

export default function PortfolioFilters({ filters }) {

    return (
        <>
            <menu className="portfolio__filters__menu">
                {filters.map((group) => (
                    <li key={group.id} className="portfolio__filters__menu__label">{group.name}</li>
                ))}
                <Link href={"/projects"}>Effacer les filtres</Link>
            </menu>
            <div className="portfolio__filters__tags">
                {filters[0].content.map((category) => (
                    <PortfolioFilterButton
                        key={category.id}
                        type="categories"
                        name={category.attributes.name}
                        slug={category.attributes.slug}
                        areMultipleFiltersAllowed={true}
                    />
                ))}
            </div>
            <div className="portfolio__tags">
                {filters[1].content.map((tech) => (
                    <PortfolioFilterButton
                        key={tech.id}
                        type="techs"
                        name={tech.attributes.name}
                        slug={tech.attributes.slug}
                        areMultipleFiltersAllowed={true}
                    />
                ))}
            </div>
        </>
    );
}
