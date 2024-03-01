import React from 'react'

const InfoItem = ({icon,title,content}) => {
    return (
        <div className={` flex flex-col w-[90%] md:w-[25%] justify-between text-center h-[14rem] items-center`}>
          <div className="  flex flex-col items-center justify-between  ">
            <div className="text-[4rem]">
            {icon}
            </div>
            <p className="text-[1.8rem] w-[100%] leading-auto font-bold">
              {title}
            </p>
            <p className="text-[0.9rem] leading-[0.9rem] w-[90%] sm:w-[22rem] font-regular  ">
              {content}
            </p>
          </div>
        </div>
      );
}

export default InfoItem