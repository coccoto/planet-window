import * as THREE from "three"

const RADIUS = 15

export function createSunMesh() {
    const PATH = "/images/sun.jpg"

    const loader = new THREE.TextureLoader()
    const texture = loader.load(PATH)
    const geometry = new THREE.SphereGeometry(RADIUS, 30, 30)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture })
    return new THREE.Mesh(geometry, material)
}

export function createEarthMesh() {
    const PATH = "/images/earth.jpg"

    const loader = new THREE.TextureLoader()
    const texture = loader.load(PATH)
    const geometry = new THREE.SphereGeometry(RADIUS / 4, 30, 30)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture })
    return new THREE.Mesh(geometry, material)
}

export function createMoonMesh() {
    const PATH = "/images/moon.jpg"

    const loader = new THREE.TextureLoader()
    const texture = loader.load(PATH)
    const geometry = new THREE.SphereGeometry(RADIUS / 8, 30, 30)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture })
    return new THREE.Mesh(geometry, material)
}

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
