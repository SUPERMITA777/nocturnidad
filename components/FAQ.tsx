"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "¿Por qué es obligatorio ingresar el DNI?",
    a: "El Honorable Concejo Deliberante requiere que las peticiones ciudadanas sean avaladas por vecinos reales y verificables del partido. El DNI nos permite validar que cada adhesión corresponde a una persona real y evitar duplicados. Tu número de DNI se utiliza únicamente como identificador único y es tratado con la máxima confidencialidad conforme a la Ley 25.326 de Protección de Datos Personales.",
  },
  {
    q: "¿Qué busca resolver este proyecto de modificación de la Ordenanza N.º 10.339/23?",
    a: "Actualmente la Ordenanza N.º 10.339/23 regula de manera específica las actividades bailables. Sin embargo, numerosos locales gastronómicos y comerciales realizan actividades culturales, talleres, música en vivo, peñas o catas sin ser boliches. Este proyecto crea la categoría de 'Establecimientos de Usos Mixtos y Espacios Culturales/Gastronómicos' para darles un marco normativo claro, sin exigirles una nueva habilitación autónoma ni aplicarles tasas desmedidas que pongan en riesgo su subsistencia.",
  },
  {
    q: "¿Cómo beneficia a los comercios, artistas y trabajadores locales?",
    a: "Permite a los locales gastronómicos habilitados organizar espectáculos en vivo, stand up, peñas, milongas, catas y talleres formativos de manera complementaria a su actividad principal. Esto fomenta el empleo local para músicos, técnicos, mozos y docentes artísticos, dinamiza la economía comunitaria y garantiza el respeto por los aforos, normas de seguridad y convivencia acústica.",
  },
  {
    q: "¿Mis datos personales son seguros?",
    a: "Sí. Toda la información que ingresás es procesada exclusivamente en nuestros servidores seguros y almacenada en una base de datos con acceso restringido. Los datos no serán vendidos ni compartidos con terceros. Únicamente serán utilizados para la presentación del petitorio ante el HCD y, si así lo autorizás, para informarte sobre el avance del proyecto.",
  },
  {
    q: "¿Cuándo se presenta el petitorio al Concejo Deliberante?",
    a: "El petitorio se presentará formalmente ante la Mesa de Entradas del HCD una vez alcanzada la meta de firmas o en la próxima sesión ordinaria disponible. Las firmas recolectadas se imprimen en planillas foliadas conforme al procedimiento formal del Concejo.",
  },
  {
    q: "¿Puedo adherirme si no vivo en Florencio Varela?",
    a: "Este petitorio está dirigido específicamente a vecinos del Partido de Florencio Varela, ya que su validez ante el HCD depende de la condición de habitante del partido. Si vivís fuera pero trabajás o desarrollás actividades en el partido, podés indicarlo en el campo de 'Propuesta de mejora' y seleccionar el rol que mejor te representa.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 text-slate-400 text-xs font-medium px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Preguntas Frecuentes
          </div>
          <h2 className="section-title">¿Tenés dudas?</h2>
          <p className="section-subtitle">
            Respondemos las preguntas más comunes sobre el proyecto y el proceso
            de adhesión.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card transition-all duration-200 ${
                openIndex === index
                  ? "border-primary-800/50 glow-primary"
                  : "hover:border-slate-700"
              }`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-start justify-between gap-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span
                  className={`font-semibold text-sm leading-relaxed ${
                    openIndex === index ? "text-white" : "text-slate-200"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 transition-colors ${
                    openIndex === index ? "text-primary-400" : "text-slate-500"
                  }`}
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-slate-800 animate-fade-in-up">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
