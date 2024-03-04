import { useCallback, useEffect, useState } from "react";


export const useScrollBgColor = () => {
  const [navbarBackground, setNavbarBackground] = useState(false);


  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const threshold = 100;

    if (scrollY > threshold) {
      setNavbarBackground(true);
    } else {
      setNavbarBackground(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Limpia el evento del scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);



  return { navbarBackground }
}