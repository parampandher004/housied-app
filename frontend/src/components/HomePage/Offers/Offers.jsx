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
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white-background dark:bg-black-background p-6 md:p-12"
      id="offers"
    >
      {/* Left Section */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-base-200">
          Amazing Offers Await!
        </h2>
        <p className="text-lg text-black-foreground dark:text-white-foreground mb-4">
          Discover the best deals for your next rental. Scroll through our
          curated offers and find the one that suits you best!
        </p>
        <p className="text-md text-base-300">
          Don’t wait too long—these deals won’t last forever. Your dream home is
          just a click away!
        </p>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center w-2/3">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper h-full w-full max-w-md"
        >
          <SwiperSlide>
            <PropertyCard
              ownerContact={"+91 1234567890"}
              ownerName={"John Doe"}
              rent={"2,000"}
              bathrooms={"2"}
              rooms={"3"}
              address={"123, Random Street, City"}
            />
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
