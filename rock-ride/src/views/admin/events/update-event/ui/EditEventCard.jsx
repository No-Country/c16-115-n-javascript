import { PropTypes } from 'prop-types'

import { useSelector } from 'react-redux';

import { formateDate } from '@/utils/formateDate';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { capitalizeString } from '@/utils/capitalizeString';
import { EditButton } from '@/components';
import { ModalUpdate } from './ModalUpdate';
import { useEventStore } from '@/hooks/useEventStore';
import { formateLocation } from '../../../../../utils/formateLocation';



export const EditEventModal = ({ 
  isModalOpen, 
  setModalOpen, 
  setModalImageOpen, 
  setModalNameOpen, 
  setModalCategoryOpen,
  setModalDateOpen,
  setModalLocationOpen,
  setModalCancelOpen,
}) => {

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
    setModalNameOpen(true)
  }

  const handleEditCategory = () => {
    setModalCategoryOpen(true)
  }

  const handleEditDate = () => {
    setModalDateOpen(true)
  }

  const handleEditLocation = () => {
    setModalLocationOpen(true)
  }

  if (!activeEvent) return null;
  const { country, stateOrProvince, city } = activeEvent


  return (
    <>

    <ModalUpdate isOpen={isModalOpen} onClose={handleCloseModal}>

      <div className='relative'>
      <EditButton handleClick={ handleEditImage } position='absolute' />
    
    {
      activeEvent && 
        <>
          <div className='w-full h-[70%] overflow-hidden'>
            <img className="h-full w-full object-cover object-top aspect-video" src={activeEvent.img} alt="" />
          </div>

          <div className='p-2 space-y-4 mb-2'>
            <div className='px-2 flex items-center justify-between'>

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
                <p>{formateLocation({ country, stateOrProvince, city })}</p>
                <EditButton handleClick={ handleEditLocation } />
              </div>
            </div>
          </div>

          <div className='flex justify-end mr-6'>
            <button onClick={ ()=> setModalCancelOpen(true)} className='btn-danger-small'>Cancelar evento</button>
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
  setModalImageOpen: PropTypes.func,
  setModalNameOpen: PropTypes.func,
  setModalCategoryOpen: PropTypes.func,
  setModalDateOpen: PropTypes.func,
  setModalLocationOpen: PropTypes.func,
  setModalCancelOpen: PropTypes.func,
}