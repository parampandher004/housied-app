import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "../../PropertyCard/PropertyCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

const Offers = () => {
  return (
    <section
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-black p-6 md:p-12"
      id="offers"
    >
      {/* Left Section */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-primary-200">
          Amazing Offers Await!
        </h2>
        <p className="text-lg text-black dark:text-white mb-4">
          Discover the best deals for your next rental. Scroll through our
          curated offers and find the one that suits you best!
        </p>
        <p className="text-md text-primary-300">
          Don’t wait too long—these deals won’t last forever. Your dream home is
          just a click away!
        </p>
      </div>

      {/* Right Section */}
      <div className="grid grid-flow-col auto-cols-[300px] gap-4 p-4">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper h-full w-full"
        >
          <SwiperSlide>
            <PropertyCard />
          </SwiperSlide>
          <SwiperSlide>
            <PropertyCard />
          </SwiperSlide>
          <SwiperSlide>
            <PropertyCard />
          </SwiperSlide>
          <SwiperSlide>
            <PropertyCard />
          </SwiperSlide>
          <SwiperSlide>
            <PropertyCard />
          </SwiperSlide>
          <SwiperSlide>
            <PropertyCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Offers;
