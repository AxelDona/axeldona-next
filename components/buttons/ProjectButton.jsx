import Link from "next/link";
import "./projectButton.scss"

export function ProjectButton({text, url}) {
    return (
        <>
            <Link href={url} target="_blank" className="projectButton">{text}</Link>
        </>
    )
}