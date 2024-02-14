import {MediaSingleImage} from "@/app/projects/[slug]/_components/MediaSinglelmage";
import {MediaYoutube} from "@/app/projects/[slug]/_components/MediaYoutube";
import ProjectInfo from "@/app/projects/[slug]/_components/ProjectInfo";

export default async function MediaLayout({project}) {

    return (
        <div className="projectPage mediaLayout" key={project.id}>
            <div className="mediaLayout__mediaWrapper">
                <div className="mediaLayout__media">
                    {project.attributes.layout === "singleImage" ? <MediaSingleImage data={project.attributes.images.data} />: ""}
                    {project.attributes.layout === "youtube" ? <MediaYoutube data={project.attributes.youtube} />: ""}
                </div>
            </div>
            <ProjectInfo project={project}/>
        </div>
    )
}