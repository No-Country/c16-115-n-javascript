
import { PropTypes } from 'prop-types';


import { useState } from "react";


// import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { ModalUpdate } from './ModalUpdate';
import { useSelector } from 'react-redux';

// import { updateEvent } from '../../../../../fetch/eventsAdmin';
// import { timeOutMessage } from '../../../../../utils/timeOutMessage';

import clsx from 'clsx';




export const CancelEvent = ({ modalCancelOpen, setModalCancelOpen, setModalOpen }) => {

  // const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { activeEvent } = useSelector((state) => state.event);



  const handleCloseModal = (e) => {
    e.preventDefault()

    setModalCancelOpen(false);
    setModalOpen(false);

  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    console.log('Evento ' + activeEvent.name + ' cancelado');

    setTimeout(()=>{
      setLoading(false)
      setModalCancelOpen(false)
      setModalOpen(false)
    }, 2000)

  }

  return (
    <ModalUpdate isOpen={modalCancelOpen} onClose={handleCloseModal} small={ true }>
      <div className="flex flex-col p-4 justify-center my-auto mx-auto w-[80%]">
        <h1 className='mb-10 text-xl font-bold'>¿Está seguro de cancelar el evento?</h1>

        <form onSubmit={handleSubmit}>


          <div className='flex items-center justify-center gap-6 mt-6'>
            <button disabled={loading} type='submit' className={
              clsx({
                'btn-danger': !loading,
                'btn-disabled': loading,
              })
            }>Si, quiero cancelar</button>
            <button onClick={handleCloseModal} className='btn-primary'>Salir</button>
          </div>

          {/* <span className="text-red-500">{errorMessage}</span> */}
        </form>
      </div>
    </ModalUpdate>
  )
}


CancelEvent.propTypes = {
  modalCancelOpen: PropTypes.bool,
  setModalCancelOpen: PropTypes.func,
  setModalOpen: PropTypes.func,
}