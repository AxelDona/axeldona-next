import Image from "next/image";
import "../projectPage.scss";

export function MediaSingleImage({data}) {
    return (
        <>
            {data ?
                <a target="_blank" href={`http://localhost:1337${data[0].attributes.url}`} className="projectPage__media__link">
                    <Image
                        width={900}
                        height={900}
                        alt=""
                        src={`http://localhost:1337${data[0].attributes.url}`}
                        className="projectPage__media__link__media"
                    />
                </a>
                : "" }
        </>
    )
}