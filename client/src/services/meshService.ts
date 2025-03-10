import * as THREE from "three"
import { MeshPlanetData } from "~/types/planetTypes"

const RADIUS = 15

/**
 * @retrun 惑星
 */
function createPlanetMesh(data: MeshPlanetData, useMeshStandardMaterial: boolean): THREE.Mesh {
    const texture = new THREE.TextureLoader().load('/images/' + data.name + '.jpg')
    const geometry = new THREE.SphereGeometry(data.planetRadius, 30, 30)

    const material = useMeshStandardMaterial ? new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture }) : new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.userData = data
    return mesh
}

/**
 * @returns 太陽
 */
export function createSunMesh() {
    const data = {
        name: "sun",
        planetRadius: RADIUS,
        rotationSpeed: 0,
        orbitSpeed: 0,
        orbitRadius: 0,
    }
    return createPlanetMesh(data, false)
}

/**
 * @returns 水星
 */
export function createMercuryMesh() {
    const data = {
        name: "mercury",
        planetRadius: RADIUS / 4,
        rotationSpeed: 0.001,
        orbitSpeed: 0.01,
        orbitRadius: 50,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 金星
 */
export function createVenusMesh() {
    const data = {
        name: "venus",
        planetRadius: RADIUS / 4,
        rotationSpeed: 0.001,
        orbitSpeed: 0.01,
        orbitRadius: 80,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 地球
 */
export function createEarthMesh() {
    const data = {
        name: "earth",
        planetRadius: RADIUS / 4,
        rotationSpeed: 0.001,
        orbitSpeed: 0.01,
        orbitRadius: 100,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 月
 */
export function createMoonMesh() {
    const data = {
        name: "moon",
        planetRadius: RADIUS / 8,
        rotationSpeed: 0.003,
        orbitSpeed: 0.03,
        orbitRadius: 20,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 火星
 */
export function createMarsMesh() {
    const data = {
        name: "mars",
        planetRadius: RADIUS / 5,
        rotationSpeed: 0.001,
        orbitSpeed: 0.008,
        orbitRadius: 130,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 木星
 */
export function createJupiterMesh() {
    const data = {
        name: "jupiter",
        planetRadius: RADIUS / 1.5,
        rotationSpeed: 0.002,
        orbitSpeed: 0.004,
        orbitRadius: 200,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 土星
 */
export function createSaturnMesh() {
    const data = {
        name: "saturn",
        planetRadius: RADIUS / 1.4,
        rotationSpeed: 0.0015,
        orbitSpeed: 0.0025,
        orbitRadius: 250,
    }
    const mesh = createPlanetMesh(data, true)

    // 土星の環を追加
    addRing(mesh, RADIUS / 1.3, RADIUS / 1.0)

    return mesh;
}

/**
 * @returns 天王星
 */
export function createUranusMesh() {
    const data = {
        name: "uranus",
        planetRadius: RADIUS / 1.8,
        rotationSpeed: 0.001,
        orbitSpeed: 0.002,
        orbitRadius: 300,
    }
    return createPlanetMesh(data, true)
}

/**
 * @returns 海王星
 */
export function createNeptuneMesh() {
    const data = {
        name: "neptune",
        planetRadius: RADIUS / 2.5,
        rotationSpeed: 0.001,
        orbitSpeed: 0.001,
        orbitRadius: 350,
    }
    return createPlanetMesh(data, true)
}

/**
 * リングジオメトリのUV座標を調整
 * @todo
 */
function adjustRingUV(geometry: THREE.RingGeometry, innerRadius: number, outerRadius: number) {
    const pos = geometry.attributes.position
    const uv = geometry.attributes.uv
    const count = pos.count

    for (let i = 0; i < count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(pos, i)

        const angle = Math.atan2(vertex.y, vertex.x)
        const radius = Math.hypot(vertex.x, vertex.y)

        const u = (radius - innerRadius) / (outerRadius - innerRadius)
        const v = (angle / (2 * Math.PI)) + 0.5

        uv.setXY(i, u, v)
    }
    geometry.attributes.uv.needsUpdate = true
}

/**
 * テクスチャをロードし、マテリアルを作成
 * @todo
 */
function createRingMaterial(texturePath: string): THREE.Material {
    const texture = new THREE.TextureLoader().load(texturePath)
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 6)

    return new THREE.MeshStandardMaterial({
        map: texture,
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    })
}

/**
 * @returns 環
 * @todo
 */
function addRing(mesh: THREE.Mesh, innerRadius: number, outerRadius: number) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128)
    adjustRingUV(geometry, innerRadius, outerRadius)

    const texturePath = '/images/' + mesh.userData.name + '_ring.jpg'
    const material = createRingMaterial(texturePath)

    const ring = new THREE.Mesh(geometry, material)
    ring.rotation.x = Math.PI / 2

    mesh.add(ring)
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
    const SPREAD_RADIUS = 2000

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
