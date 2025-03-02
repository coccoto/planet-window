import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "~/app.css"

export default function App() {
    return (
        <Router
            root={props => (
                <MetaProvider>
                    <Title>Planet Window</Title>
                    <div>
                        <a href="/">Moon</a>
                    </div>
                    <Suspense>
                        {props.children}
                    </Suspense>
                </MetaProvider>
        )}>
            <FileRoutes></FileRoutes>
        </Router>
    )
}
