import { createEffect } from "solid-js"
import { Title } from '@solidjs/meta'
import { useThreeBackgroundScene } from "~/hooks/useThreeScene"
import '~/styles/routes/license.css'

export default function License() {
    let mountRef = undefined as HTMLDivElement | undefined

    createEffect(() => {
        useThreeBackgroundScene(mountRef)
    })

    const licenses = [
        {
            name: 'Solar System Scope',
            url: 'https://www.solarsystemscope.com/',
            license: 'CC BY 4.0',
        }
    ]

    return (
        <main>
            <Title>License - Planet Window</Title>
            <div ref={mountRef}></div>
            <div class='container'>
                <h1>License Information</h1>
                <div class='license-list'>
                    <div>This app uses the following resources</div>
                    <ul>
                        {licenses.map((item) => (
                            <li>
                                <a href={item.url} target='_blank' rel='noopener noreferrer'>{item.name}</a> licensed under {item.license}.
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
