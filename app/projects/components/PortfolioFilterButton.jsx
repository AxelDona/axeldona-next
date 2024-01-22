"use client";
import { useState } from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function PortfolioFilterButton({type, name, slug}) {
    const [isSelected, setIsSelected] = useState(false);
    const params = useSearchParams();

    const handleFilterClick = () => {
        setIsSelected(!isSelected);
    };

    const toggleQuery = (key, value) => {
        const query = Object.fromEntries(params);
        if (query[key] === value){
            delete query[key];
        } else {
            query[key] = value;
        }

        return query;
    }

    return (
        <Link
            href={{
                pathname: "/projects",
                query: toggleQuery(type, slug)
            }}
            className={`portfolio__tags__tag ${isSelected ? "selected" : ""}`}
            onClick={handleFilterClick}
        >
            {name}
        </Link>
    );
}