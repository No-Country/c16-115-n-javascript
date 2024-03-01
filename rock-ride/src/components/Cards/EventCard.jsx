import React from "react";
import { NavLink } from "react-router-dom";

const EventCard = ({ Name = "Apple Worldwide", TripAmount = 10, id = 1, img }) => {
  return (
    <>
      <NavLink className={"flex lg:hidden"} to={`/event/${id}`}>
        <div style={{backgroundImage: `url(${img})`}} className={` bg-cover text-[#ffffff]  bg-center h-[13rem] sm:h-[16rem]  w-[100%] sm:w-[95%] `}>
          <div className="backdrop-brightness-75 flex flex-col justify-between w-[100%] py-[2rem] px-[3rem] h-[100%] bg-black/40">
            <h3 className="text-[2.5rem] ">{Name}</h3>
            <div className="flex justify-between items-end">
              <p className="text-[0.9rem]">{TripAmount} viajes disponibles</p>
            </div>
          </div>
        </div>
      </NavLink>
      <div style={{backgroundImage: `url(${img})`}} className={`hidden lg:flex bg-cover text-[#ffffff] h-[13rem] sm:h-[16rem] w-[100%] sm:w-[95%] `}>
        <div className="backdrop-brightness-75 flex flex-col justify-between w-[100%] py-[2rem] px-[3rem] h-[100%] bg-black/40">
          <h3 className="text-[2.5rem] ">{Name}</h3>
          <div className="flex justify-between items-end">
            <NavLink to={`/event/${id}`}>
              <button className="rounded-3xl bg-[#18A0FB] text-white h-[3rem] w-auto px-[2rem]">
                Ver viajes
              </button>
            </NavLink>
            <p className="text-[0.9rem]">{TripAmount} viajes disponibles</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
