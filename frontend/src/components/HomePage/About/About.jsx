import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../hooks/useGlobalState";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButton/CustomButton";

const About = () => {
  const { state } = useGlobalState();
  const { auth } = state;

  return (
    <section
      className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto"
      id="about"
    >
      <div>
        <span className="block mb-4 text-xs md:text-sm text-base-400 dark:text-base-100 font-medium">
          Your perfect home awaits
        </span>
        <h3 className="text-4xl md:text-6xl text-black-fill dark:text-white-fill font-semibold">
          Discover the right place to call home
        </h3>
        <p className=" md:text-lg text-black-foreground dark:text-white-foreground my-4 md:my-6">
          Explore a variety of houses, apartments, and rooms tailored to fit
          your preferences. Our platform connects you with verified listings and
          ensures a seamless renting experience.
        </p>
        <Link to={auth.isAuthenticated ? "/layout/listing" : "/signin"}>
          <CustomButton
            text={auth.isAuthenticated ? "View Listings" : "Get Started"}
          />
        </Link>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1621626806480-53591486f446?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1662841540530-2f04bb3291e8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 4,
    src: "https://plus.unsplash.com/premium_photo-1692444606767-02aace4da0fe?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1485809686085-0fb7a34fee52?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq, index) => (
    <motion.div
      key={index}
      layout
      transition={{ duration: 1.5, ease: "easeInOut", type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000); // Set shuffle interval
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 h-[450px] gap-1">
      <AnimatePresence>{squares}</AnimatePresence>
    </div>
  );
};

export default About;
