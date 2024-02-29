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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/features/event-slice";


const Carousel = () => {
  const events = useSelector(
    (state) => state.eventReducer?.allEvents.events
  );
  const dispatch = useDispatch()


  useEffect(() => {
    if(!events?.lenght)dispatch(fetchEvents())
  }, []);

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
            <EventCard Name={e.name} img={e.img} id={e.id} />
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};

export default Carousel;
