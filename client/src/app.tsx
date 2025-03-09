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
                        <a href="/">home</a>
                        <a href="/license">license</a>
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
