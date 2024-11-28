import React from "react";

import header from "../assets/images/header.webp";
import about1 from "../assets/images/about1.jpg";
import about2 from "../assets/images/about2.jpg";
import about3 from "../assets/images/about3.webp";
import { BiHome } from "react-icons/bi";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const offerListing = [
    {
      id: 1,
      data: {
        title: "Luxury Apartment",
        price: "$1200/month",
        description: "Spacious 2BHK with modern amenities.",
        image: "https://via.placeholder.com/300",
      },
    },
    {
      id: 2,
      data: {
        title: "Cozy Studio",
        price: "$800/month",
        description: "Perfect for singles, near the city center.",
        image: "https://via.placeholder.com/300",
      },
    },
  ];

  const rentListing = [
    {
      id: 1,
      data: {
        title: "2 Bedroom House",
        price: "$1000/month",
        description: "Great location, pet-friendly.",
        image: "https://via.placeholder.com/300",
      },
    },
    {
      id: 2,
      data: {
        title: "Modern Apartment",
        price: "$1500/month",
        description: "Recently renovated, close to transportation.",
        image: "https://via.placeholder.com/300",
      },
    },
  ];

  return (
    <>
      <div className="rounded-tl-0 rounded-tr-0 rounded-br-0 rounded-bl-0 bg-white h-[100%] mx-[0rem] mb-10">
        <div className="lg:pt-[0.5rem] pt-[4rem] lg:mx-[5rem] mx-6 flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start">
          <div>
            <h4 className="font-medium font-serif text-sm lg:text-cente md:text-start md:text-sm text-red-500">
              Real Estate
            </h4>
            <h1 className="font-bold font-display text-4xl lg:text-cente md:text-start md:text-7xl text-[#091638] pt-4">
              Find a Perfect <br /> Home you love..
            </h1>
            <p className="text-1xl md:text-1.5xl font-display md:w-[70%] text-[#808080] font-md lg:text-cente md:text-start pt-4">
              Housied is the complete rental solution for landlords and tenants
              - list a home, rent a space, help tenants through out the process
              till they are settled in
            </p>

            <div className="fle items-center justify-center">
              <button className="bg-red-500 text-white py-3 px-5 rounded-3xl mt-7">
                More Details
              </button>
            </div>
          </div>
          <div>
            <div className="lg:mt-0 pt-12">
              <img src={header} className="w-full" />
            </div>
          </div>
        </div>

        {/* Who we are */}
        <div className="pt-[1rem] lg:mx-[5rem] mx-6 flex lg:flex-row flex-col lg:justify-between lg:items-start justify-start items-start mt-[5rem] lg:mt-[8rem]">
          <div className="lg:w-[50%]">
            <h4 className="font-medium font-serif text-sm md:text-start md:text-sm text-red-500">
              Who we are
            </h4>
            <h1 className="font-bold font-display text-4xl md:text-start md:text-4xl text-[#091638] pt-4">
              Assisting individuals in locating the appropriate real estate.
            </h1>
            <p className="text-1xl md:text-[16px] font-display lg:w-[70%] text-[#808080] font-md md:text-start pt-4">
              Housied is the complete rental solution for landlords and tenants
              - list a home, rent a space, help tenants through out the process
              till they are settled in
            </p>

            <div className="mt-[2rem]">
              <div className="lg:w-[400px] w-full h-[91px] bg-white shadow-2xl rounded-lg flex justify-between items-center space-x-4 py-4 px-4">
                <div>
                  <BiHome size={30} color="red" />
                </div>
                <div>
                  <h5 className="font-normal font-display text-[18px] md:text-[18px] text-[#091638]">
                    Donec porttitor euismod
                  </h5>
                  <p className="text-[13px] md:text-[13px] font-display text-[#808080] font-sm md:text-start pt-2">
                    Nullam a lacinia ipsum, nec dignissim purus. Nulla
                  </p>
                </div>
              </div>

              <div className="lg:w-[400px] w-full bg-white shadow-2xl rounded-lg flex justify-between items-center space-x-4 py-4 px-4 mt-6">
                <div>
                  <BiHome size={30} color="red" />
                </div>
                <div>
                  <h5 className="font-normal font-display text-[18px] md:text-[18px] text-[#091638]">
                    Donec porttitor euismod
                  </h5>
                  <p className="text-[13px] md:text-[13px] font-display text-[#808080] font-sm md:text-start pt-2">
                    Nullam a lacinia ipsum, nec dignissim purus. Nulla
                  </p>
                </div>
              </div>

              <div></div>
            </div>
          </div>
          <div className="flex justify-center items-center lg:pt-0 pt-6">
            <div className="pt-14">
              <img src={about1} className="h-30" />
            </div>
            <div className="">
              <img src={about2} className="h-38" />
              <img src={about3} className="h-28" />
            </div>
          </div>
        </div>
      </div>
      <div className="font-display bg-white">
        <div className=" lg:mx-[6rem] mx-6 lg:pt-12 pt-6 space-y-6">
          {offerListing && offerListing.length > 0 && (
            <div className="m-2 mb-6">
              <h2 className="text-4xl mt-6 font-semibold text-red-700">
                Recent Offers
              </h2>
              <p className="text-1xl md:text-1.5xl font-display md:w-[50%] text-[#808080] font-md md:text-start pt-4">
                BestCrib is the complete rental solution for landlords and
                tenants - list a home, rent a space.
              </p>
              <p className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {offerListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="lg:mx-[6rem] mx-6 pt-4 space-y-6">
          {rentListing && rentListing.length > 0 && (
            <div className="m-2 mb-6">
              <h2 className="px-3 text-4xl mt-6 text-red-700 font-semibold">
                Places for Rent
              </h2>

              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>

              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {rentListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
