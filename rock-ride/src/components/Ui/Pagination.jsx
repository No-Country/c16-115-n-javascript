import { PropTypes } from 'prop-types';
import clsx from "clsx"
import { scrollToTopSmooth } from '../../helpers/functions';


export const Pagination = ({ endIndex, currentPage, setCurrentPage, totalItems, totalPages }) => {


  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTopSmooth()
  };


  return (
    <div className="flex justify-between items-center mt-4">
          <div className='ml-0 sm:ml-2'>
            <p className='text-xs sm:text-base'>Página <strong>{currentPage}</strong> de {totalPages}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={ () => handlePageChange( Math.max(currentPage - 1, 1) ) }
              disabled={currentPage === 1}
              className={
                clsx(
                  "ml-2",
                  {
                    "btn-primary": currentPage !== 1,
                    "btn-disabled": currentPage === 1,
      
                  }
                )
              }
            >
              Anterior
            </button>
            <button
              onClick={ () => handlePageChange( currentPage + 1 ) }
              disabled={endIndex >= totalItems}
              className={
                clsx(
                  "ml-2",
                  {
                    "btn-primary": endIndex < totalItems,
                    "btn-disabled": endIndex >= totalItems,      
                  }
                )
              }
            >
              Siguiente
            </button>
          </div>
      </div>  
  )
}


Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};