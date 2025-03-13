import { createEffect, onCleanup } from "solid-js"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createStarsMesh } from "~/services/meshService"
import { setupPlanet, setupPlanetMarker } from "~/services/planetService"
import { PlanetMeshList } from "~/types/planetTypes"

export function useThreePlanetScene(mountRef: HTMLDivElement | undefined) {
    const planetAngles: Record<string, number> = {
        'sun': 0,
        'mercury': 0,
        'venus': 0,
        'earth': 0,
        'moon': 0,
        'mars': 0,
        'jupiter': 0,
        'saturn': 0,
        'uranus': 0,
        'neptune': 0
    }
    let selectedCamera: THREE.Object3D | null = null

    createEffect(async () => {
        if (mountRef === undefined || mountRef === null) {
            return
        }
        const scene = new THREE.Scene()

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 50000)
        camera.position.set(200, 200, 0)

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.appendChild(renderer.domElement)

        // カメラコントロールの設定
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = true
        controls.maxDistance = 10000

        // ライトの設定
        // 環境光源
        const ambientLight = new THREE.AmbientLight(0x888888, 1)
        scene.add(ambientLight)
        // 太陽光
        const sunLight = new THREE.PointLight(0xffffff, 300, 1000, 1)
        sunLight.position.set(0, 0, 0)
        scene.add(sunLight)

        // 3D オブジェクトの配置
        const planetMeshList: PlanetMeshList = await setupPlanet(scene)
        // 星 (背景)
        const stars = createStarsMesh()
        scene.add(stars)
        // 惑星マーカー
        const planetMarkerList = setupPlanetMarker(scene, planetMeshList)

        // クリックイベントの設定
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        const onPlanetClick = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const meshes = Object.values(planetMeshList).map((model) => {
                return model.mesh
            })
            const intersects = raycaster.intersectObjects(meshes, false)

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object

                if (clickedObject instanceof THREE.Mesh) {
                    selectedCamera = clickedObject
                }
            }
        }
        renderer.domElement.addEventListener("click", onPlanetClick)

        // クリックした惑星をカメラのターゲットに設定
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

            for (const key of Object.keys(planetMeshList) as Array<keyof PlanetMeshList>) {
                const planetMesh = planetMeshList[key]

                // 惑星の公転の更新する
                planetAngles[key] += planetMesh.mesh.userData.orbitSpeed
                // 惑星の自転の更新する
                const rotationFactor = 0.001
                planetMesh.mesh.rotation.y += rotationFactor / planetMesh.mesh.userData.rotationSpeed
                // 惑星マーカーの位置を更新する
                planetMarkerList[key].position.copy(planetMesh.mesh.position);

                // 惑星の軌道の更新する
                if (planetMesh.parent === null) {
                    planetMesh.mesh.position.x = planetMesh.mesh.userData.orbitRadius * Math.cos(planetAngles[key])
                    planetMesh.mesh.position.z = planetMesh.mesh.userData.orbitRadius * Math.sin(planetAngles[key])
                } else {
                    // 親惑星が存在する場合
                    planetMesh.mesh.position.x = planetMesh.parent.position.x + planetMesh.mesh.userData.orbitRadius * Math.cos(planetAngles[key])
                    planetMesh.mesh.position.z = planetMesh.parent.position.z + planetMesh.mesh.userData.orbitRadius * Math.sin(planetAngles[key])
                }
            }
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
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 50000)
        camera.position.set(200, 200, 0)

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.appendChild(renderer.domElement)

        // カメラコントロールの設定
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = true
        controls.maxDistance = 10000

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
