import {Suspense} from "react";
import Loading from "@/app/Loading";
import ProjectList from "@/app/projects/_components/ProjectList";

export default function Projects() {
    return (
        <main>
            <nav>
                <div>
                    <h2>Tickets</h2>
                    <p><small>Currently open tickets.</small></p>
                </div>
            </nav>

            <div className="container">
                <div className="titleWrapper">
                    <h2>Portfolio</h2>
                    <div className="titleSeparator"></div>
                </div>

                <Suspense fallback={<Loading/>}>
                    <ProjectList/>
                </Suspense>
            </div>
        </main>
    )
}