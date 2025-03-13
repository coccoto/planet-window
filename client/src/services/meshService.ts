import * as THREE from "three"
import { PlanetConfig } from "~/types/planetTypes"

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
    // addRingMesh(mesh, RADIUS / 0.6, RADIUS / 0.9)
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
 * @retrun 惑星
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
 * @param innerRadius 内側の半径
 * @param outerRadius 外側の半径
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
 * @param radius 軌道の半径
 * @returns 軌道
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
 * @returns 星
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
