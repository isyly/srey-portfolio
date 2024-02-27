"use client"
import { Html, PresentationControls, Environment, useGLTF, Float, ContactShadows } from '@react-three/drei'

export default function Ordi() {

    const computer = useGLTF('/model.gltf')
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
                <primitive
                    object={computer.scene}
                    position-y={-1.2}
                   >
                    <Html />
                    </primitive>

            </Float>

        </PresentationControls>
        <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.65}
            scale={5}
            blur={2}
        />


    </>
}