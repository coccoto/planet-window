import { createEffect } from "solid-js"
import { Title } from "@solidjs/meta"
import { useThreePlanetScene } from "~/hooks/useThreeScene"
import "~/styles/routes/index.css"

export default function Home() {
    let mountRef = undefined as HTMLDivElement | undefined

    createEffect(() => {
        useThreePlanetScene(mountRef)
    })

    return (
        <main>
            <Title>Planet Window</Title>
            <div ref={mountRef}></div>
        </main>
    )
}

