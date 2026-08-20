"use client";

import { useState, useEffect } from "react";
import {
  loginAdmin,
  isAdminAuthenticated,
} from "@/lib/admin-actions";
import {
  getProyectoLey,
  updateProyectoLey,
} from "@/lib/proyecto-actions";
import type { ProyectoLey, Capitulo, Articulo } from "@/lib/proyecto-schema";
import {
  Shield,
  Lock,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function AdminProyectoEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("emanuel.cotta@gmail.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [proyecto, setProyecto] = useState<ProyectoLey | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const auth = await isAdminAuthenticated();
    setIsAuthenticated(auth);
    if (auth) {
      loadData();
    }
  };

  const loadData = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const data = await getProyectoLey();
      setProyecto(data);
    } catch {
      setMessage({ type: "error", text: "Error al cargar los datos del proyecto." });
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    const res = await loginAdmin(email, password);
    if (res.success) {
      setIsAuthenticated(true);
      setPassword("");
      loadData();
    } else {
      setLoginError(res.error || "Credenciales inválidas.");
    }
    setIsLoggingIn(false);
  };

  const handleSave = async () => {
    if (!proyecto) return;
    setSaving(true);
    setMessage(null);

    const res = await updateProyectoLey(proyecto);
    if (res.success) {
      setMessage({ type: "success", text: "¡Proyecto de Ordenanza actualizado exitosamente en Firestore y en la web!" });
    } else {
      setMessage({ type: "error", text: res.error || "Error al guardar el proyecto." });
    }
    setSaving(false);
  };

  // Mutaciones de Considerandos
  const handleConsiderandoChange = (index: number, val: string) => {
    if (!proyecto) return;
    const updated = [...proyecto.considerandos];
    updated[index] = val;
    setProyecto({ ...proyecto, considerandos: updated });
  };

  const addConsiderando = () => {
    if (!proyecto) return;
    setProyecto({
      ...proyecto,
      considerandos: [...proyecto.considerandos, ""],
    });
  };

  const removeConsiderando = (index: number) => {
    if (!proyecto) return;
    const updated = proyecto.considerandos.filter((_, i) => i !== index);
    setProyecto({ ...proyecto, considerandos: updated });
  };

  // Mutaciones de Artículos
  const handleArticuloChange = (
    capIdx: number,
    artIdx: number,
    field: keyof Articulo,
    val: string | number
  ) => {
    if (!proyecto) return;
    const updatedCapitulos = [...proyecto.capitulos];
    const targetArt = { ...updatedCapitulos[capIdx].articulos[artIdx], [field]: val };
    updatedCapitulos[capIdx].articulos[artIdx] = targetArt;
    setProyecto({ ...proyecto, capitulos: updatedCapitulos });
  };

  const addArticulo = (capIdx: number) => {
    if (!proyecto) return;
    const updatedCapitulos = [...proyecto.capitulos];
    // Calcular siguiente número
    let maxNum = 0;
    proyecto.capitulos.forEach((c) => {
      c.articulos.forEach((a) => {
        if (a.numero > maxNum) maxNum = a.numero;
      });
    });

    updatedCapitulos[capIdx].articulos.push({
      numero: maxNum + 1,
      titulo: "Nuevo Artículo",
      contenido: "",
    });
    setProyecto({ ...proyecto, capitulos: updatedCapitulos });
  };

  const removeArticulo = (capIdx: number, artIdx: number) => {
    if (!proyecto) return;
    const updatedCapitulos = [...proyecto.capitulos];
    updatedCapitulos[capIdx].articulos = updatedCapitulos[capIdx].articulos.filter((_, i) => i !== artIdx);
    setProyecto({ ...proyecto, capitulos: updatedCapitulos });
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  // Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 border border-slate-800 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary-900/50 border border-primary-700/50 flex items-center justify-center text-primary-400 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Editor de Proyecto</h1>
            <p className="text-slate-400 text-xs mt-1">Nocturnidad Segura Florencio Varela</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="label text-xs">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-xs"
                required
              />
            </div>

            <div>
              <label className="label text-xs">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-field text-xs"
                required
              />
            </div>

            <button type="submit" disabled={isLoggingIn} className="btn-primary w-full justify-center">
              {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
              Ingresar al Editor
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-white">Editor del Articulado y Considerandos</h1>
              <p className="text-slate-400 text-xs">Ord. 10.329/23 y Ord. 442/77</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="btn-primary text-xs px-4 py-2 flex items-center gap-2"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Guardar Cambios
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Banner de mensajes */}
        {message && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
              message.type === "success"
                ? "bg-green-950/60 border border-green-800/60 text-green-300"
                : "bg-red-950/60 border border-red-800/60 text-red-300"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {loading || !proyecto ? (
          <div className="card p-12 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-500" />
            Cargando articulado oficial...
          </div>
        ) : (
          <>
            {/* Título Principal y Visto */}
            <div className="card p-6 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-400" />
                Título y Visto
              </h2>

              <div>
                <label className="label text-xs">Título del Proyecto de Ordenanza</label>
                <input
                  type="text"
                  value={proyecto.titulo}
                  onChange={(e) => setProyecto({ ...proyecto, titulo: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label text-xs">Texto del VISTO</label>
                <textarea
                  rows={4}
                  value={proyecto.visto}
                  onChange={(e) => setProyecto({ ...proyecto, visto: e.target.value })}
                  className="input-field text-xs"
                />
              </div>
            </div>

            {/* Considerandos */}
            <div className="card p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  CONSIDERANDO ({proyecto.considerandos.length} párrafos)
                </h2>
                <button
                  onClick={addConsiderando}
                  className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar Considerando
                </button>
              </div>

              <div className="space-y-3">
                {proyecto.considerandos.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">
                      {idx + 1}
                    </span>
                    <textarea
                      rows={3}
                      value={item}
                      onChange={(e) => handleConsiderandoChange(idx, e.target.value)}
                      className="input-field text-xs"
                    />
                    <button
                      onClick={() => removeConsiderando(idx)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition mt-1"
                      title="Eliminar párrafo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Capítulos y 22 Artículos */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  Articulado del Proyecto ({proyecto.capitulos.reduce((acc, c) => acc + c.articulos.length, 0)} Artículos en {proyecto.capitulos.length} Capítulos)
                </h2>
              </div>

              {proyecto.capitulos.map((capitulo, capIdx) => (
                <div key={capIdx} className="card p-6 border border-slate-800 space-y-4">
                  {/* Título de Capítulo */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="px-2.5 py-1 bg-primary-950 border border-primary-800 text-primary-300 text-xs font-bold rounded">
                        {capitulo.numero}
                      </span>
                      <input
                        type="text"
                        value={capitulo.titulo}
                        onChange={(e) => {
                          const updated = [...proyecto.capitulos];
                          updated[capIdx].titulo = e.target.value;
                          setProyecto({ ...proyecto, capitulos: updated });
                        }}
                        className="input-field text-xs font-semibold"
                        placeholder="Título del Capítulo"
                      />
                    </div>
                    <button
                      onClick={() => addArticulo(capIdx)}
                      className="btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Agregar Artículo
                    </button>
                  </div>

                  {/* Lista de Artículos */}
                  <div className="space-y-4 pt-2">
                    {capitulo.articulos.map((art, artIdx) => (
                      <div key={art.numero} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="font-mono text-xs font-bold text-primary-400">
                              Art. {art.numero}°
                            </span>
                            <input
                              type="text"
                              value={art.titulo}
                              onChange={(e) => handleArticuloChange(capIdx, artIdx, "titulo", e.target.value)}
                              className="input-field text-xs font-medium"
                              placeholder="Título del Artículo"
                            />
                          </div>
                          <button
                            onClick={() => removeArticulo(capIdx, artIdx)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                            title="Eliminar artículo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <textarea
                            rows={3}
                            value={art.contenido}
                            onChange={(e) => handleArticuloChange(capIdx, artIdx, "contenido", e.target.value)}
                            className="input-field text-xs"
                            placeholder="Contenido normativo del artículo..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Botón flotante inferior para guardar */}
            <div className="sticky bottom-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary shadow-2xl px-8 py-3.5 flex items-center gap-2 text-sm"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Guardar Todo en Firestore
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
