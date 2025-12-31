import { createEffect, onCleanup } from "solid-js"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createStarsMesh } from "~/services/meshService"
import { setupPlanet, setupPlanetMarker } from "~/services/planetService"
import { PlanetMeshList } from "~/types/planetType"

const ROTATION_FACTOR = 0.001

/**
 * 3D 空間にカメラをセットアップ
 */
function setupCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
        50, // 視野角
        window.innerWidth / window.innerHeight, // アスペクト比
        0.1, // 最近描画距離
        50000, // 最遠描画距離
    )
    camera.position.set(200, 200, 0) // カメラ初期位置
    return camera
}

/**
 * レンダラーをセットアップ
 *
 * 3D 空間を 2D 画面に描画するエンジンを設定する
 * WebGLRenderer: 3D グラフィックスを描画し、ブラウザの <canvas> 要素として画面に表示
 */
function setupRenderer(mountRef: HTMLDivElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.appendChild(renderer.domElement)
    return renderer
}

/**
 * カメラコントロールをセットアップ
 *
 * ユーザーがマウスやタッチでカメラを操作できるようにする
 * OrbitControls: カメラの回転・ズーム・パン (平行移動) を可能にするコントロールを提供
 */
function setupControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer): OrbitControls {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // 慣性を有効化
    controls.enableZoom = true // ズームを有効化
    controls.maxDistance = 10000 // 最大ズーム距離
    return controls
}

/**
 * ライトをセットアップする
 *
 * 3D 空間を照らす光源を設定する
 * AmbientLight: 3D 空間全体を照らす環境光を設定 (影なし)
 * PointLight: 点光源を設定 (影あり)
 */
function setupLights(scene: THREE.Scene): void {
    // 環境光源
    const ambientLight = new THREE.AmbientLight(
        0x888888, // 光源色
        1, // 光源強度
    )
    scene.add(ambientLight)

    // 太陽光
    const sunLight = new THREE.PointLight(
        0xffffff, // 光源色
        300, // 光源強度
        1000, // 光源距離
        1 // 光源減衰
    )
    sunLight.position.set(0, 0, 0) // 太陽の位置
    scene.add(sunLight)
}

/**
 * クリックハンドラーを作成する
 *
 * ユーザーが 3D 空間のオブジェクトをクリックできるようにする
 * Raycaster: クリック位置から 3D 空間に光線を飛ばし、惑星または惑星マーカーとの交差を検出して選択状態を管理する
 */
function createClickHandler(
    camera: THREE.Camera,
    planetMeshList: PlanetMeshList,
    planetMarkerList: Record<string, THREE.Sprite>
) {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // クリック判定対象を設定
    const planetMeshes = Object.values(planetMeshList).map((model) => model.mesh)
    const planetMarkers = Object.values(planetMarkerList)
    const clickableObjects = [...planetMeshes, ...planetMarkers]

    // マーカー → 惑星のマップを設定
    const markerPlanetMap = new Map<THREE.Sprite, THREE.Mesh>()
    Object.keys(planetMarkerList).forEach((key) => {
        markerPlanetMap.set(
            planetMarkerList[key as keyof PlanetMeshList],
            planetMeshList[key as keyof PlanetMeshList].mesh
        )
    })

    // 選択された惑星を保持
    let selectedPlanet: THREE.Mesh | null = null

    const handleClick = (event: MouseEvent, renderer: THREE.WebGLRenderer) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        
        // クリック位置から 3D 空間に光線を飛ばす
        raycaster.setFromCamera(mouse, camera)
        // 光線が交差するオブジェクトを取得
        const intersects = raycaster.intersectObjects(clickableObjects, false)

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object

            // クリックされたオブジェクトが惑星である場合
            if (clickedObject instanceof THREE.Mesh) {
                selectedPlanet = clickedObject
            }
            // クリックされたオブジェクトが惑星マーカーである場合
            else if (clickedObject instanceof THREE.Sprite) {
                const planet = markerPlanetMap.get(clickedObject)
                if (planet) {
                    selectedPlanet = planet
                }
            }
        }
    }

    return {
        handleClick,
        getSelectedPlanet: () => selectedPlanet,
    }
}

/**
 * アニメーターを作成する
 *
 * 惑星の動きとアニメーションを管理する
 * 各惑星の公転と自転を計算し、毎フレーム更新する
 * 選択された惑星がある場合、カメラがその惑星を追従するように位置を調整する
 */
