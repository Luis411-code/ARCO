const TestimoniosDestacados = () => {
  const testimonios = [
    {
      nombre: "María Rodríguez",
      empresa: "Tech Solutions Cuba",
      reseña: "Excelente servicio. Transformaron nuestra infraestructura tecnológica.",
      calificacion: 5
    },
    {
      nombre: "Carlos Martínez", 
      empresa: "InnovaSoft",
      reseña: "El equipo de desarrollo es excepcional. Entregaron el proyecto antes de lo esperado.",
      calificacion: 5
    },
    {
      nombre: "Ana García",
      empresa: "Digital World",
      reseña: "La automatización implementada aumentó nuestra productividad un 40%.",
      calificacion: 5
    }
  ];

  return (
    <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Testimonios de nuestros clientes
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Empresas que ya confían en Soluciones Holguín
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="flex justify-center text-yellow-400 text-xl mb-3">
                {"⭐".repeat(testimonio.calificacion)}
              </div>
              <p className="text-center leading-relaxed mb-4">
                "{testimonio.reseña}"
              </p>
              <div className="text-center">
                <p className="font-semibold">{testimonio.nombre}</p>
                <p className="text-sm text-blue-200">{testimonio.empresa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosDestacados;