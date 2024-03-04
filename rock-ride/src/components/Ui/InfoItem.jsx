import { PropTypes } from 'prop-types'


const InfoItem = ({ icon, title, content }) => {
    return (
        <div className={`flex flex-col w-[220px] lg:w-[350px] justify-between text-center h-[11rem] items-center`}>
          <div className="  flex flex-col items-center justify-between  ">
            <div className="text-5xl lg:text-[4rem]">
            {icon}
            </div>
            <p className="text-xl lg:text-[1.8rem] w-[100%] font-bold mb-2">
              {title}
            </p>
            <p className="text-[0.9rem] leading-[0.9rem] sm:w-[22rem] font-regular text-balance">
              {content}
            </p>
          </div>
        </div>
      );
}

export default InfoItem

InfoItem.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}