import "../projectPage.scss";
import "./media.scss";

export function MediaYoutube({data}) {
    const aspectRatio = data.videoHeight / data.videoWidth * 100;

    return (
        <>
            <div className="youtubeEmbedContainer" style={{paddingBottom: aspectRatio + '%'}}>
                {data ?
                    <iframe
                        src={`https://www.youtube.com/embed/${data.url}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="youtubeEmbed">
                    </iframe>
                    : "" }
            </div>
        </>
    )
}