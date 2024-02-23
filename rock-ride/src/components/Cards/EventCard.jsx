import React from "react";
import { NavLink } from "react-router-dom";

const EventCard = ({ Name = "Apple Worldwide", TripAmount = 10,id=1 }) => {
  return (
    <div className="py-[2rem] px-[3rem]  bg-[#cacaca] h-[16rem] w-[95%] flex flex-col justify-between">
      <h3 className="text-[2.5rem]">{Name}</h3>
      <div className="flex justify-between items-end">
        <NavLink to={`/event/${id}`}>
          <button className="rounded-3xl bg-[#18A0FB] text-white h-[3rem] w-auto px-[2rem]">
            Ver viajes
          </button>
        </NavLink>
        <p className="text-[0.9rem]">{TripAmount} viajes disponibles</p>
      </div>
    </div>
  );
};

export default EventCard;
