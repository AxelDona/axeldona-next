import Link from "next/link";
import "./aboutButton.scss";

export function AboutButton() {
    return (
        <div className="aboutButton">
            <Link href="/" className="aboutButton__link">
                À propos de moi
            </Link>
        </div>
)
}