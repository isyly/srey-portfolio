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
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid min-h-[50vh] grid-cols-1 md:grid-cols-8 ">
        <div className=" h-[26rem] md:h-[48rem] lg:h-[72rem] xl:h-[76rem] col-span-8 ">
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
        <div className="justify-center">
          <a href="/CvSylvainRey2024.pdf" download="CvSylvainRey2024.pdf">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download</span>
            </button>
          </a>
        </div>
      </div>
    </Bounded>
  );
};

export default Resume;
