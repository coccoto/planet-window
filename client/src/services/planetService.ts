import * as THREE from "three"
import { PlanetMeshList, initPlanetMeshList, PlanetConfigList } from "~/types/planetType"
import { 
    createSunMesh, createMercuryMesh, createVenusMesh, createEarthMesh, createMarsMesh, 
    createJupiterMesh, createSaturnMesh, createUranusMesh, createNeptuneMesh, createMoonMesh,
    createOrbitMesh, createPlanetMarker} from "~/services/meshService"
import fetchRequest from "~/utils/fetchRequest"
import { ApiResponseTypee } from "~/types/apiResponseType"

export async function setupPlanet(scene: THREE.Scene): Promise<PlanetMeshList> {
    const planetMeshList: PlanetMeshList = initPlanetMeshList()
    // 3D モデルとして表示する星のサイズなどを取得する
    const origin: string = import.meta.env.VITE_API_URL
    const planetConfigList = await fetchRequest<ApiResponseTypee<PlanetConfigList>>(origin + '/api/planet', { method: 'get' })

    // 太陽
    const sun = createSunMesh(planetConfigList.data.sun)
    sun.position.set(0, 0, 0)
    scene.add(sun)
    planetMeshList.sun = { mesh: sun, parent: null }

    // 水星
    const mercury = createMercuryMesh(planetConfigList.data.mercury)
    scene.add(mercury)
    const mercuryOrbitLine = createOrbitMesh(mercury.userData.orbitRadius)
    scene.add(mercuryOrbitLine)
    planetMeshList.mercury = { mesh: mercury, parent: sun }

    // 金星
    const venus = createVenusMesh(planetConfigList.data.venus)
    scene.add(venus)
    const venusOrbitLine = createOrbitMesh(venus.userData.orbitRadius)
    scene.add(venusOrbitLine)
    planetMeshList.venus = { mesh: venus, parent: sun }

    // 地球
    const earth = createEarthMesh(planetConfigList.data.earth)
    scene.add(earth)
    const earthOrbitLine = createOrbitMesh(earth.userData.orbitRadius)
    scene.add(earthOrbitLine)
    planetMeshList.earth = { mesh: earth, parent: sun }

    // 月
    const moon = createMoonMesh(planetConfigList.data.moon)
    scene.add(moon)
    const moonOrbitLine = createOrbitMesh(moon.userData.orbitRadius)
    earth.add(moonOrbitLine)
    planetMeshList.moon = { mesh: moon, parent: earth }

    // 火星
    const mars = createMarsMesh(planetConfigList.data.mars)
    scene.add(mars)
    const marsOrbitLine = createOrbitMesh(mars.userData.orbitRadius)
    scene.add(marsOrbitLine)
    planetMeshList.mars = { mesh: mars, parent: sun }

    // 木星
    const jupiter = createJupiterMesh(planetConfigList.data.jupiter)
    scene.add(jupiter)
    const jupiterOrbitLine = createOrbitMesh(jupiter.userData.orbitRadius)
    scene.add(jupiterOrbitLine)
    planetMeshList.jupiter = { mesh: jupiter, parent: sun }

    // 土星
    const saturn = createSaturnMesh(planetConfigList.data.saturn)
    scene.add(saturn)
    const saturnOrbitLine = createOrbitMesh(saturn.userData.orbitRadius)
    scene.add(saturnOrbitLine)
    planetMeshList.saturn = { mesh: saturn, parent: sun }

    // 天王星
    const uranus = createUranusMesh(planetConfigList.data.uranus)
    scene.add(uranus)
    const uranusOrbitLine = createOrbitMesh(uranus.userData.orbitRadius)
    scene.add(uranusOrbitLine)
    planetMeshList.uranus = { mesh: uranus, parent: sun }

    // 海王星
    const neptune = createNeptuneMesh(planetConfigList.data.neptune)
    scene.add(neptune)
    const neptuneOrbitLine = createOrbitMesh(neptune.userData.orbitRadius)
    scene.add(neptuneOrbitLine)
    planetMeshList.neptune = { mesh: neptune, parent: sun }

    return planetMeshList
}

export function setupPlanetMarker(scene: THREE.Scene, planetMeshList: PlanetMeshList): Record<string, THREE.Sprite> {
    const planetMarkers: Record<string, THREE.Sprite> = {}
    
    for (const key of Object.keys(planetMeshList) as Array<keyof PlanetMeshList>) {
        const marker = createPlanetMarker()
        marker.position.copy(planetMeshList[key].mesh.position)
        scene.add(marker)
        planetMarkers[key] = marker
    }
    return planetMarkers
}
