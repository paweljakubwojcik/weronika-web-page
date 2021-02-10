import React, { useEffect, useState, useMemo, useCallback } from 'react'

import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    TextureLoader,
    Mesh,
    MeshBasicMaterial,
    BackSide
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const fov = 80
const aspectRatio = typeof window !== `undefined` ? window.innerWidth / window.innerHeight : undefined;
const near = 0.1
const far = 300000

const cameraInitialPosition = [-900, -200, -900]

const controlsMaxDistance = 100000;
const controlsMinDistance = 1000;


export default function PanoramicView({ data, setNavVisibility }) {

    const scene = useMemo(() => typeof window !== `undefined` ? new Scene() : null, [])
    const camera = useMemo(() => typeof window !== `undefined` ? new PerspectiveCamera(fov, aspectRatio, near, far) : null, [])
    const renderer = useMemo(() => typeof window !== `undefined` ? new WebGLRenderer() : null, [])

    const render = useCallback(() => {
        requestAnimationFrame(() => renderer.render(scene, camera));
    }, [scene, camera, renderer])

    const resize = useCallback(() => {
        camera.aspect = window?.innerWidth / window?.innerHeight;
        renderer.setSize(window?.innerWidth, window?.innerHeight);
        camera.updateProjectionMatrix();
        render()
    }, [camera, renderer, render])

    const [canvas, setCanvas] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [resize])


    useEffect(() => {
        if (canvas) {
            console.log('creating panoramic view')

            camera.position.set(...cameraInitialPosition);
            renderer.setSize(window?.innerWidth, window?.innerHeight);

            let skySphereGeo = new SphereGeometry(100000, 100, 100);
            // texture loader is async, so it takes callback
            let textureSphere = new TextureLoader().load(data, () => { render(); setVisible(true) });
            let skySphere = new Mesh(skySphereGeo, new MeshBasicMaterial({ map: textureSphere, side: BackSide }));

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render)

            controls.minDistance = controlsMinDistance;
            controls.maxDistance = controlsMaxDistance;


            canvas.appendChild(renderer.domElement);
            scene.add(skySphere)
            camera.updateProjectionMatrix();
        }
    }, [canvas, camera, renderer, data, render, scene])

    return (
        <div ref={setCanvas}
            onPointerDown={() => { setNavVisibility(false) }}
            onPointerUp={() => { setNavVisibility(true) }}
            style={{
                position: 'fixed',
                opacity: visible ? '1' : '0',
                transition: 'opacity .5s',
            }}
        >

        </div>
    )
}
