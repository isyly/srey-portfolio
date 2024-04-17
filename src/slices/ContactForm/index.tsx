"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Button from "@/components/Button";
import Shapes from "@/slices/Hero3D/Shapes";

/*** Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */

const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_t3wkvdg",
        "template_lmb9hxc",
        {
          from_name: form.name,
          to_name: "Sylvain",
          from_email: form.email,
          to_email: "sylvain.rey.75@gmail.com",
          message: form.message,
        },
        "GwsxXHNqc6bj7ak2N"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("something went wrong");
        }
      );
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h3 className="mb-8 text-[clamp(1.2rem,13vmin,13rem)] font-extrabold leading-none tracking-tighter">
        <PrismicRichText field={slice.primary.Title} />
      </h3>
      <div className="grid min-h-[50vh] grid-cols-1 md:grid-cols-2">
        <Shapes />
        {/* <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden"> */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className=" mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Votre Nom</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Comment vous appelez-vous ?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none
     border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Votre courrier électronique
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Quel est votre email ?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none
     border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Votre message</span>
            <textarea
              rows={parseInt("7")}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Qu'avez-vous à me dire ?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none
           border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="  group relative flex w-fit text-sky-800 items-center justify-center overflow-hidden rounded-md border-2 border-sky-900 bg-sky-50  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105"
          >
            <span className="absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0" />
            <span className="relative flex items-center justify-center gap-2">
              {loading ? "Envoi en cours" : "Envoyer"}
              {<MdArrowOutward className="inline-block" />}
            </span>
          </button>
        </form>
      </div>
    </Bounded>
  );
};

export default ContactForm;