function createAnimator(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls,
    planetMeshList: PlanetMeshList,
    planetMarkerList: Record<string, THREE.Sprite>,
    clickHandler: ReturnType<typeof createClickHandler>
) {
    const planetAngles: Record<string, number> = {
        'sun': 0,
        'mercury': Math.random() * Math.PI * 2,
        'venus': Math.random() * Math.PI * 2,
        'earth': Math.random() * Math.PI * 2,
        'moon': Math.random() * Math.PI * 2,
        'mars': Math.random() * Math.PI * 2,
        'jupiter': Math.random() * Math.PI * 2,
        'saturn': Math.random() * Math.PI * 2,
        'uranus': Math.random() * Math.PI * 2,
        'neptune': Math.random() * Math.PI * 2,
    }

    /**
     * カメラのターゲットを更新する
     */
    const updateCameraTarget = () => {
        const selectedPlanet = clickHandler.getSelectedPlanet()
        if (selectedPlanet !== undefined && selectedPlanet !== null) {
            const offset = new THREE.Vector3()
            offset.subVectors(camera.position, controls.target) // 現在のカメラ位置とターゲットの差分を計算
            controls.target.set(selectedPlanet.position.x, selectedPlanet.position.y, selectedPlanet.position.z) // ターゲットを選択された惑星に設定
            camera.position.copy(controls.target).add(offset) // カメラ位置を差分分だけ移動
            controls.update()
        }
    }

    /**
     * 惑星の位置と回転を更新する
     */
    const updatePlanets = () => {
        for (const key of Object.keys(planetMeshList) as Array<keyof PlanetMeshList>) {
            const planetMesh = planetMeshList[key]

            // 惑星の公転を更新する
            planetAngles[key] += planetMesh.mesh.userData.orbitSpeed
            // 惑星の自転を更新する
            planetMesh.mesh.rotation.y += ROTATION_FACTOR / planetMesh.mesh.userData.rotationSpeed
            // 惑星マーカーの位置を更新する
            planetMarkerList[key].position.copy(planetMesh.mesh.position)

            // 惑星の軌道を更新する
            if (planetMesh.parent === null) {
                planetMesh.mesh.position.x = planetMesh.mesh.userData.orbitRadius * Math.cos(planetAngles[key])
                planetMesh.mesh.position.z = planetMesh.mesh.userData.orbitRadius * Math.sin(planetAngles[key])
            } else {
                // 衛星の場合は親惑星を中心に公転
                planetMesh.mesh.position.x = planetMesh.parent.position.x + planetMesh.mesh.userData.orbitRadius * Math.cos(planetAngles[key])
                planetMesh.mesh.position.z = planetMesh.parent.position.z + planetMesh.mesh.userData.orbitRadius * Math.sin(planetAngles[key])
            }
        }
    }

    return {
        updatePlanets: () => updatePlanets(),
        updateCameraTarget: () => updateCameraTarget(),
    }
}

export function useThreePlanetScene(mountRef: HTMLDivElement | undefined) {
    createEffect(async () => {
        if (mountRef === undefined || mountRef === null) {
            return
        }

        // 3D 空間のセットアップ
        const scene = new THREE.Scene()
        const camera = setupCamera()
        const renderer = setupRenderer(mountRef)
        const controls = setupControls(camera, renderer)
        setupLights(scene)

        // 3D オブジェクトの配置
        const planetMeshList = await setupPlanet(scene)
        const planetMarkerList = setupPlanetMarker(scene, planetMeshList)
        const stars = createStarsMesh()
        scene.add(stars)

        // クリックハンドラーとアニメーターをセットアップ
        const clickHandler = createClickHandler(camera, planetMeshList, planetMarkerList)
        const animator = createAnimator(scene, camera, renderer, controls, planetMeshList, planetMarkerList, clickHandler)

        // クリックイベントを登録
        const handleClick = (event: MouseEvent) => {
            clickHandler.handleClick(event, renderer)
        }
        renderer.domElement.addEventListener("click", handleClick)

        // アニメーションを描画
        const animate = () => {
            controls.update()
            animator.updatePlanets() // 惑星の位置と回転を更新
            animator.updateCameraTarget() // カメラのターゲットを更新
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        onCleanup(() => {
            if (mountRef === undefined || mountRef === null) {
                return
            }
            renderer.domElement.removeEventListener("click", handleClick)
            mountRef.removeChild(renderer.domElement)
        })
    })
}


export function useThreeBackgroundScene(mountRef: HTMLDivElement | undefined) {
    createEffect(() => {
        if (mountRef === undefined || mountRef === null) {
            return
        }

        // 3D 空間のセットアップ
        const scene = new THREE.Scene()
        const camera = setupCamera()
        const renderer = setupRenderer(mountRef)
        const controls = setupControls(camera, renderer)

        // 星 (背景) の追加
        const stars = createStarsMesh()
        scene.add(stars)

        // アニメーションを描画
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
