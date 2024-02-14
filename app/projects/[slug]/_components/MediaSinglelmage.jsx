import Image from "next/image";
import "../projectPage.scss";
import "./media.scss";

export function MediaSingleImage({data}) {
    return (
        <>
            {data ?
                // <a target="_blank" href={`http://localhost:1337${data[0].attributes.url}`} className="projectPage__media__link">
                    <Image
                        width={1200}
                        height={1200}
                        alt=""
                        src={`http://localhost:1337${data[0].attributes.url}`}
                        className="mediaLayout__media__link__media"
                    />
                // </a>
                : "" }
        </>
    )
}