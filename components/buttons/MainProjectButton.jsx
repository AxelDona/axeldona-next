import Link from "next/link";
import "./projectButton.scss"

export function MainProjectButton({text, url, icon, targetBlank}) {



    return (
        <>
            <Link href={url} target={targetBlank ? "_blank" : "_self"} className="projectButton primary">{text ? text+" " : ""}</Link>
        </>
    )
}