import * as THREE from "three"
import { PlanetConfig } from "~/types/planetType"

/**
 * @returns 太陽
 */
export function createSunMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, false)
}
/**
 * @returns 水星
 */
export function createMercuryMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 金星
 */
export function createVenusMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 地球
 */
export function createEarthMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 月
 */
export function createMoonMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 火星
 */
export function createMarsMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 木星
 */
export function createJupiterMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 土星
 */
export function createSaturnMesh(planetConfig: PlanetConfig) {
    const mesh = createPlanetMesh(planetConfig, true)
    // 土星の環を追加
    addRingMesh(mesh, mesh.userData.planetRadius * 1.2, mesh.userData.planetRadius * 1.7)
    return mesh
}
/**
 * @returns 天王星
 */
export function createUranusMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}
/**
 * @returns 海王星
 */
export function createNeptuneMesh(planetConfig: PlanetConfig) {
    return createPlanetMesh(planetConfig, true)
}

/**
 * 惑星の 3D メッシュを作成する
 *
 * SphereGeometry で球体を作成し、惑星のテクスチャ画像を貼り付ける
 * MeshStandardMaterial: 光源の影響を受けるマテリアル (惑星用)
 * MeshBasicMaterial: 光源の影響を受けないマテリアル (太陽用)
 */
function createPlanetMesh(data: PlanetConfig, useMeshStandardMaterial: boolean): THREE.Mesh {
    const texture = new THREE.TextureLoader().load('/images/' + data.planetName + '.jpg')
    const geometry = new THREE.SphereGeometry(data.planetRadius, 30, 30)

    const material = useMeshStandardMaterial ? new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture }) : new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.userData = data
    return mesh
}

/**
 * 惑星にリング (環) を追加する
 *
 * RingGeometry でドーナツ型の平面を作成し、惑星に追加する
 */
function addRingMesh(mesh: THREE.Mesh, innerRadius: number, outerRadius: number) {
    // リングジオメトリを作成する
    const SEGMENTS = 128 // 円周の分割数
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, SEGMENTS)
    const position = geometry.attributes.position // 円の頂点座標
    const count = position.count // 円の頂点の数
    const uv = geometry.attributes.uv // UV マッピング座標

    for (let i = 0; i < count; i ++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(position, i) // 頂点の座標を取得
        const angle = Math.atan2(vertex.y, vertex.x) // 原点から見た頂点の角度を計算
        const radius = Math.hypot(vertex.x, vertex.y) // 原点から見た頂点の半径を計算
        
        // UV マッピングを設定する
        const u = (radius - innerRadius) / (outerRadius - innerRadius) // 半径に応じた U 値
        const v = (angle / (2 * Math.PI)) + 0.5 // 角度に応じた V 値
        uv.setXY(i, u, v)
    }
    // UV マッピングを更新する
    geometry.attributes.uv.needsUpdate = true

    const texture = new THREE.TextureLoader().load('/images/' + mesh.userData.planetName + '_ring.jpg')
    // マテリアルの作成（リングの外観を決定）
    const material = new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
    const ringMesh = new THREE.Mesh(geometry, material)
    ringMesh.rotation.x = Math.PI / 2
    mesh.add(ringMesh)
}

/**
 * 惑星の軌道線を作成する
 *
 * 惑星が公転する軌道を円形の線で表現する
 * BufferGeometry で円周上の点を生成し、LineBasicMaterial で線として描画する
 */
export function createOrbitMesh(radius: number): THREE.Line {
    // 軌道の分割数の設定
    const SEGMENTS = 128

    const points = []
    for (let i = 0; i <= SEGMENTS; i ++) {
        const angle = (i / SEGMENTS) * Math.PI * 2
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)
        points.push(new THREE.Vector3(x, 0, z))
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 })    
    return new THREE.Line(geometry, material)
}

/**
 * 背景の星空を作成する
 *
 * 3D 空間にランダムに配置された点の集合として星空を表現する
 * BufferGeometry で大量の頂点を効率的に管理し、PointsMaterial で点として描画する
 * 宇宙空間の背景として、惑星の周りに広がる星々を演出する
 */
export function createStarsMesh() {
    // 星の数
    const NUM_STARS = 1000
    // 密度
    const SPREAD_RADIUS = 20000

    const vertices = []
    for (let i = 0; i < NUM_STARS; i ++) {
        const x = (Math.random() - 0.5) * SPREAD_RADIUS
        const y = (Math.random() - 0.5) * SPREAD_RADIUS
        const z = (Math.random() - 0.5) * SPREAD_RADIUS
        vertices.push(x, y, z)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })
    return new THREE.Points(geometry, material)
}

/**
 * 惑星マーカー (白い円) を作成する
 *
 * Canvas で白い円を描画し、それをテクスチャとして Sprite に適用する
 * Sprite は常にカメラの方を向く 2D オブジェクトで、惑星の位置を示すマーカーとして使用する
 * 小さい惑星でもクリックしやすくするための視覚的な補助として機能する
 */
export function createPlanetMarker(): THREE.Sprite {
    // canvas
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d')

    if (context !== null) {
        context.beginPath()
        context.arc(32, 32, 16, 0, 2 * Math.PI)
        context.strokeStyle = '#' + 0xffffff.toString(16).padStart(6, '0')
        context.stroke()
    }
    // texture
    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({ map: texture, sizeAttenuation: false, transparent: true, opacity: 0.5 })
    // sprite
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(0.05, 0.05, 1)
    return sprite
}
