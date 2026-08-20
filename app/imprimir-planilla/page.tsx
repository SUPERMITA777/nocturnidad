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
          <span className="text-xs text-slate-400 hidden sm:inline">Formato optimizado A4 vertical</span>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            Imprimir Planilla
          </button>
        </div>
      </div>

      {/* Contenedor A4 */}
      <div className="max-w-[210mm] mx-auto p-4 sm:p-8 bg-white print:p-0 print:max-w-none">
        {/* Encabezado */}
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2">
          <div className="flex-1 pr-4">
            <h1 className="text-base font-extrabold tracking-wide uppercase m-0 leading-tight">
              Iniciativa Ciudadana — Nocturnidad Segura
            </h1>
            <h2 className="text-xs font-bold text-slate-800 m-0 mt-1">
              Honorable Concejo Deliberante de Florencio Varela (Ord. 10.329/23 y 442/77)
            </h2>
            <p className="text-[10px] text-slate-700 m-0 mt-1 leading-snug">
              Los abajo firmantes, vecinos, comerciantes y trabajadores de Florencio Varela, respaldamos el Proyecto de Ordenanza
              para regularizar la nocturnidad, erradicar la clandestinidad, fijar medidas de seguridad y descanso vecinal, y defender el empleo formal local.
            </p>
          </div>
          <div className="text-center w-[90px] flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nocturnidad.vercel.app/"
              alt="QR Proyecto"
              className="w-16 h-16 mx-auto block"
            />
            <span className="text-[8px] font-bold block mt-1 text-slate-900 leading-tight">
              Escaneá para leer el proyecto
            </span>
          </div>
        </div>

        {/* Tabla de 15 filas */}
        <table className="w-full border-collapse mt-2 border border-slate-700">
          <thead>
            <tr className="bg-slate-100 border border-slate-700">
              <th className="border border-slate-700 p-1 text-[10px] font-bold text-center w-[4%]">Nº</th>
              <th className="border border-slate-700 p-1 text-[10px] font-bold text-left w-[26%]">Apellido y Nombre</th>
              <th className="border border-slate-700 p-1 text-[10px] font-bold text-center w-[14%]">D.N.I.</th>
              <th className="border border-slate-700 p-1 text-[10px] font-bold text-left w-[20%]">Barrio / Localidad (Varela)</th>
              <th className="border border-slate-700 p-1 text-[10px] font-bold text-left w-[18%]">Teléfono o Email</th>
              <th className="border border-slate-700 p-1 text-[10px] font-bold text-center w-[18%]">Firma</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, index) => (
              <tr key={index} className="h-9 border border-slate-700">
                <td className="border border-slate-700 text-center text-[10px] font-bold text-slate-600">
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

        {/* Pie de página */}
        <div className="mt-3 text-[9px] text-slate-600 flex justify-between border-t border-slate-400 pt-1.5">
          <span>Planilla de adhesión vecinal — Presentación legislativa HCD Florencio Varela</span>
          <span>Folio N.º: _______ / Hoja N.º: _______</span>
        </div>
      </div>
    </div>
  );
}
