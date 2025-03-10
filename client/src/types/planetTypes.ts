import * as THREE from "three"

export type MeshPlanetData = {
    name: string      // 名前
    planetRadius: number // 惑星の半径
    rotationSpeed: number // 自転速度
    orbitSpeed: number    // 公転速度
    orbitRadius: number   // 公転半径
}

export type PlanetModel = {
    mesh: THREE.Mesh,
    parent: THREE.Mesh | null,
}

export type PlanetModels = {
    sun: PlanetModel, // 太陽
    mercury: PlanetModel, // 水星
    venus: PlanetModel, // 金星
    earth: PlanetModel, // 地球
    moon: PlanetModel, // 月
    mars: PlanetModel, // 火星
    jupiter: PlanetModel, // 木星
    saturn: PlanetModel, // 土星
    uranus: PlanetModel, // 天王星
    neptune: PlanetModel,  // 海王星
}

export function initPlanetModels(): PlanetModels {
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

export enum PlanetName {
    Sun = "sun",
    Mercury = "mercury",
    Venus = "venus",
    Earth = "earth",
    Moon = "moon",
    Mars = "mars",
    Jupiter = "jupiter",
    Saturn = "saturn",
    Uranus = "uranus",
    Neptune = "neptune",
}
