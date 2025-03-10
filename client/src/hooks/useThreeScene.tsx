import { createEffect, onCleanup } from "solid-js"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createSunMesh, createEarthMesh, createMoonMesh, createOrbitMesh, createStarsMesh } from "~/utils/threeHelpers"

export function useThreePlanetScene(mountRef: HTMLDivElement | undefined) {
    let earthAngle = 0
    let moonAngle = 0
    let selectedCamera: THREE.Object3D | null = null

    createEffect(() => {
        if (mountRef === undefined || mountRef === null) {
            return
        }
        const scene = new THREE.Scene()

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.set(200, 200, 0)

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.appendChild(renderer.domElement)

        // カメラコントロールの設定
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = true
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
        const earthOrbitRadius = 100
        const earth = createEarthMesh()
        scene.add(earth)
        const earthOrbitLine = createOrbitMesh(earthOrbitRadius)
        scene.add(earthOrbitLine)

        // 月
        const moonOrbitRadius = 20
        const moon = createMoonMesh()
        scene.add(moon)
        const moonOrbitLine = createOrbitMesh(moonOrbitRadius)
        earth.add(moonOrbitLine)

        // 星 (背景)
        const stars = createStarsMesh()
        scene.add(stars)

        // クリックイベントの設定
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        const onPlanetClick = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        
            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects([sun, earth, moon])
            if (intersects.length > 0) {
                selectedCamera = intersects[0].object
            }
        }
        renderer.domElement.addEventListener("click", onPlanetClick)

        // カメラのターゲットを更新
        const updateCameraTarget = () => {
            if (selectedCamera !== undefined && selectedCamera !== null) {
                const offset = new THREE.Vector3()
                offset.subVectors(camera.position, controls.target)
                controls.target.set(selectedCamera.position.x, selectedCamera.position.y, selectedCamera.position.z)
                camera.position.copy(controls.target).add(offset)
                controls.update()
            }
        }

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

            // カメラのターゲットを更新
            updateCameraTarget()

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
}


export function useThreeBackgroundScene(mountRef: HTMLDivElement | undefined) {

    createEffect(() => {
        if (mountRef === undefined || mountRef === null) {
            return
        }
        const scene = new THREE.Scene()

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.set(200, 200, 0)

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.appendChild(renderer.domElement)

        // カメラコントロールの設定
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = true
        controls.maxDistance = 500

        // 3D オブジェクトの配置
        // 星 (背景)
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
}
