import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "~/styles/app.css"

export default function App() {
    return (
        <Router
            root={props => (
                <MetaProvider>
                    <Title>Planet Window</Title>
                    <div class='menu'>
                        <a href="/">Planet Window</a>
                        <a href="/license">License</a>
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
