import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Phone, CheckCircle, Clock, ShieldCheck, Wrench, 
  Award, MessageCircle, Loader2, MapPin, AlertTriangle, 
  ChevronDown, CreditCard 
} from 'lucide-react';

function App() {
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Lógica de URL dinámica: Usa la variable de Vercel o el localhost para desarrollo
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Se concatena la URL base con el endpoint
    axios.get(`${API_URL}/api/servicios`)
      .then(res => {
        setServicios(res.data);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error("Error conectando al backend", err);
        setError("No pudimos cargar el catálogo de servicios.");
        setIsLoading(false);
      });
  }, [API_URL]);

  const contactarWhatsApp = (servicio = "Consulta General") => {
    const telefono = "5491167095573"; 
    const mensaje = `Hola! Vi la web de AD Destapaciones y necesito presupuesto para: ${servicio}`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const faqs = [
    {
      pregunta: "¿Cobran la visita técnica?",
      respuesta: "No, el presupuesto y la visita técnica son totalmente sin cargo dentro de Capital Federal.",
      icon: <MapPin size={20} className="text-blue-500" />
    },
    {
      pregunta: "¿Los trabajos tienen garantía?",
      respuesta: "Sí, todos nuestros servicios cuentan con una garantía por escrito de 30 días para su total tranquilidad.",
      icon: <ShieldCheck size={20} className="text-green-500" />
    },
    {
      pregunta: "¿Qué medios de pago aceptan?",
      respuesta: "Aceptamos efectivo, transferencias bancarias y Mercado Pago (tarjetas de débito y crédito).",
      icon: <CreditCard size={20} className="text-orange-500" />
    },
    {
      pregunta: "¿Atienden urgencias los domingos?",
      respuesta: "Contamos con un servicio de guardia las 24 horas, los 365 días del año, incluyendo domingos y feriados.",
      icon: <Clock size={20} className="text-red-500" />
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <img src="/images/logo.png" alt="AD Logo" className="h-24 w-auto animate-pulse" />
          <Loader2 className="absolute -bottom-4 -right-4 text-blue-500 animate-spin" size={32} />
        </div>
        <h2 className="text-white text-xl font-black tracking-tighter mb-2 italic text-uppercase">AD DESTAPACIONES</h2>
        <p className="text-slate-400 text-sm animate-bounce">Conectando con el servidor profesional...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-red-100 max-w-md">
          <div className="bg-red-50 text-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 italic uppercase tracking-tighter text-balance">¡Algo salió mal!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            No podemos mostrar el catálogo ahora, pero <strong>nuestro servicio técnico opera normalmente</strong>.
          </p>
          <button 
            onClick={() => contactarWhatsApp("Consulta Urgente (Error de Carga Web)")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-3 active:scale-95 mb-4"
          >
            <MessageCircle size={24} />
            WHATSAPP DIRECTO
          </button>
          <button onClick={() => window.location.reload()} className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      {/* 1. NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm py-3 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="AD Logo" className="h-10 w-auto hover:rotate-3 transition-transform" />
          <div className="hidden sm:block leading-tight">
            <span className="text-xl font-black tracking-tighter block text-slate-800 uppercase italic">AD</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-600">Destapaciones</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => contactarWhatsApp()}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95 animate-pulse"
          >
            <Clock size={16} /> URGENCIAS 24HS
          </button>
        </div>
      </nav>

      {/* 2. HERO */}
      <header className="relative bg-slate-900 py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10">
          <span className="inline-block bg-blue-600/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full mb-4 border border-blue-500/30 uppercase">Atención en Capital Federal</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase italic text-balance">
            No deje que una obstrucción <br/><span className="text-blue-500">detenga su día.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Equipos de última generación y personal altamente capacitado para resolver cualquier problema de drenaje en minutos.
          </p>
        </div>
      </header>

      {/* 3. CONFIANZA */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Wrench size={24}/></div>
            <div><h4 className="font-bold uppercase tracking-tight">Tecnología</h4><p className="text-xs text-slate-500">Máquinas rotativas y cámaras HD.</p></div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl">
            <div className="bg-green-100 p-3 rounded-xl text-green-600"><ShieldCheck size={24}/></div>
            <div><h4 className="font-bold uppercase tracking-tight">Garantía</h4><p className="text-xs text-slate-500">Trabajos asegurados por 30 días.</p></div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Award size={24}/></div>
            <div><h4 className="font-bold uppercase tracking-tight">Experiencia</h4><p className="text-xs text-slate-500">+15 años en el rubro.</p></div>
          </div>
        </div>
      </section>

      {/* 4. SERVICIOS */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-10">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicios.map((s) => (
            <div key={s.id} className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img src={`/images/${s.imagen}`} alt={s.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <span className="text-white text-xs font-bold flex items-center gap-2 uppercase tracking-widest"><CheckCircle size={14} className="text-green-400" /> Disponible</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold text-slate-800 mb-3 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{s.nombre}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{s.descripcion}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Presupuesto</span>
                    <span className="text-3xl font-black text-blue-600 tracking-tighter">{formatearPrecio(s.precio)}</span>
                  </div>
                  <button onClick={() => contactarWhatsApp(s.nombre)} className="bg-slate-900 hover:bg-green-500 text-white p-4 rounded-2xl transition-all shadow-xl active:scale-90"><MessageCircle size={24}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 5. PREGUNTAS FRECUENTES */}
      <section className="bg-white py-20 px-6 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-500 font-medium italic">Todo lo que necesita saber antes de contratarnos.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shadow-sm">{faq.icon}</div>
                    <span className="font-extrabold text-slate-800 uppercase tracking-tight text-sm md:text-base">{faq.pregunta}</span>
                  </div>
                  <ChevronDown className={`text-slate-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium pl-14">
                    {faq.respuesta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COBERTURA */}
      <section className="bg-slate-900 py-20 px-6 relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 z-10">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full mb-6 border border-blue-500/30 font-bold text-xs uppercase tracking-widest"><MapPin size={18}/> Cobertura Exclusiva</div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-6 uppercase italic text-balance">Atención en toda <span className="text-blue-500 underline decoration-blue-500/30">CABA</span></h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {["Palermo", "Belgrano", "Caballito", "Recoleta", "Villa Urquiza", "Flores", "Villa Devoto", "Almagro"].map(b => (
                <div key={b} className="flex items-center gap-2 text-slate-300 font-bold text-xs bg-white/5 p-3 rounded-xl border border-white/5 uppercase tracking-tight"><CheckCircle size={14} className="text-blue-500"/> {b}</div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-white/5 shadow-2xl">
            <iframe title="Mapa CABA" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44367080603!2d-58.531525141380064!3d-34.61566245383634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e8!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* 7. BOTÓN FLOTANTE */}
      <button onClick={() => contactarWhatsApp()} className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-5 rounded-full shadow-2xl shadow-green-400/40 hover:bg-green-600 hover:scale-110 transition-all active:scale-95 group">
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase italic pointer-events-none">¿En qué podemos ayudarte?</span>
      </button>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-white py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <img src="/images/logo.png" alt="AD Logo" className="h-14 mx-auto md:mx-0 grayscale brightness-200 opacity-60" />
            <p className="text-xl font-black tracking-tighter uppercase italic">AD DESTAPACIONES</p>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">© 2026 Todos los derechos reservados. <br/> Especialistas en CABA.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">Encuéntranos en</p>
            <div className="flex gap-6 text-slate-400">
              <span className="hover:text-white cursor-pointer transition-all text-xs font-bold tracking-widest uppercase hover:scale-110">Instagram</span>
              <span className="hover:text-white cursor-pointer transition-all text-xs font-bold tracking-widest uppercase hover:scale-110">Facebook</span>
            </div>
            <p className="text-slate-600 text-[10px] mt-2 italic">Ciudad Autónoma de Buenos Aires, Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;