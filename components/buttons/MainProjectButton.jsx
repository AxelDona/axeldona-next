import Link from "next/link";
import "./projectButton.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function MainProjectButton({text, url, icon, targetBlank}) {

    let buttonIcon = "";

    if (icon === "github"){
        buttonIcon = faGithub;
    }


    return (
        <>
            <Link href={url} target={targetBlank ? "_blank" : "_self"} className="projectButton primary"><FontAwesomeIcon icon={buttonIcon}/>{text ? text+" " : ""}<FontAwesomeIcon icon={faArrowRight}/></Link>
        </>
    )
}