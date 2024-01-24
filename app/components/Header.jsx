import "./header.scss"
import Link from "next/link";
import Image from 'next/image'

export function Header() {
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