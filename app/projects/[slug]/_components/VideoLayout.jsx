import ProjectInfo from "@/app/projects/[slug]/_components/ProjectInfo";

export  default function VideoLayout({project}) {
    return (
        <div className="projectPage videoLayout" key={project.id}>
            <video
                src={`http://localhost:1337${project.attributes.video.data.attributes.url}`}
                width="1920"
                height="1080"
                autoPlay
                loop
                muted
                playsInline
                className="videoLayout__backgroundVideo"
            >
                Votre navigateur ne supporte pas le tag video.
            </video>
            <ProjectInfo project={project}/>
        </div>
    )
}