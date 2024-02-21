"use client"

import * as THREE from "three"
import { ContactShadows, Environment, Float } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"


export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className="z-0" shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}>
                <Suspense fallback={null}>
                    <Geometries />

                    <ContactShadows
                        position={[0, -5.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9} />
                    <Environment preset="studio" />


                </Suspense>
            </Canvas>

        </div>
    )
}

function Geometries() {
    const geometries = [
        {
            position: [0, 1, 0],
            r: 0.4,
            geometry: new THREE.IcosahedronGeometry(4) //Gem
        },
        {
            position: [-2, 3, -2],
            r: 0.3,
            geometry: new THREE.CylinderGeometry(0, 1, 2, 4) //Gem
        },
        {
            position: [3, 3, -4],
            r: 0.3,
            geometry: new THREE.DodecahedronGeometry(1, 0) //Gem
        },
        {
            position: [0.5, 2, -2],
            r: 0.4,
            geometry: new THREE.CapsuleGeometry(0.5, 1.5, 1, 64) //Gem
        },
        {
            position: [0, -1, +2],
            r: 0.3,
            geometry: new THREE.CapsuleGeometry(0.3, 0.8, 1, 32) //Gem
        },
        {
            position: [-3, -1, -6],
            r: 0.3,
            geometry: new THREE.TorusKnotGeometry(1, 0.5, 60, 3, 7, 6)
            //Gem
        },
        {
            position: [2.5, 0, -3],
            r: 0.5,
            geometry: new THREE.TorusGeometry(0.9, 0.6, 8, 6)
            //Gem
        },
    ];

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0xe58e26, roughness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0xb71540, roughness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0x0a3d62, metalness: 1, roughness: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0x0a3d62, roughness: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0x0c2461, metalness: 1, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x0c2461, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x079992, roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ color: 0xb71540, metalness: 1, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x079992, metalness: 1, roughness: 0.3 }),
    ]

    const soundEffects = [
        new Audio("/sounds/impact_001.ogg"),
        new Audio("/sounds/impact_002.ogg"),
        new Audio("/sounds/impact_003.ogg"),
        new Audio("/sounds/impact_004.ogg"),
    ]

    return geometries.map(({ position, r, geometry }) => (
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((p) => p * 2)}
            soundEffects={soundEffects}
            geometry={geometry}
            materials={materials}
            r={r}

        />
    ))
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
    const meshRef = useRef()

    const [visible, setVisible] = useState(false)
    const startingMaterial = getRandomMaterial()

    function getRandomMaterial() {
        return gsap.utils.random(materials)
    }
    function handleClick(e) {
        const mesh = e.object;
        gsap.utils.random(soundEffects).play()

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            // yoyo: true,
        })
        mesh.material = getRandomMaterial()

    }
    const handlePointerOver = () => {
        document.body.style.cursor = "pointer"
    }
    const handlePointerOut = () => {
        document.body.style.cursor = "default"
    }

    useEffect(() => {
        let ctx = gsap.context(() => {
            setVisible(true)
            gsap.from(meshRef.current.scale,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                    ease: "elastic.out(1,0.3)",
                    delay: 0.9,
                })
        })
        return () => ctx.revert() //cleanup
    }, []);


    return (
        <group position={position} ref={meshRef}>
            <Float speed={8 * r} rotationIntensity={10 * r} floatIntensity={25 * r}>
                <mesh
                    geometry={geometry}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                    material={startingMaterial}
                />
            </Float>

        </group>
    )
}