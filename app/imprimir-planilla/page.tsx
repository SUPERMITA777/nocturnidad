"use client";

import { useEffect } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ImprimirPlanillaPage() {
  useEffect(() => {
    // Auto-disparar diálogo de impresión tras breve renderizado
    const timer = setTimeout(() => {
      window.print();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black print:p-0 print:m-0">
      {/* Barra de control en pantalla (oculta al imprimir) */}
      <div className="print:hidden bg-slate-900 text-white p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          Volver a la Landing
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">Formato optimizado A4 vertical (20 firmas por hoja)</span>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            Imprimir Planilla A4
          </button>
        </div>
      </div>

      {/* Contenedor A4 */}
      <div className="max-w-[210mm] mx-auto p-4 sm:p-6 bg-white print:p-0 print:max-w-none">
        {/* Encabezado Institucional */}
        <div className="flex justify-between items-center border-b-2 border-black pb-1.5 mb-1.5">
          <div className="flex-1 pr-3">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase m-0 leading-tight">
              Iniciativa Ciudadana — Establecimientos de Usos Mixtos y Espacios Culturales / Gastronómicos
            </h1>
            <h2 className="text-[10px] font-bold text-slate-800 m-0 mt-0.5 leading-snug">
              Proyecto de Modificación de la Ordenanza N.º 10.339/23 ante el HCD de Florencio Varela
            </h2>
            <p className="text-[8.5px] text-slate-700 m-0 mt-0.5 leading-tight">
              Los abajo firmantes, vecinos, comerciantes y trabajadores de Florencio Varela, respaldamos el Proyecto de Modificación de la Ordenanza N.º 10.339/23 para el reconocimiento de Establecimientos de Usos Mixtos y Espacios Culturales/Gastronómicos, fomento de actividades culturales y formativas, trabajo local y convivencia urbana.
            </p>
          </div>
          <div className="text-center w-[85px] flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nocturnidad.vercel.app/"
              alt="QR Proyecto"
              className="w-14 h-14 mx-auto block"
            />
            <span className="text-[7px] font-bold block mt-0.5 text-slate-900 leading-tight">
              Escaneá para leer el proyecto
            </span>
          </div>
        </div>

        {/* Tabla de 20 filas optimizada para A4 */}
        <table className="w-full border-collapse mt-1 border border-slate-700">
          <thead>
            <tr className="bg-slate-100 border border-slate-700">
              <th className="border border-slate-700 py-0.5 px-1 text-[9px] font-bold text-center w-[4%]">Nº</th>
              <th className="border border-slate-700 py-0.5 px-1 text-[9px] font-bold text-left w-[26%]">Apellido y Nombre</th>
              <th className="border border-slate-700 py-0.5 px-1 text-[9px] font-bold text-center w-[14%]">D.N.I.</th>
              <th className="border border-slate-700 py-0.5 px-1 text-[9px] font-bold text-left w-[20%]">Barrio / Localidad (Varela)</th>
              <th className="border border-slate-700 py-0.5 px-1 text-[9px] font-bold text-left w-[18%]">Teléfono o Email</th>
              <th className="border border-slate-700 py-0.5 px-1 text-[9px] font-bold text-center w-[18%]">Firma</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }).map((_, index) => (
              <tr key={index} className="h-7 border border-slate-700">
                <td className="border border-slate-700 text-center text-[9px] font-bold text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="border border-slate-700"></td>
                <td className="border border-slate-700"></td>
                <td className="border border-slate-700"></td>
                <td className="border border-slate-700"></td>
                <td className="border border-slate-700"></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pie de página con foliado */}
        <div className="mt-2 text-[8.5px] text-slate-600 flex justify-between border-t border-slate-400 pt-1">
          <span>Planilla Oficial de Adhesión Vecinal — Presentación Legislativa HCD Florencio Varela</span>
          <span>Folio N.º: _______ / Hoja N.º: _______</span>
        </div>
      </div>
    </div>
  );
}
