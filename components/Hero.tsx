"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, FileText, PenLine, Users, FileCheck } from "lucide-react";

interface HeroProps {
  initialCount: number;
  metaFirmas?: number;
}

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || target === 0) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("es-AR")}
    </span>
  );
}

export default function Hero({ initialCount, metaFirmas = 5000 }: HeroProps) {
  const [currentCount, setCurrentCount] = useState(initialCount);

  useEffect(() => {
    setCurrentCount(initialCount);
    // Refresco en vivo del conteo
    fetch("/api/signature-count")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setCurrentCount(data.count);
        }
      })
      .catch(() => {});
  }, [initialCount]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const progressPercent = Math.min((currentCount / (metaFirmas || 5000)) * 100, 100);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Fondo con gradiente y malla */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(37,99,235,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(249,115,22,0.15) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge institucional */}
        <div className="inline-flex items-center gap-2 bg-primary-950/60 border border-primary-800/50 text-primary-300 text-xs font-medium px-4 py-2 rounded-full mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          Iniciativa Popular de Participación Ciudadana — HCD Florencio Varela
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up animate-delay-100">
          <span className="text-white">Por una</span>{" "}
          <span className="text-gradient">Nocturnidad Segura,</span>
          <br />
          <span className="text-white">Regulada y con</span>{" "}
          <span className="text-accent-400">Trabajo Local</span>
          <br />
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            en Florencio Varela
          </span>
        </h1>

        {/* Bajada explicativa */}
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-6 animate-fade-in-up animate-delay-200">
          Iniciativa ciudadana para reformar las{" "}
          <strong className="text-white font-semibold">Ordenanzas N.º 10.329/23 y N.º 442/77</strong>.
          Proponemos terminar con la clandestinidad, cuidar a los jóvenes, garantizar el descanso vecinal
          y defender el empleo formal de gastronómicos, técnicos y artistas.
        </p>

        {/* Badges Normativos Visibles */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 animate-fade-in-up animate-delay-200">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-950/80 border border-primary-700/60 rounded-lg text-primary-300 text-xs font-semibold shadow-sm">
            <FileCheck className="w-3.5 h-3.5" />
            Reforma Ord. 10.329/23
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/80 border border-amber-700/60 rounded-lg text-amber-300 text-xs font-semibold shadow-sm">
            <FileCheck className="w-3.5 h-3.5" />
            Modificación Código de Faltas 442/77
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-700/60 rounded-lg text-emerald-300 text-xs font-semibold shadow-sm">
            <FileCheck className="w-3.5 h-3.5" />
            Adecuación Ley 14.050
          </span>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up animate-delay-300">
          <button
            onClick={() => scrollTo("formulario")}
            className="btn-primary text-base px-8 py-4 w-full sm:w-auto"
          >
            <PenLine className="w-5 h-5" />
            Sumar mi Firma
          </button>
          <button
            onClick={() => scrollTo("proyecto")}
            className="btn-secondary text-base px-8 py-4 w-full sm:w-auto"
          >
            <FileText className="w-5 h-5" />
            Leer el Proyecto de Ordenanza
          </button>
        </div>

        {/* Contador de Firmas */}
        <div className="card glow-primary max-w-sm mx-auto animate-fade-in-up animate-delay-400">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-900/60 border border-primary-800/50 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-400" />
            </div>
            <span className="text-slate-400 text-sm font-medium">
              Vecinos adheridos
            </span>
          </div>
          <div className="text-5xl font-black text-white text-center mb-1">
            <AnimatedCounter target={currentCount} />
          </div>
          <p className="text-center text-slate-500 text-xs">
            Firmas registradas ante el HCD
          </p>
          <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-center text-slate-300 text-xs font-semibold mt-2.5">
            OBJETIVO: {metaFirmas.toLocaleString("es-AR")} FIRMAS
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}
