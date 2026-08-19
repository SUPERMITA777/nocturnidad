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
} from "lucide-react";

type TabKey = "visto" | "considerando" | "articulado";

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
];

const content: Record<TabKey, React.ReactNode> = {
  visto: (
    <div className="space-y-4 text-slate-300 leading-relaxed">
      <p>
        <strong className="text-white">El Honorable Concejo Deliberante</strong>{" "}
        del Partido de Florencio Varela, en uso de sus atribuciones
        constitucionales y legales;
      </p>
      <div className="space-y-3">
        <div className="flex gap-3 p-4 bg-slate-800/60 rounded-xl border-l-4 border-primary-600">
          <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white text-sm">Ordenanza 442/77</p>
            <p className="text-slate-400 text-sm mt-1">
              El Código de Faltas Municipal vigente, sancionado en 1977, que
              regula los horarios de funcionamiento de establecimientos
              nocturnos y cuya rigidez ha quedado desfasada respecto de la
              realidad social, cultural y económica actual del Partido.
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-4 bg-slate-800/60 rounded-xl border-l-4 border-accent-600">
          <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white text-sm">
              Ley Provincial 14.050 (Buenos Aires)
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Marco provincial que habilita a los municipios a dictar normas
              específicas de habilitación y control de actividades nocturnas,
              culturales y gastronómicas en el ámbito de su competencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  considerando: (
    <div className="space-y-4">
      {[
        {
          title: "Migración a la clandestinidad",
          body: "La rigidez normativa de la Ord. 442/77 ha provocado el cierre masivo de locales habilitados y la proliferación de eventos en quintas, galpones y predios privados sin ningún tipo de habilitación, inspección ni control municipal, fuera del alcance de la política pública.",
          color: "red",
        },
        {
          title: "Riesgos de seguridad y salud",
          body: "Los espacios clandestinos carecen de salidas de emergencia adecuadas, sistemas contra incendios, servicios sanitarios en condiciones, personal de seguridad habilitado y protocolos de actuación ante accidentes o situaciones críticas, poniendo en riesgo la vida de cientos de jóvenes.",
          color: "orange",
        },
        {
          title: "Falta de control de acceso a menores",
          body: "Sin un marco regulatorio aplicado en espacios verificados, el control de ingreso de personas menores de edad resulta inexistente, exponiéndolas a situaciones de riesgo vinculadas al consumo de alcohol y sustancias psicoactivas.",
          color: "yellow",
        },
        {
          title: "Pérdida de empleo local",
          body: "El desplazamiento de la actividad nocturna hacia la informalidad ha generado la pérdida de cientos de puestos de trabajo registrados en el Partido: mozos, barmans, técnicos de sonido y luz, productores, artistas locales y personal de seguridad habilitado.",
          color: "blue",
        },
      ].map((item) => (
        <div
          key={item.title}
          className={`flex gap-3 p-4 bg-slate-800/60 rounded-xl border-l-4 ${
            item.color === "red"
              ? "border-red-600"
              : item.color === "orange"
              ? "border-orange-500"
              : item.color === "yellow"
              ? "border-yellow-500"
              : "border-blue-500"
          }`}
        >
          <AlertTriangle
            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              item.color === "red"
                ? "text-red-400"
                : item.color === "orange"
                ? "text-orange-400"
                : item.color === "yellow"
                ? "text-yellow-400"
                : "text-blue-400"
            }`}
          />
          <div>
            <p className="font-semibold text-white text-sm">{item.title}</p>
            <p className="text-slate-400 text-sm mt-1">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  ),

  articulado: (
    <div className="space-y-5">
      <p className="text-slate-400 text-sm">
        El siguiente articulado modifica el{" "}
        <strong className="text-white">Artículo 37° de la Ordenanza 442/77</strong>{" "}
        e incorpora el Régimen de Espacios Seguros.
      </p>
      {[
        {
          art: "Art. 1°",
          title: "Modificación del Art. 37° — Régimen de Espacios Seguros",
          body: 'Incorpórase al Artículo 37° de la Ordenanza 442/77 el "Régimen de Espacios Seguros para Actividades Nocturnas" (RESAN), que habilita el funcionamiento de establecimientos gastronómicos, culturales y de entretenimiento nocturno bajo condiciones verificadas de seguridad, habilitación y responsabilidad municipal.',
        },
        {
          art: "Art. 2°",
          title: "Permisos Precarios para Gastronomía con Música",
          body: "Créase el Permiso Precario de Funcionamiento Nocturno (PPFN) para locales gastronómicos con música controlada, que podrán operar con extensión horaria previa acreditación de condiciones edilicias mínimas, habilitación vigente, contratación de personal de seguridad registrado y adhesión al protocolo municipal de prevención de consumo problemático.",
        },
        {
          art: "Art. 3°",
          title: "Requisitos del RESAN",
          body: "Los establecimientos adheridos al RESAN deberán cumplir: (a) habilitación municipal vigente; (b) plan de evacuación aprobado; (c) sistema contra incendios certificado; (d) control de acceso con verificación de DNI para menores; (e) personal de seguridad registrado en el Registro Municipal; (f) póliza de seguro de responsabilidad civil.",
        },
        {
          art: "Art. 4°",
          title: "Autoridad de Aplicación",
          body: "Desígnase al Departamento Ejecutivo Municipal, a través de la Dirección de Habilitaciones y en coordinación con la Secretaría de Seguridad, como autoridad de aplicación del presente régimen, con facultades de fiscalización, sanción y revocación de permisos.",
        },
        {
          art: "Art. 5°",
          title: "Vigencia",
          body: "La presente Ordenanza entrará en vigencia a los noventa (90) días de su promulgación, plazo durante el cual el Departamento Ejecutivo deberá reglamentar el procedimiento de adhesión al RESAN y el PPFN.",
        },
      ].map((item) => (
        <div key={item.art} className="card">
          <div className="flex items-start gap-3">
            <div className="min-w-fit px-3 py-1 bg-primary-900/50 border border-primary-800/50 rounded-lg text-primary-300 text-xs font-bold">
              {item.art}
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-2">
                {item.title}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export default function ProjectViewer() {
  const [activeTab, setActiveTab] = useState<TabKey>("visto");
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="proyecto" className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-950/60 border border-primary-800/50 text-primary-300 text-xs font-medium px-4 py-2 rounded-full mb-4">
            <FileText className="w-3.5 h-3.5" />
            Proyecto de Ordenanza
          </div>
          <h2 className="section-title">El Proyecto de Reforma</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Texto completo del proyecto presentado ante el Honorable Concejo
            Deliberante del Partido de Florencio Varela.
          </p>
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
            <div className="animate-fade-in-up">{content[activeTab]}</div>
          )}

          {/* Download Button */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              Documento oficial para presentación ante Mesa de Entradas del HCD
            </p>
            <a
              href="/api/proyecto-pdf"
              download
              className="btn-secondary text-sm px-5 py-2.5"
            >
              <Download className="w-4 h-4" />
              Descargar PDF Oficial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
