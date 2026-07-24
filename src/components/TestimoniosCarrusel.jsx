import { useState } from 'react';

const TestimoniosCarrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonios = [
    {
      id: 1,
      nombre: "María Rodríguez",
      empresa: "Tech Solutions Cuba",
      cargo: "CEO",
      foto: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=0a3d6b&color=fff&size=100&font-size=0.5",
      reseña: "Excelente servicio. Soluciones Holguín transformó nuestra infraestructura tecnológica con resultados increíbles. Totalmente recomendados.",
      calificacion: 5,
      fecha: "15 de mayo, 2025"
    },
    {
      id: 2,
      nombre: "Carlos Martínez",
      empresa: "InnovaSoft",
      cargo: "Director de Tecnología",
      foto: "https://ui-avatars.com/api/?name=Carlos+Martinez&background=0a3d6b&color=fff&size=100&font-size=0.5",
      reseña: "El equipo de desarrollo es excepcional. Entregaron nuestro proyecto antes de lo esperado y con una calidad superior.",
      calificacion: 5,
      fecha: "3 de abril, 2025"
    },
    {
      id: 3,
      nombre: "Ana García",
      empresa: "Digital World",
      cargo: "Gerente de Operaciones",
      foto: "https://ui-avatars.com/api/?name=Ana+Garcia&background=0a3d6b&color=fff&size=100&font-size=0.5",
      reseña: "Profesionales comprometidos con la excelencia. La automatización que implementaron en nuestra empresa ha aumentado nuestra productividad un 40%.",
      calificacion: 5,
      fecha: "20 de marzo, 2025"
    },
    {
      id: 4,
      nombre: "Pedro Sánchez",
      empresa: "Global Connect",
      cargo: "Fundador",
      foto: "https://ui-avatars.com/api/?name=Pedro+Sanchez&background=0a3d6b&color=fff&size=100&font-size=0.5",
      reseña: "Increíble atención al cliente y soporte post-venta. Siempre disponibles para resolver cualquier duda. Un socio estratégico para nuestro negocio.",
      calificacion: 4,
      fecha: "10 de febrero, 2025"
    },
    {
      id: 5,
      nombre: "Laura Torres",
      empresa: "EcoSolutions",
      cargo: "Directora de Innovación",
      foto: "https://ui-avatars.com/api/?name=Laura+Torres&background=0a3d6b&color=fff&size=100&font-size=0.5",
      reseña: "La consultoría que nos brindaron fue clave para nuestro crecimiento. Ahora somos una empresa mucho más eficiente y competitiva.",
      calificacion: 5,
      fecha: "5 de enero, 2025"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonios.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  const renderEstrellas = (calificacion) => {
    return "⭐".repeat(calificacion) + "☆".repeat(5 - calificacion);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Opiniones reales de empresas que confían en nosotros para impulsar su transformación digital.
          </p>
          <div className="flex justify-center items-center space-x-2">
            <div className="flex text-yellow-400 text-xl">
              <span>★★★★★</span>
            </div>
            <span className="text-gray-600 font-medium">4.8/5</span>
            <span className="text-gray-400">(24 reseñas)</span>
          </div>
        </div>

        {/* Carrusel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonios.map((testimonio) => (
                <div key={testimonio.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Perfil */}
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={testimonio.foto} 
                        alt={testimonio.nombre}
                        className="w-16 h-16 rounded-full object-cover border-4 border-primary"
                      />
                      <div>
                        <h3 className="font-bold text-primary text-lg">{testimonio.nombre}</h3>
                        <p className="text-gray-600">{testimonio.empresa}</p>
                        <p className="text-gray-400 text-sm">{testimonio.cargo}</p>
                      </div>
                    </div>
                    
                    {/* Estrellas */}
                    <div className="text-yellow-400 text-xl mb-3">
                      {renderEstrellas(testimonio.calificacion)}
                    </div>
                    
                    {/* Reseña */}
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      "{testimonio.reseña}"
                    </p>
                    
                    {/* Fecha */}
                    <p className="text-gray-400 text-sm text-right mt-4 pt-2 border-t border-gray-100">
                      {testimonio.fecha}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-110 flex items-center justify-center text-2xl"
            aria-label="Anterior"
          >
            ❮
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-110 flex items-center justify-center text-2xl"
            aria-label="Siguiente"
          >
            ❯
          </button>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonios.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-secondary w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Botón de acción */}
        <div className="text-center mt-12">
          <a 
            href="/contacto" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            ¿Quieres dejar tu reseña?
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimoniosCarrusel;