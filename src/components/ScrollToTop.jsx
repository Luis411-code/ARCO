import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll al TOP instantáneo al cambiar de página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 'smooth' si quieres animación suave
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;