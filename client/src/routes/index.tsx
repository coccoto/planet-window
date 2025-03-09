import { createEffect, onCleanup } from "solid-js"
import { Title } from "@solidjs/meta"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createSunMesh, createEarthMesh, createMoonMesh, createStarsMesh } from "~/utils/threeCreatePlanet"
import "~/styles/routes/index.css"

export default function Home() {
    let mountRef = undefined as HTMLDivElement | undefined

    let earthAngle = 0
    let moonAngle = 0

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
        controls.maxDistance = 500

        // ライトの設定
        // 環境光源
        const ambientLight = new THREE.AmbientLight(0x888888, 1)
        scene.add(ambientLight)
        // 太陽光
        const sunLight = new THREE.PointLight(0xffffff, 300, 1000, 1)
        sunLight.position.set(0, 0, 0)
        scene.add(sunLight)

        // 3D オブジェクトの配置
        // 太陽
        const sun = createSunMesh()
        sun.position.set(0, 0, 0)
        scene.add(sun)
        // 地球
        const earth = createEarthMesh()
        const earthOrbitRadius = 100
        scene.add(earth)
        // 月
        const moon = createMoonMesh()
        const moonOrbitRadius = 20
        scene.add(moon)
        // 宇宙
        const stars = createStarsMesh()
        scene.add(stars)

        // アニメーションの設定
        const animate = () => {
            controls.update()

            // 星の回転速度
            earthAngle += 0.001
            moonAngle += 0.003

            // 地球の位置
            earth.position.x = earthOrbitRadius * Math.cos(earthAngle)
            earth.position.z = earthOrbitRadius * Math.sin(earthAngle)

            // 月の位置 (地球の周り)
            moon.position.x = earth.position.x + moonOrbitRadius * Math.cos(moonAngle)
            moon.position.z = earth.position.z + moonOrbitRadius * Math.sin(moonAngle)

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
            <Title>Planet Window</Title>
            <div ref={mountRef}></div>
        </main>
    )
}

