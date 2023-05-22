import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const emailData = { host: "", template: "", public_key: "" };

emailData.host = import.meta.env.PUBLIC_SERVICE_ID;
emailData.template = import.meta.env.PUBLIC_TEMPLATE;
emailData.public_key = import.meta.env.PUBLIC_PUBLIC_KEY;

function Label({
  title,
  example,
  type,
  validation,
  register,
  registerName,
}: {
  title: string;
  example: string;
  type: string;
  validation: any;
  register: any;
  registerName: string;
}) {
  return (
    <>
      <label
        className="block text-white font-bold mb-2 opacity-50"
        htmlFor={title}
      >
        {title}
      </label>
      <input
        className=" bg-second-dark appearance-none border-2 border-second-dark rounded w-full py-2 px-3 text-white mb-3 leading-tight 
                focus:outline-none focus:border-principal"
        id={title}
        type={type}
        placeholder={example}
        {...register(registerName, { validation })}
      />
    </>
  );
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formRef = useRef(null);

  function Submit(data: any) {
    emailjs
      .sendForm(
        emailData.host,
        emailData.template,
        formRef.current!,
        emailData.public_key
      )
      .catch((err) => console.log(err));
    reset();
    setEmailSent(true);
  }

  const [emailtSent, setEmailSent] = useState(false);

  return (
    <div id="Contact" className="px-0 md:px-10 pb-10 min-h-min bg-dark">
      <div className="relative flex flex-col items-center">
        <p className="text-white font-secondary md:text-4xl text-2xl  italic mt-24 z-10">
          Contact
        </p>
        <div className="w-full p-5 rounded-lg my-12 md:my-20 max-w-md md:max-w-lg z-10">
          <form
            ref={formRef}
            className=" font-primary rounded px-8 mb-10 text-lg"
            onSubmit={handleSubmit(Submit)}
          >
            <fieldset form="contact-form" disabled={emailtSent}>
              <div className="mb-4 ">
                <Label
                  title="Name"
                  example="Jane"
                  type="text"
                  validation={{ required: true, maxLenght: 30 }}
                  registerName="name"
                  register={register}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-xs italic">
                    Name is required.
                  </p>
                )}
                {errors.name?.type === "maxLength" && (
                  <p className="text-red-500 text-xs italic">
                    Name too large, max 30 characters.
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Label
                  title="Email"
                  type="email"
                  example="example@gmail.com"
                  validation={{
                    required: true,
                    maxLength: 30,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  }}
                  registerName="email"
                  register={register}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500 text-xs italic">
                    Email is required.
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-red-500 text-xs italic">
                    Wrong email format
                  </p>
                )}
                {errors.email?.type === "maxLength" && (
                  <p className="text-red-500 text-xs italic">
                    Email too large, max 30 characters.
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-white font-bold mb-2 opacity-50"
                  htmlFor="password"
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  className="resize-none appearance-none bg-second-dark border-2 border-dark rounded w-full py-2 px-3 text-white mb-3 leading-tight 
                                    focus:outline-none focus:border-principal"
                  id="message"
                  placeholder="..."
                  {...register("message", { required: true, maxLength: 60 })}
                />
                {errors.message?.type === "required" && (
                  <p className="text-red-500 text-xs italic">
                    Message is required.
                  </p>
                )}
                {errors.message?.type === "maxLength" && (
                  <p className="text-red-500 text-xs italic">
                    Message too large, max 60 characters.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-principal border-2 border-principal hover:border-indigo-600 transition duration-75 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </fieldset>
          </form>
          <p className="text-center text-white opacity-40 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
