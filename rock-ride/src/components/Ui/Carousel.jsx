// import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "../Cards/EventCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEventStore } from "../../hooks/useEventStore";
import { useSelector } from "react-redux";


const Carousel = () => {
  const {setActiveEvent} = useEventStore();

  const { events} = useSelector((state) => state.event);

  return (
    <Swiper
      className=""
      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
      spaceBetween={20}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      slidesPerView={1.1}
      breakpoints={{
        640: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 0,
        },
      }}
    >
      {events?.map((e, index) => {
        return (
          <SwiperSlide key={index}>
            <EventCard name={e.name} img={e.img} id={e.id} setActiveEvent={setActiveEvent} />
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};

export default Carousel;
