import Link from "next/link";
import Image from "next/image";
import "./homeLogo.scss";

export function HomeLogo() {
    return (
        <div className="homeLogo">
            <Link href="/" className="homeLogo__link">
                <Image
                    src="/assets/icons/logoaxeldona.svg"
                    height={50}
                    width={85}
                    className="homeLogo__link__image"
                />
            </Link>
        </div>
)
}