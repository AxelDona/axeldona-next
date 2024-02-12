import "./header.scss"
import Link from "next/link";
import Image from 'next/image'
import PortfolioFilters from "@/components/header/PortfolioFilters";

async function getCategories() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch('http://localhost:1337/api/categories', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { revalidate: 60 }
    });

    const data = await res.json();

    return data.data.map(category => ({...category, active: false}));
}

async function getTechs() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const res = await fetch('http://localhost:1337/api/techs?populate[0]=icon&sort=name', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { revalidate: 60 }
    });

    const data = await res.json();

    return data.data.map(category => ({...category, active: false}));
}


export async function Header() {
    const categories = await getCategories();
    const techs = await getTechs();
    const filters = [
        {
            "id": 0,
            "content": categories,
            "name": "Catégories",
            "slug": "categories"
        },
        {
            "id": 1,
            "content": techs,
            "name": "Technologies",
            "slug": "techs"
        }
    ];

    return (
        <header className="header">
            <div className="header__leftWrapper">
                <Link href="/" className="header__leftWrapper__homeLink">
                    <Image
                        src="/assets/icons/logoaxeldona.svg"
                        height={50}
                        width={85}
                        className="header__leftWrapper__homeLink__image"
                    />
                </Link>
            </div>
            <div className="header__centerWrapper">
                <PortfolioFilters filters={filters}/>
            </div>
            <div className="header__rightWrapper">
                <nav>
                    <ul>
                        <li>
                            À propos de moi
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}