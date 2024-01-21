import {Suspense} from "react";
import Loading from "@/app/Loading";
import ProjectList from "@/app/projects/_components/ProjectList";

export default function Projects() {
    return (
        <main>
            <nav>
                <div>
                    <h2>Nav</h2>
                </div>
            </nav>

            <div className="container">
                <div className="titleWrapper">
                    <h1>Portfolio</h1>
                    <div className="titleSeparator"></div>
                </div>

                <Suspense fallback={<Loading/>}>
                    <ProjectList/>
                </Suspense>
            </div>
        </main>
    )
}