import React from "react";

const PropertyCard = ({
  propertyId,
  zipCode,
  address,
  features,
  rent,
  isVacant,
  houseOwner,
}) => {
  return (
    <div className="flex justify-center items-center border-t border-2 rounded-md border-black-border dark:border-white-border">
      <div className="max-w-sm w-full py-4 px-2">
        <div className="bg-white-background dark:bg-black-background rounded-lg overflow-hidden">
          <div className=" p-3"></div>
          <div className="p-3">
            <p className="text-2xl text-black-background dark:text-white-background">
              ₹{rent}
            </p>
            <p className="text-black-fill dark:text-white-fill">{address}</p>
            <p className="text-black-fill dark:text-white-fill">
              Zip Code: {zipCode}
            </p>
            <p className="text-black-fill dark:text-white-fill">
              Property ID: {propertyId}
            </p>
            <p className="text-black-fill dark:text-white-fill">
              Features: {features}
            </p>
            <p className="text-black-fill dark:text-white-fill">
              Vacant: {isVacant ? "Yes" : "No"}
            </p>
          </div>

          <OwnerInfo houseOwner={houseOwner} />
        </div>
      </div>
    </div>
  );
};

const OwnerInfo = ({ houseOwner }) => (
  <div className="px-3 pt-2 pb-3 border-t border-gray-300 bg-white-background dark:bg-black-background dark:border-gray-100">
    <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
      Owner
    </div>
    <div className="flex justify-start items-center pt-2">
      <div>
        <p className="font-bold text-black-border dark:text-white-border">
          {houseOwner.house_owner_firstName} {houseOwner.house_owner_middleName}{" "}
          {houseOwner.house_owner_lastName}
        </p>
        <p className="text-sm text-black-fill dark:text-white-fill">
          {houseOwner.house_owner_phoneNumber}
        </p>
      </div>
    </div>
  </div>
);

export default PropertyCard;
