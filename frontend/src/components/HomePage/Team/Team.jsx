import React from "react";
import { FaGithub, FaUserCircle } from "react-icons/fa";

const Team = () => {
  return (
    <section className="bg-white-fill dark:bg-black-fill" id="team">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black-background dark:text-white-background">
            Our Team
          </h2>
          <p className="font-light text-base-400 sm:text-xl dark:text-base-100">
            "With backgrounds in technology, real estate, customer service, and
            design, our team brings a unique blend of skills to create a
            platform you can trust for your housing needs."
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          <div className="text-center ">
            <FaUserCircle className="mx-auto mb-4 w-36 h-36 text-black-foreground dark:text-white-foreground" />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-black-foreground dark:text-white-foreground">
              <p>PARAMVEER SINGH PANDHER</p>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Department: CSE</p>
            <a
              href="https://github.com/parampandher004"
              target="_blank"
              className="text-black-background hover:text-black-border dark:hover:text-white-border dark:text-white-background flex justify-center"
            >
              <FaGithub className="mt-2 w-6 h-6" />
            </a>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <FaUserCircle className="mx-auto mb-4 w-36 h-36 text-black-foreground dark:text-white-foreground" />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-black-foreground dark:text-white-foreground">
              <p>TUSHAR KANTI</p>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Department: CSE</p>
            <a
              href="https://github.com/Hades-Blade"
              target="_blank"
              className="text-black-background hover:text-black-border dark:hover:text-white-border dark:text-white-background flex justify-center"
            >
              <FaGithub className="mt-2 w-6 h-6" />
            </a>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <FaUserCircle className="mx-auto mb-4 w-36 h-36 text-black-foreground dark:text-white-foreground" />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-black-foreground dark:text-white-foreground">
              <p>MAMUN HASAN CHOUDHURI</p>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Department: CSE</p>
            <a
              href="https://github.com/mamun-mhc"
              target="_blank"
              className="text-black-background hover:text-black-border dark:hover:text-white-border dark:text-white-background flex justify-center"
            >
              <FaGithub className="mt-2 w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
