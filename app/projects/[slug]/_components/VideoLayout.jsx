import ProjectInfo from "@/app/projects/[slug]/_components/ProjectInfo";
import Loading from "@/components/loading/Loading";
import {Suspense} from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function VideoLayout({project}) {
    return (

        <Suspense fallback={<Loading />}>
            <div className="projectPage videoLayout" key={project.id}>
                <Link href="/projects" className="projectPage__backButton">
                    <div>
                        <FiArrowLeft />
                    </div>
                </Link>
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
                <ProjectInfo project={project} collapsible={true} />
            </div>
        </Suspense>
    )
}