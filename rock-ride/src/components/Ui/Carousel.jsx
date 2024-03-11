// import React from "react";
import { PropTypes } from "prop-types";
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

const Carousel = ({ category }) => {
  const { setActiveEvent } = useEventStore();

  const { events } = useSelector((state) => state.event);

  const eventsFiltered = events.filter((e) => e.category === category);

  if (eventsFiltered.length < 3) return <></>;

  return (
    <section className="flex justify-center  items-center w-[100%]">
      <div className="flex flex-col justify-around items-start sm:w-[90%] w-[90%] h-[20rem]">
        <h3 className="text-[1.5rem] font-bold">{category.toUpperCase()}</h3>
        <div className="flex w-[105.5%]">
          <Swiper
            className=""
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
            spaceBetween={20}
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
              1200: {
                slidesPerView: 2.5,
                spaceBetween: 0,
              },
            }}
          >
            {events
              ?.filter((e) => e.category === category)
              .map((e, index) => {
                return (
                  <SwiperSlide key={index}>
                    <EventCard event={e} setActiveEvent={setActiveEvent} />
                  </SwiperSlide>
                );
              })}
            ...
          </Swiper>
        </div>
      </div>
    </section>
  );
};

Carousel.propTypes = {
  category: PropTypes.string,
};

export default Carousel;
