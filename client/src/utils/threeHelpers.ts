import * as THREE from "three"

const RADIUS = 15

/**
 * @returns 太陽
 */
export function createSunMesh() {
    const PATH = "/images/sun.jpg"

    const loader = new THREE.TextureLoader()
    const texture = loader.load(PATH)
    const geometry = new THREE.SphereGeometry(RADIUS, 30, 30)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
    return new THREE.Mesh(geometry, material)
}

/**
 * @returns 地球
 */
export function createEarthMesh() {
    const PATH = "/images/earth.jpg"

    const loader = new THREE.TextureLoader()
    const texture = loader.load(PATH)
    const geometry = new THREE.SphereGeometry(RADIUS / 4, 30, 30)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture })
    return new THREE.Mesh(geometry, material)
}

/**
 * @returns 月
 */
export function createMoonMesh() {
    const PATH = "/images/moon.jpg"

    const loader = new THREE.TextureLoader()
    const texture = loader.load(PATH)
    const geometry = new THREE.SphereGeometry(RADIUS / 8, 30, 30)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture })
    return new THREE.Mesh(geometry, material)
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
