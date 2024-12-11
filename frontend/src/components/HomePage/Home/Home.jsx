import { Typewriter } from "react-simple-typewriter";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import SearchButton from "../../SearchButton/SearchButton";

const SECTION_HEIGHT = 400;

export const Home = () => {
  return (
    <div className="bg-white dark:bg-black" id="home">
      <Hero />
    </div>
  );
};

const Hero = () => {
  return (
    <div
      style={{
        height: `calc(${SECTION_HEIGHT}px + 100vh)`,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
      className="relative w-full bg-container bg-cover bg-center "
    >
      <FixedSearch />
      <div className="absolute bottom-0 left-0 right-0 h-[700px] bg-gradient-to-b from-white/0 to-white dark:from-black/0 dark:to-black" />
    </div>
  );
};

const FixedSearch = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);
  const texts = ["JOURNEY", "COMFORT", "LIFESTYLE", "FUTURE"];

  return (
    <motion.div
      className="fixed top-1/2  w-full transform z-10 flex flex-col items-center"
      style={{ opacity }}
    >
      <h1 className="text-2xl p-4 text-white font-frederickaTheGreat">
        Find your space, live your dream, and redefine your{" "}
        <div>
          <Typewriter
            words={texts}
            typeSpeed={100}
            deleteSpeed={200}
            loop={0}
            cursor={true}
          />
        </div>
      </h1>
      <SearchButton />
    </motion.div>
  );
};
