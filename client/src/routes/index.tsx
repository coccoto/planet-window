import { createEffect, onCleanup } from "solid-js"
import { Title } from "@solidjs/meta"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function Home() {
    let mountRef = undefined as HTMLDivElement | undefined

    createEffect(() => {
        if (mountRef === undefined || mountRef === null) {
            return
        }

        const scene = new THREE.Scene()

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.set(0, 0, 50)

        // レンダラーの設定
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.appendChild(renderer.domElement)

        // カメラコントロールの設定
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.enableZoom = true
        controls.minDistance = 20
        controls.maxDistance = 60

        // ライトの設定
        // 環境光源
        const ambientLight = new THREE.AmbientLight(0x888888, 1)
        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xeeeeee, 1)
        // 平行光源の位置を設定する
        directionalLight.position.set(5, 5, 5)
        scene.add(ambientLight, directionalLight)

        // 3D オブジェクトの作成
        const loader = new THREE.TextureLoader()
        const texture = loader.load("/images/moon.jpg")
        const geometry = new THREE.SphereGeometry(15, 30, 30)
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

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
            <Title>Home</Title>
            <h1>Home</h1>
            <div ref={mountRef}></div>
        </main>
    )
}
