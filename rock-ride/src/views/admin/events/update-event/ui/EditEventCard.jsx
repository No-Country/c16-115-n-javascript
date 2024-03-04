import { PropTypes } from 'prop-types'

import { useSelector } from 'react-redux';

import { formateDate } from '@/utils/formateDate';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { capitalizeString } from '@/utils/capitalizeString';
import { EditButton } from '@/components';
import { ModalUpdate } from './ModalUpdate';
import { useEventStore } from '@/hooks/useEventStore';



export const EditEventModal = ({ isModalOpen, setModalOpen, setModalImageOpen }) => {

  const { setActiveEvent } = useEventStore()


  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveEvent(null);

  };

  const { activeEvent } = useSelector((state) => state.event);

  const handleEditImage = () => {
    setModalImageOpen(true)
  }

  const handleEditName = () => {
    console.log('Editar Name');
  }

  const handleEditCategory = () => {
    console.log('Editar Category');
  }

  const handleEditDate = () => {
    console.log('Editar Date');
  }

  const handleEditLocation = () => {
    console.log('Editar Location');
  }

  const locationText = () => { 
    if ( activeEvent.city !== activeEvent.stateOrProvince ) {
      return `${activeEvent.city}, ${activeEvent.stateOrProvince}, ${activeEvent.country}`;
    } 
    return `${activeEvent.city}, ${activeEvent.country}`;
  }

  return (
    <>

    <ModalUpdate isOpen={isModalOpen} onClose={handleCloseModal}>

      <div className='relative'>
      <EditButton handleClick={ handleEditImage } position='absolute' />
    
    {
      activeEvent && 
        <>
          <div className='w-full h-[70%] overflow-hidden'>
            <img className="min-h-full object-cover object-top" src={activeEvent.img} alt="" />
          </div>

          <div className='p-2 space-y-8'>
            <div className='p-2 flex items-center justify-between'>

              <div className='flex items-center gap-2'>
                <h3 className='text-2xl'>{activeEvent.name}</h3>
                <EditButton handleClick={ handleEditName } />
              </div>

              <div className='flex items-center gap-2'>
                <p>Categoría: {capitalizeString(activeEvent.category)}</p>
                <EditButton handleClick={ handleEditCategory } />
              </div>
            </div>
            <div className="flex items-center justify-between px-2 text-sm">
              <div className='flex items-center gap-2'>
                <IoCalendarOutline size={24} color='#4B5563' />
                <p>{formateDate(activeEvent.date)}hs</p>
                <EditButton handleClick={ handleEditDate } />
              </div>
              <div className='flex items-center justify-end w-[55%] gap-2'>
                <IoLocationOutline size={24} color='#4B5563' />
                <p>{locationText()}</p>
                <EditButton handleClick={ handleEditLocation } />
              </div>
            </div>
          </div>

        </>

    }
      </div>

    </ModalUpdate>

    
  
       
    </>
  )
}


EditEventModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  setModalImageOpen: PropTypes.func
}