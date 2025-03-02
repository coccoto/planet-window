import { createEffect, onCleanup } from "solid-js"
import { Title } from "@solidjs/meta"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createMoonMesh, createStarsMesh } from "~/utils/threeCreatePlanet"

export default function Home() {
    let mountRef = undefined as HTMLDivElement | undefined

    createEffect(() => {
        if (mountRef === undefined || mountRef === null) {
            return
        }

        const scene = new THREE.Scene()

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.set(50, 0, 0)

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.appendChild(renderer.domElement)

        // カメラコントロールの設定
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = true
        controls.minDistance = 20
        controls.maxDistance = 100

        // ライトの設定
        // 環境光源
        const ambientLight = new THREE.AmbientLight(0x888888, 1)
        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xeeeeee, 2)
        // 平行光源の位置を設定する
        directionalLight.position.set(50, 0, 0)
        scene.add(ambientLight, directionalLight)

        // 3D オブジェクトの配置
        const moon = createMoonMesh()
        scene.add(moon)
        const stars = createStarsMesh()
        scene.add(stars)

        // アニメーションの設定
        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        onCleanup(() => {
            if (mountRef === undefined || mountRef === null) {
                return
            }
            mountRef.removeChild(renderer.domElement)
        })
    })

    return (
        <main>
            <Title>Moon - Planet Window</Title>
            <div ref={mountRef}></div>
        </main>
    )
}
