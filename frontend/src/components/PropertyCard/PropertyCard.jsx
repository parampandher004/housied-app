import React from "react";

const PropertyCard = ({
  backgroundImage,
  ownerName,
  rooms,
  bathrooms,
  address,
  rent,
  ownerImage,
  ownerContact,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-sm w-full py-4 px-2">
        <div className="bg-white-background dark:bg-black-background rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-40 p-3"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="flex justify-end">
              <HeartIcon />
            </div>
          </div>
          <div className="p-3">
            <p className="text-2xl text-black-background dark:text-white-background">
              ₹{rent}
            </p>
            <p className="text-black-fill dark:text-white-fill">{address}</p>
          </div>
          <div className="flex p-3 border-t border-white-border dark:border-black-border text-black-fill dark:text-white-fill">
            <InfoItem icon={<BedIcon />} label="Bedrooms" value={rooms} />
            <InfoItem icon={<BathIcon />} label="Bathrooms" value={bathrooms} />
          </div>
          <OwnerInfo ownerName={ownerName} ownerImage={ownerImage} ownerContact={ownerContact} />
        </div>
      </div>
    </div>
  );
};

const HeartIcon = () => (
  <svg
    className="h-5 w-5 text-black-foreground dark:text-white-foreground fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
  </svg>
);

const BedIcon = () => (
  <svg
    className="h-5 w-5 text-black-foreground dark:text-white-foreground stroke-600 fill-current mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
  </svg>
);

const BathIcon = () => (
  <svg
    className="h-5 w-5 text-black-foreground dark:text-white-foreground fill-current mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"
    ></path>
  </svg>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex-1 inline-flex items-center">
    {icon}
    <p>
      <span className="text-black-foreground dark:text-white-foreground font-bold">
        {value}
      </span>{" "}
      {label}
    </p>
  </div>
);

const OwnerInfo = ({ ownerName, ownerImage, ownerContact }) => (
  <div className="px-3 pt-2 pb-3 border-t border-gray-300 bg-white-background dark:bg-black-background dark:border-gray-100">
    <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
      Owner
    </div>
    <div className="flex items-center pt-2">
      <div
        className="bg-cover bg-center w-8 h-8 rounded-full mr-2"
        style={{ backgroundImage: `url(${ownerImage})` }}
      ></div>
      <div>
        <p className="font-bold text-black-border dark:text-white-border">
          {ownerName}
        </p>
        <p className="text-sm text-black-fill dark:text-white-fill">
          {ownerContact}
        </p>
      </div>
    </div>
  </div>
);

export default PropertyCard;
