import Link from "next/link";
import "./projectButton.scss"

export function SecondaryProjectButton({text, url, icon, targetBlank}) {


    return (
        <>
            <Link href={url} target={targetBlank ? "_blank" : "_self"} className="projectButton secondary">{text ? " " + text : ""}</Link>
        </>
    )
}