import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import EventCard from "../Cards/EventCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Carousel = ({ events = [1, 5, 3, 4, 8] }) => {
  return (
    <Swiper
    className=" "
      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
      spaceBetween={0}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}    
      slidesPerView={2.3}
      
    >
      {events.map((e) => {
        return (
          <SwiperSlide>
            <EventCard />
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};

export default Carousel;