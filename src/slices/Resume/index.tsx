"use client";
import Bounded from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import Ordi from "./Ordi.jsx";

import { Content } from "@prismicio/client";
import { SliceComponentProps, usePrismicClient } from "@prismicio/react";

/**
 * Props for `Resume`.
 */
export type ResumeProps = SliceComponentProps<Content.ResumeSlice>;

/**
 * Component for "Resume" Slices.
 */
const Resume = ({ slice }: ResumeProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid  items-center aspect-square z-100">
        <Canvas
          className="r3f"
          camera={{
            fov: 45,
            near: 0.1,
            far: 10,
            position: [-1, +0.9, 5],
          }}
        >
          <Ordi />
        </Canvas>
      </div>
    </section>
  );
};

export default Resume;
