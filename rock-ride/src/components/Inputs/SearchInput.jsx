import { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useEventStore } from '../../hooks/useEventStore';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../helpers/functions';


const SearchInput = () => {

  const { events, setActiveEvent } = useEventStore();
  const nameData = events.map((event) => event.name);


  const [name, setName] = useState("");
  const [nameOptions, setNameOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const filteredNameData = nameData.filter((nameState) => nameState.toLowerCase().includes(name.toLowerCase()));

    const limitedOptions = filteredNameData.slice(0, 10);

    if (limitedOptions.length > 0 && name.length > 0) {
      setNameOptions(limitedOptions);     
    } else {
      setNameOptions([])
    }
    return () => {
      // Limpiar el estado nameOptions cuando el componente se desmonta
      setNameOptions([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, events]);


  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
    
  };

  const findEvent = (name) => {
    const event = events.find(event => event.name.toLowerCase() === name.toLowerCase())
    return event
  }

  const handleNameClick = () => {
    const event = findEvent(name)

    if (event) {
      setActiveEvent(event)
    }
    setError("No hay resultados")
    setTimeout(() => {
      setError("")
    }, 2000)
  };

  const handleSearchClick = (nameOption) => {
    if(nameOption) {
      scrollToTop()
      setName("")
      setNameOptions([])
      setActiveEvent(events.find(event => event.name === nameOption))
    }
  }


  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar si el clic ocurrió dentro del componente o en sus descendientes
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        // Cerrar las opciones
        setNameOptions([]);
      }
    };

    // Agregar un event listener para clics en el documento
    document.addEventListener("click", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  



  return (
    <div className='relative flex justify-between items-center w-[100%] h-[5rem] shadow bg-white rounded-full px-[0.5rem]  '>
        { error &&<div className='absolute p-2 bg-red-400 rounded-sm -top-16'> <p className='text-slate-50'>{error}</p> </div> }
        <input 
          value={name}
          onChange={handleChange}
          placeholder='Busca un evento' 
          className='w-[100%] focus:border-none h-16 rounded-full pl-4'
        />
        <button 
          onClick={handleNameClick}
          className='hidden sm:absolute right-4 sm:flex sm:w-[3rem] sm:h-[3rem] items-center justify-center text-white rounded-full bg-[#18A0FB] '>
          <FaSearch />
        </button>
        {nameOptions.length > 0 && (
          <div className='absolute w-[100%] left-0 sm:w-[400px] bg-slate-50 border-[1px] border-slate-300 top-24 rounded-lg shadow-2xl' ref={componentRef}>
            <ul className='list-none text-left'>
              {nameOptions.map((option, index) => {
                return (
                  <NavLink onClick={() => handleSearchClick(option)} to={`/event/${findEvent(option)?.id}`} key={index}>
                    <li
                      className='text-xs sm:text-base text-slate-900 cursor-pointer p-2 sm:p-3 hover:bg-blue-300 transition-colors-all'
                    >
                      {option}
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  )
}

export default SearchInput