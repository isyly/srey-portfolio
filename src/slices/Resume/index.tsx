import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for resume (variation: {slice.variation}) Slices
    </section>
  );
};

export default Resume;
