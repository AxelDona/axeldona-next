import "../projectPage.scss";

export function MediaYoutube({data}) {
    return (
        <>
            <div className="youtubeEmbedContainer">
                {data ?
                    <iframe
                        width={data.videoWidth}
                        height={data.videoHeight}
                        src={`https://www.youtube.com/embed/${data.url}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="youtubeEmbed">
                    </iframe>
                    : "" }
            </div>
        </>
    )
}