import Link from "next/link";
import "./projectButton.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGithub, faBandcamp } from '@fortawesome/free-brands-svg-icons';

export function SecondaryProjectButton({text, url, icon, targetBlank}) {

    let buttonIcon = "";

    if (icon === "github"){
        buttonIcon = faGithub;
    } else if (icon === "bandcamp"){
        buttonIcon = faBandcamp;
    }

    return (
        <>
            <Link href={url} target={targetBlank ? "_blank" : "_self"} className="projectButton secondary"><FontAwesomeIcon icon={buttonIcon}/>{text ? " " + text : ""}</Link>
        </>
    )
}