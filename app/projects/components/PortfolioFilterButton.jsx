"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./PortfolioFilters.scss";

export default function PortfolioFilterButton({ type, name, slug, icon, areMultipleFiltersAllowed }) {

    const params = useSearchParams();
    const active = params.get(type) || "";

    const toggleSingleQuery = (key, value) => {
        const query = Object.fromEntries(params);
        if (query[key] === value){
            delete query[key];
        } else {
            query[key] = value;
        }
        return query;
    }

    const toggleMultipleQueries = (key, value) => {
        const query = Object.fromEntries(params);
        let values = query[key] ? query[key].split(",") : [];
        if (values.includes(value)){
            values = values.filter((v) => v!== value)
        } else {
            values.push(value);
        }
        if (values.length === 0){
            delete query[key];
        } else {
            query[key] = values.join(",");
        }
        return query;
    }

    return (
        <Link
            href={
                areMultipleFiltersAllowed
                    ? {
                        pathname: "/projects",
                        query: toggleMultipleQueries(type, slug),
                    }
                    : {
                        pathname: "/projects",
                        query: toggleSingleQuery(type, slug),
                    }
            }
            scroll={false}
            className={`portfolio__filters__accordion__tags__tag ${
                active.includes(slug) ? "selected" : ""
            } ${slug}-tag`}
        >
            {icon ?
                <img key={type.id}
                     src={`http://localhost:1337${icon}`}
                     alt={`Logo ${name}`}
                     title={name}
                     className="portfolio__filters__accordion__tags__tag__logo"
                />
                : ""}
            {name}
        </Link>
    );
}