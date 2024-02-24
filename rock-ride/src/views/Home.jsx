import { NavLink } from "react-router-dom";
import { Carousel, EventCard, NavBar, SearchInput } from "../components";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center ">
      <div
        className={` bg-[#E5E5E5] w-[100%] bg-no-repeat bg-cover bg-right-bottom z-40 mb-[10rem]`}
      >
        <div
          className={` w-[100%] backdrop-brightness-75 flex flex-col items-center h-[21rem]`}
        >
          <NavBar />
        </div>
      </div>
      <div className="flex items-center absolute top-[16rem] w-[100%] justify-center z-40">
        <div className="flex items-center h-[10rem] w-[85%] justify-center bg-[#e9e9e9]">
          <div className="w-[90%]">
            <SearchInput />
          </div>
        </div>
      </div>

      <div className="flex justify-center  items-center w-[100%]  h-[23rem]">
        <div className="flex flex-col justify-around items-start w-[90%] h-[20rem]">
          <h3 className="text-[1.5rem] font-bold">Rock</h3>
          <div className="flex w-[105.5%] h-[30rem]">
            <Carousel/>
          </div>
        </div>
      </div>
      <div className="flex justify-center  items-center w-[100%]  h-[23rem]">
        <div className="flex flex-col justify-around items-start w-[90%] h-[20rem]">
          <h3 className="text-[1.5rem] font-bold">Pop</h3>
          <div className="flex w-[105%] h-[30rem]">
            <Carousel/>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
