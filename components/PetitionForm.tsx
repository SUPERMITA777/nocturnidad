"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  PenLine,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import {
  firmaSchema,
  type FirmaInput,
  BARRIOS_FLORENCIO_VARELA,
  ROLES,
  PROBLEMAS_IDENTIFICADOS,
} from "@/lib/schemas";
import { submitSignature } from "@/lib/actions";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function PetitionForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FirmaInput>({
    resolver: zodResolver(firmaSchema),
    defaultValues: {
      deseaNovedades: false,
      problemasIdentificados: [],
    },
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const onSubmit = async (data: FirmaInput) => {
    if (!turnstileToken) {
      setStatus("error");
      setServerMessage("Por favor, completá la verificación de seguridad.");
      return;
    }

    setStatus("loading");
    try {
      const result = await submitSignature(data, turnstileToken);
      if (result.success) {
        setStatus("success");
        setServerMessage(result.message);
        reset();
      } else {
        setStatus("error");
        setServerMessage(result.error);
        turnstileRef.current?.reset();
        setTurnstileToken("");
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "Error de conexión. Por favor, verificá tu conexión a internet e intentá nuevamente."
      );
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  if (status === "success") {
    return (
      <section id="formulario" className="py-20 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-full bg-green-900/40 border-2 border-green-700/50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              ¡Adhesión Registrada!
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-md mx-auto mb-8">
              {serverMessage}
            </p>
            <p className="text-slate-500 text-sm">
              Tu firma fue registrada con éxito ante el registro ciudadano del
              proyecto.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-20 bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent-950/60 border border-accent-800/50 text-accent-300 text-xs font-medium px-4 py-2 rounded-full mb-4">
            <PenLine className="w-3.5 h-3.5" />
            Adhesión Ciudadana
          </div>
          <h2 className="section-title">Sumar mi Firma</h2>
          <p className="section-subtitle">
            Completá el formulario para adherirte al proyecto. Tu firma será
            presentada ante el Concejo Deliberante.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Banner */}
          {status === "error" && (
            <div className="flex items-start gap-3 p-4 bg-red-950/50 border border-red-800/50 rounded-xl text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{serverMessage}</p>
            </div>
          )}

          {/* Datos Personales */}
          <div className="card">
            <div className="flex items-center gap-2 mb-5">
              <User className="w-4 h-4 text-primary-400" />
              <h3 className="font-semibold text-white text-sm">
                Datos Personales
              </h3>
            </div>

            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="label" htmlFor="nombreCompleto">
                  Nombre y Apellido <span className="text-red-400">*</span>
                </label>
                <input
                  id="nombreCompleto"
                  {...register("nombreCompleto")}
                  className={`input-field ${errors.nombreCompleto ? "input-error" : ""}`}
                  placeholder="Ej: María González"
                />
                {errors.nombreCompleto && (
                  <p className="error-msg">{errors.nombreCompleto.message}</p>
                )}
              </div>

              {/* DNI */}
              <div>
                <label className="label" htmlFor="dni">
                  DNI (sin puntos) <span className="text-red-400">*</span>
                </label>
                <input
                  id="dni"
                  {...register("dni")}
                  className={`input-field ${errors.dni ? "input-error" : ""}`}
                  placeholder="Ej: 32456789"
                  maxLength={8}
                  inputMode="numeric"
                />
                {errors.dni && (
                  <p className="error-msg">{errors.dni.message}</p>
                )}
                <p className="text-slate-500 text-xs mt-1">
                  Necesario para validar vecinos reales ante el HCD.
                </p>
              </div>

              {/* Barrio / Localidad */}
              <div>
                <label className="label" htmlFor="barrio">
                  <MapPin className="w-3.5 h-3.5 inline mr-1" />
                  Barrio / Localidad <span className="text-red-400">*</span>
                </label>
                <select
                  id="barrio"
                  {...register("barrio")}
                  className={`input-field ${errors.barrio ? "input-error" : ""}`}
                >
                  <option value="">Seleccioná tu barrio...</option>
                  {BARRIOS_FLORENCIO_VARELA.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                {errors.barrio && (
                  <p className="error-msg">{errors.barrio.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label" htmlFor="email">
                  <Mail className="w-3.5 h-3.5 inline mr-1" />
                  Correo Electrónico <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`input-field ${errors.email ? "input-error" : ""}`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="error-msg">{errors.email.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="label" htmlFor="telefono">
                  <Phone className="w-3.5 h-3.5 inline mr-1" />
                  Teléfono{" "}
                  <span className="text-slate-500 font-normal">(opcional)</span>
                </label>
                <input
                  id="telefono"
                  {...register("telefono")}
                  className={`input-field ${errors.telefono ? "input-error" : ""}`}
                  placeholder="Ej: 1134567890"
                  inputMode="numeric"
                />
                {errors.telefono && (
                  <p className="error-msg">{errors.telefono.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Rol */}
          <div className="card">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase className="w-4 h-4 text-primary-400" />
              <h3 className="font-semibold text-white text-sm">
                Tu Rol en la Nocturnidad
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ROLES.map((rol) => {
                const currentRol = watch("rol");
                return (
                  <label
                    key={rol}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      currentRol === rol
                        ? "bg-primary-900/40 border-primary-700/60 text-white"
                        : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      {...register("rol")}
                      value={rol}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        currentRol === rol
                          ? "border-primary-500 bg-primary-600"
                          : "border-slate-600"
                      }`}
                    >
                      {currentRol === rol && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="text-sm font-medium">{rol}</span>
                  </label>
                );
              })}
            </div>
            {errors.rol && (
              <p className="error-msg mt-2">{errors.rol.message}</p>
            )}
          </div>

          {/* Problemas Identificados */}
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-accent-400" />
              <h3 className="font-semibold text-white text-sm">
                Problemas que identificás <span className="text-red-400">*</span>
              </h3>
            </div>
            <p className="text-slate-500 text-xs mb-5">
              Seleccioná uno o más problemas que observás en la nocturnidad
              actual de Florencio Varela.
            </p>
            <div className="space-y-2">
              {PROBLEMAS_IDENTIFICADOS.map((problema) => {
                const currentProblemas = watch("problemasIdentificados") || [];
                const isChecked = currentProblemas.includes(problema);
                return (
                  <label
                    key={problema}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-accent-900/30 border-accent-800/50 text-white"
                        : "bg-slate-800/30 border-slate-700/40 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      {...register("problemasIdentificados")}
                      value={problema}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                        isChecked
                          ? "border-accent-500 bg-accent-600"
                          : "border-slate-600"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path d="M3.72 9.28l-2-2 .56-.56 1.44 1.44 4.52-4.52.56.56L3.72 9.28z" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm leading-relaxed">{problema}</span>
                  </label>
                );
              })}
            </div>
            {errors.problemasIdentificados && (
              <p className="error-msg mt-2">
                {errors.problemasIdentificados.message}
              </p>
            )}
          </div>

          {/* Propuestas y Sugerencias */}
          <div className="card">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-4 h-4 text-primary-400" />
              <h3 className="font-semibold text-white text-sm">
                Tu Opinión y Propuestas{" "}
                <span className="text-slate-500 font-normal">(opcional)</span>
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="propuestaMejora">
                  Propuesta de mejora
                </label>
                <textarea
                  id="propuestaMejora"
                  {...register("propuestaMejora")}
                  rows={4}
                  className={`input-field resize-none ${
                    errors.propuestaMejora ? "input-error" : ""
                  }`}
                  placeholder="¿Qué cambio concreto proponés para mejorar la nocturnidad en Florencio Varela?"
                />
                {errors.propuestaMejora && (
                  <p className="error-msg">{errors.propuestaMejora.message}</p>
                )}
                <p className="text-slate-500 text-xs mt-1">
                  Máximo 1500 caracteres.{" "}
                  {watch("propuestaMejora")?.length ?? 0}/1500
                </p>
              </div>
              <div>
                <label className="label" htmlFor="sugerenciaArticulado">
                  Sugerencia al articulado del proyecto
                </label>
                <textarea
                  id="sugerenciaArticulado"
                  {...register("sugerenciaArticulado")}
                  rows={4}
                  className={`input-field resize-none ${
                    errors.sugerenciaArticulado ? "input-error" : ""
                  }`}
                  placeholder="¿Querés sugerir alguna modificación o adición al texto del proyecto de ordenanza?"
                />
                {errors.sugerenciaArticulado && (
                  <p className="error-msg">
                    {errors.sugerenciaArticulado.message}
                  </p>
                )}
                <p className="text-slate-500 text-xs mt-1">
                  Máximo 1500 caracteres.{" "}
                  {watch("sugerenciaArticulado")?.length ?? 0}/1500
                </p>
              </div>
            </div>
          </div>

          {/* Consentimientos */}
          <div className="card space-y-4">
            {/* Consentimiento Legal */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  {...register("consentimientoLegal")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    watch("consentimientoLegal")
                      ? "bg-primary-600 border-primary-500"
                      : "border-slate-600 group-hover:border-slate-500"
                  }`}
                >
                  {watch("consentimientoLegal") && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.72 9.28l-2-2 .56-.56 1.44 1.44 4.52-4.52.56.56L3.72 9.28z" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-200 text-sm font-semibold">
                  Declaración Jurada y Adhesión Ciudadana <span className="text-red-400">*</span>
                </p>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                  "Doy mi conformidad para que mis datos integren el petitorio y respaldo ciudadano al Proyecto de Ordenanza Modificatoria de las Ordenanzas N.º 10.329/23 y N.º 442/77 a presentarse ante el Honorable Concejo Deliberante de Florencio Varela."
                </p>
                {errors.consentimientoLegal && (
                  <p className="error-msg mt-1">
                    {errors.consentimientoLegal.message}
                  </p>
                )}
              </div>
            </label>

            {/* Desea Novedades */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  {...register("deseaNovedades")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    watch("deseaNovedades")
                      ? "bg-primary-600 border-primary-500"
                      : "border-slate-600 group-hover:border-slate-500"
                  }`}
                >
                  {watch("deseaNovedades") && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.72 9.28l-2-2 .56-.56 1.44 1.44 4.52-4.52.56.56L3.72 9.28z" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-slate-200 text-sm font-medium">
                  Deseo recibir novedades sobre el avance del proyecto{" "}
                  <span className="text-slate-500 font-normal">(opcional)</span>
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Te notificaremos por email cuando el proyecto tenga avances en
                  el HCD.
                </p>
              </div>
            </label>
          </div>

          {/* Turnstile */}
          <div className="flex flex-col items-center gap-3">
            {siteKey ? (
              <Turnstile
                ref={turnstileRef}
                siteKey={siteKey}
                onSuccess={setTurnstileToken}
                onError={() => {
                  setTurnstileToken("");
                }}
                onExpire={() => {
                  setTurnstileToken("");
                }}
                options={{ theme: "dark" }}
              />
            ) : (
              <div className="text-slate-500 text-xs text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                ⚠️ Configurá{" "}
                <code className="text-accent-400">
                  NEXT_PUBLIC_TURNSTILE_SITE_KEY
                </code>{" "}
                en .env.local para activar la verificación anti-bot.
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-accent w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Registrando tu adhesión...
              </>
            ) : (
              <>
                <PenLine className="w-5 h-5" />
                Confirmar Adhesión
              </>
            )}
          </button>

          <p className="text-center text-slate-600 text-xs">
            Esta plataforma cumple con la Ley 25.326 de Protección de Datos
            Personales. Tu información no será compartida con terceros.
          </p>
        </form>
      </div>
    </section>
  );
}
