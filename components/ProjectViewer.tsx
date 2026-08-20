"use client";

import { useState } from "react";
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Download,
  BookOpen,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Printer,
  FileCheck,
  FolderOpen,
} from "lucide-react";
import type { ProyectoLey } from "@/lib/proyecto-schema";

type TabKey = "visto" | "considerando" | "articulado" | "imprimible";

const sections: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "visto", label: "VISTO", icon: <BookOpen className="w-4 h-4" /> },
  {
    key: "considerando",
    label: "CONSIDERANDO",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    key: "articulado",
    label: "ARTICULADO",
    icon: <Scale className="w-4 h-4" />,
  },
  {
    key: "imprimible",
    label: "IMPRIMIBLE",
    icon: <Printer className="w-4 h-4" />,
  },
];

export default function ProjectViewer({ proyecto }: { proyecto: ProyectoLey }) {
  const [activeTab, setActiveTab] = useState<TabKey>("visto");
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="proyecto" className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-950/60 border border-primary-800/50 text-primary-300 text-xs font-medium px-4 py-2 rounded-full mb-4">
            <FileText className="w-3.5 h-3.5" />
            Proyecto de Ordenanza Unificado
          </div>
          <h2 className="section-title text-xl sm:text-2xl md:text-3xl leading-tight max-w-3xl mx-auto">
            {proyecto.titulo}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto text-sm sm:text-base mt-3">
            Reforma integral del marco regulatorio nocturno ante el Honorable Concejo Deliberante de Florencio Varela.
          </p>

          {/* Normas Modificadas Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {proyecto.normasModificadas?.map((norma, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300 text-xs font-medium"
              >
                <FileCheck className="w-3 h-3 text-primary-400" />
                {norma}
              </span>
            ))}
          </div>
        </div>

        {/* Visor */}
        <div className="card glow-primary">
          {/* Tab Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl">
              {sections.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveTab(s.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === s.key
                      ? "bg-primary-700 text-white shadow"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Content */}
          {expanded && (
            <div className="animate-fade-in-up">
              {/* VISTO */}
              {activeTab === "visto" && (
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">El Honorable Concejo Deliberante</strong>{" "}
                    del Partido de Florencio Varela, en uso de sus legítimas atribuciones constitucionales y legales:
                  </p>
                  <div className="p-5 bg-slate-800/50 rounded-xl border-l-4 border-primary-600 text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {proyecto.visto}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wider">
                      Marco Normativo Intervenido:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {proyecto.normasModificadas?.map((norma, i) => (
                        <li key={i} className="flex items-center gap-2 p-2 bg-slate-900/60 rounded-lg border border-slate-800/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                          <span>{norma}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* CONSIDERANDO */}
              {activeTab === "considerando" && (
                <div className="space-y-3">
                  {proyecto.considerandos?.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-4 bg-slate-800/50 rounded-xl border-l-4 border-amber-500/80 text-sm leading-relaxed"
                    >
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ARTICULADO */}
              {activeTab === "articulado" && (
                <div className="space-y-6">
                  {proyecto.capitulos?.map((capitulo, capIdx) => (
                    <div key={capIdx} className="space-y-3">
                      {/* Título de Capítulo */}
                      <div className="flex items-center gap-2 pt-2 border-b border-slate-800 pb-2">
                        <FolderOpen className="w-4 h-4 text-primary-400" />
                        <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                          {capitulo.numero}:
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {capitulo.titulo}
                        </h4>
                      </div>

                      {/* Artículos del Capítulo */}
                      <div className="space-y-3 pl-2 sm:pl-4">
                        {capitulo.articulos?.map((art) => (
                          <div key={art.numero} className="card bg-slate-900/70 border border-slate-800/80 p-4">
                            <div className="flex items-start gap-3">
                              <span className="px-2.5 py-1 bg-primary-950 border border-primary-800/60 rounded-md text-primary-300 text-xs font-mono font-bold flex-shrink-0">
                                Art. {art.numero}°
                              </span>
                              <div>
                                <h5 className="font-semibold text-white text-xs sm:text-sm mb-1.5">
                                  {art.titulo}
                                </h5>
                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                                  {art.contenido}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* IMPRIMIBLE */}
              {activeTab === "imprimible" && (
                <div className="space-y-5">
                  <div className="flex items-start gap-3 p-4 bg-slate-800/60 rounded-xl border-l-4 border-primary-600">
                    <Printer className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-sm">Planilla Oficial de Firmas — Formato HCD</p>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        Planilla A4 lista para imprimir con 15 filas por hoja. Incluye encabezado con referencia a las Ordenanzas 10.329/23 y 442/77,
                        código QR al proyecto online, y espacio foliado para presentación legislativa.
                      </p>
                    </div>
                  </div>

                  {/* Preview iframe */}
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-white shadow-lg">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                      </div>
                      <span className="text-slate-400 text-xs ml-2">Vista previa — planilla.html</span>
                    </div>
                    <iframe
                      src="/planilla.html"
                      className="w-full"
                      style={{ height: "420px", border: "none" }}
                      title="Vista previa planilla de firmas"
                    />
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/planilla.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary justify-center text-sm py-3"
                    >
                      <Printer className="w-4 h-4" />
                      Abrir e Imprimir Planilla
                    </a>
                    <a
                      href="/planilla.html"
                      download="planilla-firmas-nocturnidad-fv.html"
                      className="btn-secondary justify-center text-sm py-3"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Planilla
                    </a>
                  </div>

                  {/* Instrucciones */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { n: "1", text: "Imprimí en hoja A4, preferentemente en blanco y negro." },
                      { n: "2", text: "Completá los datos a mano con bolígrafo azul o negro." },
                      { n: "3", text: "Numerá el folio y presentá en Mesa de Entradas del HCD." },
                    ].map((step) => (
                      <div key={step.n} className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/40">
                        <span className="w-7 h-7 rounded-full bg-primary-900/60 border border-primary-700/50 text-primary-300 text-sm font-bold flex items-center justify-center flex-shrink-0">
                          {step.n}
                        </span>
                        <p className="text-slate-400 text-xs leading-relaxed">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Download Button */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              Documento oficial para presentación ante Mesa de Entradas del HCD
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/proyecto-ordenanza.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Descargar / Imprimir Texto Completo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
