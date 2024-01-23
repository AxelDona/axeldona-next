"use client"
import { useState } from 'react';
import Link from 'next/link';
import PortfolioFilterButton from '@/app/projects/components/PortfolioFilterButton';
import './PortfolioFilters.scss';
import { useSearchParams } from "next/navigation";

export default function PortfolioFilters({ filters }) {
    const [openGroup, setOpenGroup] = useState(null);

    const handleLabelClick = (groupId) => {
        setOpenGroup((prevOpenGroup) => (prevOpenGroup === groupId ? null : groupId));
    };

    const handleClearFilters = () => {
        setOpenGroup(null); // Close all groups when clearing filters
        // You can add additional logic to handle clearing filters if needed
    };

    const params = useSearchParams();
    const query = Object.fromEntries(params);

    return (
        <>
            <menu className="portfolio__filters__menu">
                {filters.map((group) => (
                    <li
                        key={group.id}
                        className={`portfolio__filters__menu__label ${openGroup === group.id ? "open" : ""} ${query[group.slug] ? "active" : ""} `}
                        onClick={() => handleLabelClick(group.id)}
                    >
                        {group.name+" "}
                    </li>
                ))}
                {Object.keys(query).length === 0 ? "" : <Link href="/projects" scroll={false} onClick={handleClearFilters} className="portfolio__filters__menu__label clear">Effacer les filtres</Link> }
            </menu>
            <hr/>
            <section className="portfolio__filters__accordion">
                {filters.map((group) => (
                    <div
                        key={group.id}
                        className={`portfolio__filters__accordion__tags ${group.slug}-tags ${openGroup === group.id ? 'open' : ''}`}
                    >
                        {group.content.map((type) => (
                            <PortfolioFilterButton
                                key={type.id}
                                type={group.slug}
                                name={type.attributes.name}
                                slug={type.attributes.slug}
                                areMultipleFiltersAllowed={true}
                            />
                        ))}
                    </div>
                ))}
            </section>
        </>
    );
}
