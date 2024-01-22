"use client"
import { useState } from 'react';
import Link from 'next/link';
import PortfolioFilterButton from '@/app/projects/components/PortfolioFilterButton';
import './PortfolioFilters.scss';
import {useSearchParams} from "next/navigation";

export default function PortfolioFilters({ filters }) {
    const [activeGroup, setActiveGroup] = useState(null);

    const handleLabelClick = (groupId) => {
        setActiveGroup(groupId);
    };

    const params = useSearchParams();
    const query = Object.fromEntries(params);

    return (
        <>
            <menu className="portfolio__filters__menu">
                {filters.map((group) => (
                    <li
                        key={group.id}
                        className={`portfolio__filters__menu__label ${activeGroup === group.id ? 'active' : ''}`}
                        onClick={() => handleLabelClick(group.id)}
                    >
                        {group.name}
                    </li>
                ))}
                {Object.keys(query).length === 0 ? "" : <Link href="/projects">Effacer les filtres</Link> }
            </menu>
            {filters.map((group) => (
                <div
                    key={group.id}
                    className={`portfolio__filters__tags ${group.slug}-tags ${activeGroup === group.id ? 'open' : ''}`}
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
        </>
    );
}
