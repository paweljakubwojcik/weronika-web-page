import React, { useEffect, useState } from 'react'

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
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1
const far = 300000

const cameraInitialPosition = [-900, -200, -900]

const controlsMaxDistance = 100000;
const controlsMinDistance = 1000;

const scene = new Scene();

const camera = new PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.set(...cameraInitialPosition);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

function render() {
    requestAnimationFrame(() => renderer.render(scene, camera));
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    render()
}


export default function PanoramicView({ data, setNavVisibility }) {

    const [canvas, setCanvas] = useState(null)

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])


    useEffect(() => {
        if (canvas) {
            console.log('creating panoramic view')

            let skySphereGeo = new SphereGeometry(100000, 100, 100);
            let textureSphere = new TextureLoader().load(data);
            let skySphere = new Mesh(skySphereGeo, new MeshBasicMaterial({ map: textureSphere, side: BackSide }));

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render)

            controls.minDistance = controlsMinDistance;
            controls.maxDistance = controlsMaxDistance;


            canvas.appendChild(renderer.domElement);
            scene.add(skySphere)
           
            console.log(scene)
            setTimeout(render, 100)

        }
    }, [canvas])

    return (
        <div ref={setCanvas} style={{ position: 'fixed' }}
            onPointerDown={() => { setNavVisibility(false) }}
            onPointerUp={() => { setNavVisibility(true) }}
        >

        </div>
    )
}
