import * as THREE from "three"

export type PlanetConfig = {
    planetName: string // 惑星名
    planetRadius: number // 半径
    rotationSpeed: number // 自転速度
    orbitSpeed: number // 公転速度
    orbitRadius: number // 公転半径
}
export type PlanetConfigList = {
    sun: PlanetConfig, // 太陽
    mercury: PlanetConfig, // 水星
    venus: PlanetConfig, // 金星
    earth: PlanetConfig, // 地球
    moon: PlanetConfig, // 月
    mars: PlanetConfig, // 火星
    jupiter: PlanetConfig, // 木星
    saturn: PlanetConfig, // 土星
    uranus: PlanetConfig, // 天王星
    neptune: PlanetConfig,  // 海王星
}

export type PlanetMesh = {
    mesh: THREE.Mesh,
    parent: THREE.Mesh | null,
}
export type PlanetMeshList = {
    sun: PlanetMesh, // 太陽
    mercury: PlanetMesh, // 水星
    venus: PlanetMesh, // 金星
    earth: PlanetMesh, // 地球
    moon: PlanetMesh, // 月
    mars: PlanetMesh, // 火星
    jupiter: PlanetMesh, // 木星
    saturn: PlanetMesh, // 土星
    uranus: PlanetMesh, // 天王星
    neptune: PlanetMesh,  // 海王星
}
export function initPlanetMeshList(): PlanetMeshList {
    return {
        sun: { mesh: new THREE.Mesh(), parent: null },
        mercury: { mesh: new THREE.Mesh(), parent: null },
        venus: { mesh: new THREE.Mesh(), parent: null },
        earth: { mesh: new THREE.Mesh(), parent: null },
        moon: { mesh: new THREE.Mesh(), parent: null },
        mars: { mesh: new THREE.Mesh(), parent: null },
        jupiter: { mesh: new THREE.Mesh(), parent: null },
        saturn: { mesh: new THREE.Mesh(), parent: null },
        uranus: { mesh: new THREE.Mesh(), parent: null },
        neptune: { mesh: new THREE.Mesh(), parent: null },
    }
}
