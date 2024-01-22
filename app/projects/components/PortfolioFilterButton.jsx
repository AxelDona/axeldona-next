"use client";
import { useState } from "react";
import Link from "next/link";

export default function PortfolioFilterButton(props) {
    const [isSelected, setIsSelected] = useState(props.isSelected);

    const handleFilterClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <Link
            href={`?category=${props.slug}`}
            className={`portfolio__tags__tag ${isSelected ? "selected" : ""}`}
            onClick={handleFilterClick}
        >
            {props.name}
        </Link>
    );
}