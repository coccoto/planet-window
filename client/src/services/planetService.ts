import * as THREE from "three"
import { PlanetModels, initPlanetModels } from "~/types/planetTypes"
import { createSunMesh, createMercuryMesh, createVenusMesh, createEarthMesh, createMarsMesh, 
         createJupiterMesh, createSaturnMesh, createUranusMesh, createNeptuneMesh, 
         createMoonMesh, createOrbitMesh } from "~/services/meshService"

export function setupPlanet(scene: THREE.Scene): PlanetModels {
    const planetModels: PlanetModels = initPlanetModels()

    // 太陽
    const sun = createSunMesh()
    sun.position.set(0, 0, 0)
    scene.add(sun)
    planetModels.sun = { mesh: sun, parent: null }

    // 水星
    const mercury = createMercuryMesh()
    scene.add(mercury)
    const mercuryOrbitLine = createOrbitMesh(mercury.userData.orbitRadius)
    scene.add(mercuryOrbitLine)
    planetModels.mercury = { mesh: mercury, parent: sun }

    // 金星
    const venus = createVenusMesh()
    scene.add(venus)
    const venusOrbitLine = createOrbitMesh(venus.userData.orbitRadius)
    scene.add(venusOrbitLine)
    planetModels.venus = { mesh: venus, parent: sun }

    // 地球
    const earth = createEarthMesh()
    scene.add(earth)
    const earthOrbitLine = createOrbitMesh(earth.userData.orbitRadius)
    scene.add(earthOrbitLine)
    planetModels.earth = { mesh: earth, parent: sun }

    // 月
    const moon = createMoonMesh()
    scene.add(moon)
    const moonOrbitLine = createOrbitMesh(moon.userData.orbitRadius)
    earth.add(moonOrbitLine)
    planetModels.moon = { mesh: moon, parent: earth }

    // 火星
    const mars = createMarsMesh()
    scene.add(mars)
    const marsOrbitLine = createOrbitMesh(mars.userData.orbitRadius)
    scene.add(marsOrbitLine)
    planetModels.mars = { mesh: mars, parent: sun }

    // 木星
    const jupiter = createJupiterMesh()
    scene.add(jupiter)
    const jupiterOrbitLine = createOrbitMesh(jupiter.userData.orbitRadius)
    scene.add(jupiterOrbitLine)
    planetModels.jupiter = { mesh: jupiter, parent: sun }

    // 土星
    const saturn = createSaturnMesh()
    scene.add(saturn)
    const saturnOrbitLine = createOrbitMesh(saturn.userData.orbitRadius)
    scene.add(saturnOrbitLine)
    planetModels.saturn = { mesh: saturn, parent: sun }

    // 天王星
    const uranus = createUranusMesh()
    scene.add(uranus)
    const uranusOrbitLine = createOrbitMesh(uranus.userData.orbitRadius)
    scene.add(uranusOrbitLine)
    planetModels.uranus = { mesh: uranus, parent: sun }

    // 海王星
    const neptune = createNeptuneMesh()
    scene.add(neptune)
    const neptuneOrbitLine = createOrbitMesh(neptune.userData.orbitRadius)
    scene.add(neptuneOrbitLine)
    planetModels.neptune = { mesh: neptune, parent: sun }

    return planetModels
}

