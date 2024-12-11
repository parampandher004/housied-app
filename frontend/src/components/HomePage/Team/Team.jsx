import React from "react";
import { FaGithub } from "react-icons/fa";

const Team = () => {
  return (
    <section className="bg-white dark:bg-gray-900" id="team">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our team
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            "With backgrounds in technology, real estate, customer service, and
            design, our team brings a unique blend of skills to create a
            platform you can trust for your housing needs."
          </p>
        </div>
        <div className="gap-8 lg:gap-16 text-center inline-flex justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              alt="Bonnie Avatar"
            />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">PARAMVEER SINGH PANDHER</a>
            </h3>
            <p>Department: CSE </p>
            <button>
              <a
                href="#"
                className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
              >
                <FaGithub className="size-7" />
              </a>
            </button>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
              alt="Helene Avatar"
            />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">TUSHAR KANTI</a>
            </h3>
            <p>Department: CSE </p>

            <button>
              <a
                href="#"
                className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
              >
                <FaGithub className="size-7" />
              </a>
            </button>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="Jese Avatar"
            />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">MAMUN HASAN CHOUDHURI</a>
            </h3>
            <p>Department: CSE </p>

            <button>
              <a
                href="#"
                className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
              >
                <FaGithub className="size-7" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
