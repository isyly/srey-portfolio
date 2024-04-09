"use client"
import { extend } from '@react-three/fiber'
import { easing, geometry } from 'maath'

import { Html, Image, PresentationControls, Environment, useGLTF, Float, ContactShadows } from '@react-three/drei'
extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

export default function Ordi() {

    const computer = useGLTF('/model/model.gltf')
    return <>

        <Environment preset="city" />
        <PresentationControls
            global
            rotation={[-0.13, 0.1, 0]}
            polar={[0.1, 0.4]}
            azimuth={[-0.2, 0.25]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float
                rotationIntensity={0.4}
            >
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={'#ff6900'}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />

                {/* computer */}
                <primitive
                    object={computer.scene}
                    position-y={-1.2}
                >

                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={1.17}
                        position={[0, 1.56, -1.4]}
                        rotation-x={-0.256}
                        zIndexRange={[100, 0]}
                    >
                        <iframe src="/resumeWebsite/index.html" />
                    </Html>
                </primitive>
            </Float>

        </PresentationControls>
        <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.65}
            scale={5}
            blur={2}
        />


    </>
}