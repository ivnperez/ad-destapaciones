import { useEffect, useState } from 'react';
import axios from 'axios';
import { Phone, CheckCircle, Clock, ShieldCheck, Wrench, Award, MessageCircle, Loader2, MapPin } from 'lucide-react';

function App() {
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Llamada al backend para obtener los servicios con los precios reales
    axios.get('http://localhost:5000/api/servicios')
      .then(res => {
        setServicios(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error conectando al backend", err);
        setIsLoading(false);
      });
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <img src="/images/logo.png" alt="AD Logo" className="h-24 w-auto animate-pulse" />
          <Loader2 className="absolute -bottom-4 -right-4 text-blue-500 animate-spin" size={32} />
        </div>
        <h2 className="text-white text-xl font-black tracking-tighter mb-2 italic">AD DESTAPACIONES</h2>
        <p className="text-slate-400 text-sm animate-bounce">Cargando servicios y mapa de cobertura...</p>
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
            <span className="text-xl font-black tracking-tighter block text-slate-800">AD</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-600">Destapaciones</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:5491167095573" className="text-slate-600 font-bold text-sm hidden lg:block hover:text-blue-600 transition-colors">Atención Inmediata</a>
          <button 
            onClick={() => contactarWhatsApp()}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95 animate-pulse"
          >
            <Clock size={16} /> URGENCIAS 24HS
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative bg-slate-900 py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10">
          <span className="inline-block bg-blue-600/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full mb-4 border border-blue-500/30">SERVICIO TÉCNICO MATRICULADO</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            No deje que una obstrucción <br/><span className="text-blue-500">detenga su día.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Equipos de última generación y personal altamente capacitado para resolver cualquier problema de drenaje en minutos.
          </p>
        </div>
      </header>

      {/* 3. SECCIÓN DE CONFIANZA */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Wrench size={24}/></div>
            <div><h4 className="font-bold">Tecnología</h4><p className="text-xs text-slate-500">Máquinas rotativas y cámaras HD.</p></div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="bg-green-100 p-3 rounded-xl text-green-600"><ShieldCheck size={24}/></div>
            <div><h4 className="font-bold">Garantía</h4><p className="text-xs text-slate-500">Trabajos asegurados por 30 días.</p></div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Award size={24}/></div>
            <div><h4 className="font-bold">Experiencia</h4><p className="text-xs text-slate-500">+15 años en el rubro.</p></div>
          </div>
        </div>
      </section>

      {/* 4. SERVICIOS (GRID) */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Nuestros Servicios</h2>
            <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicios.map((s) => (
            <div key={s.id} className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={`/images/${s.imagen}`} 
                  alt={s.nombre} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <span className="text-white text-xs font-bold flex items-center gap-2 tracking-widest uppercase">
                    <CheckCircle size={14} className="text-green-400" /> Servicio Garantizado
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                  {s.nombre}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {s.descripcion}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Presupuesto desde</span>
                    <span className="text-3xl font-black text-blue-600 tracking-tighter">
                      {formatearPrecio(s.precio)}
                    </span>
                  </div>
                  <button 
                    onClick={() => contactarWhatsApp(s.nombre)}
                    className="bg-slate-900 hover:bg-green-500 text-white p-4 rounded-2xl transition-all shadow-xl active:scale-90 group/btn"
                    title="Pedir presupuesto"
                  >
                    <MessageCircle size={24} className="group-hover/btn:scale-110 transition-transform"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 5. SECCIÓN DE COBERTURA CON MAPA CORREGIDO (URL UNIVERSAL) */}
      <section className="bg-slate-900 py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full mb-6 border border-blue-500/30">
              <MapPin size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Cobertura Exclusiva</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-6">Operamos en toda <br/><span className="text-blue-500">Capital Federal</span></h2>
            <p className="text-slate-400 mb-8 font-medium leading-relaxed text-lg">
              Brindamos atención inmediata en todos los barrios de CABA. Nuestro equipo se desplaza rápidamente para resolver su urgencia en minutos.
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-left">
              {["Palermo", "Belgrano", "Caballito", "Recoleta", "Villa Urquiza", "Flores", "Villa Devoto", "Almagro"].map((barrio) => (
                <div key={barrio} className="flex items-center gap-2 text-slate-300 font-semibold text-sm bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <CheckCircle size={14} className="text-blue-500" /> {barrio}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/5 relative group">
            {/* Usamos una URL de búsqueda directa que es mucho más estable */}
            <iframe 
              title="Mapa de Cobertura CABA"
              src="https://maps.google.com/maps?q=Ciudad%20Autonoma%20de%20Buenos%20Aires&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 6. BOTÓN FLOTANTE */}
      <button 
        onClick={() => contactarWhatsApp()}
        className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-5 rounded-full shadow-2xl shadow-green-400/40 hover:bg-green-600 hover:scale-110 transition-all active:scale-95 group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¿En qué podemos ayudarte?
        </span>
      </button>

      {/* 7. FOOTER SIMPLIFICADO */}
      <footer className="bg-slate-900 text-white py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
            <img src="/images/logo.png" alt="AD Logo" className="h-14 mx-auto md:mx-0 grayscale brightness-200 opacity-60" />
            <div className="leading-tight">
              <p className="text-xl font-black tracking-tighter uppercase">AD DESTAPACIONES</p>
              <p className="text-slate-500 text-sm font-medium mt-2">
                © 2026 Todos los derechos reservados. <br/> 
                Especialistas en desobstrucciones cloacales y pluviales.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">Encuéntranos en</p>
            <div className="flex gap-6 text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors text-xs font-bold tracking-widest hover:scale-105 uppercase">Instagram</span>
              <span className="hover:text-white cursor-pointer transition-colors text-xs font-bold tracking-widest hover:scale-105 uppercase">Facebook</span>
            </div>
            <p className="text-slate-600 text-[10px] mt-2 italic">Ciudad Autónoma de Buenos Aires, Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;