"use client";

import { useState } from "react";
import { Menu, X, Moon, Shield } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">
                Nocturnidad Segura
              </p>
              <p className="text-slate-400 text-xs">Florencio Varela</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollTo("proyecto")}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              El Proyecto
            </button>
            <button
              onClick={() => scrollTo("formulario")}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              Sumar Firma
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              Preguntas
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("formulario")}
              className="btn-primary text-sm px-5 py-2"
            >
              <Shield className="w-4 h-4" />
              Sumar mi Firma
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            aria-label="Toggle menú"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-slate-800 space-y-1">
            {[
              { id: "proyecto", label: "El Proyecto" },
              { id: "formulario", label: "Sumar mi Firma" },
              { id: "faq", label: "Preguntas Frecuentes" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-sm"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => scrollTo("formulario")}
                className="btn-primary w-full justify-center text-sm"
              >
                <Shield className="w-4 h-4" />
                Sumar mi Firma
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
