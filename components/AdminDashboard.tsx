"use client";

import { useState, useEffect } from "react";
import {
  loginAdmin,
  logoutAdmin,
  isAdminAuthenticated,
  getAdminFirmas,
  updateAdminFirma,
  deleteAdminFirma,
  type AdminFirma,
} from "@/lib/admin-actions";
import { BARRIOS_FLORENCIO_VARELA, ROLES } from "@/lib/schemas";
import {
  Shield,
  Lock,
  LogOut,
  Search,
  Download,
  Trash2,
  Edit2,
  Save,
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("emanuel.cotta@gmail.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [firmas, setFirmas] = useState<AdminFirma[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedBarrio, setSelectedBarrio] = useState("TODOS");
  const [selectedRol, setSelectedRol] = useState("TODOS");

  // Estado para modal de edición
  const [editingFirma, setEditingFirma] = useState<AdminFirma | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Estado para modal de detalles
  const [viewingFirma, setViewingFirma] = useState<AdminFirma | null>(null);

  // Mensajes de acción
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const auth = await isAdminAuthenticated();
    setIsAuthenticated(auth);
    if (auth) {
      loadFirmas();
    }
  };

  const loadFirmas = async () => {
    setLoading(true);
    setActionMessage(null);
    const res = await getAdminFirmas();
    if (res.success && res.data) {
      setFirmas(res.data);
    } else {
      setActionMessage({ type: "error", text: res.error || "Error al cargar firmas" });
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
      loadFirmas();
    } else {
      setLoginError(res.error || "Credenciales inválidas");
    }
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setFirmas([]);
  };

  const handleDelete = async (firma: AdminFirma) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la firma de ${firma.nombreCompleto} (DNI: ${firma.dni})?`)) {
      return;
    }

    const res = await deleteAdminFirma(firma.id);
    if (res.success) {
      setActionMessage({ type: "success", text: `Firma de ${firma.nombreCompleto} eliminada correctamente.` });
      setFirmas(firmas.filter((f) => f.id !== firma.id));
    } else {
      setActionMessage({ type: "error", text: res.error || "Error al eliminar" });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingFirma) return;
    setSavingEdit(true);
    const res = await updateAdminFirma(editingFirma.id, editingFirma);
    if (res.success) {
      setActionMessage({ type: "success", text: "Firma actualizada correctamente." });
      setFirmas(firmas.map((f) => (f.id === editingFirma.id ? editingFirma : f)));
      setEditingFirma(null);
    } else {
      setActionMessage({ type: "error", text: res.error || "Error al actualizar" });
    }
    setSavingEdit(false);
  };

  // Filtrar firmas
  const filteredFirmas = firmas.filter((f) => {
    const matchesSearch =
      f.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
      f.dni.includes(search) ||
      f.email.toLowerCase().includes(search.toLowerCase());

    const matchesBarrio = selectedBarrio === "TODOS" || f.barrio === selectedBarrio;
    const matchesRol = selectedRol === "TODOS" || f.rol === selectedRol;

    return matchesSearch && matchesBarrio && matchesRol;
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  // Pantalla de Login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 border border-slate-800 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary-900/50 border border-primary-700/50 flex items-center justify-center text-primary-400 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Panel de Administración</h1>
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
              <label className="label text-xs" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input-field text-xs"
                required
              />
            </div>

            <div>
              <label className="label text-xs" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-field text-xs"
                autoFocus
                required
              />
            </div>

            <button type="submit" disabled={isLoggingIn} className="btn-primary w-full justify-center">
              {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Panel Principal
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-white leading-tight">Panel de Control de Firmas</h1>
              <p className="text-slate-400 text-xs hidden sm:block">HCD Florencio Varela</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              target="_blank"
              className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </a>
            <button onClick={handleLogout} className="btn-secondary text-xs px-3 py-2 text-red-400 hover:text-red-300">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Banner de mensajes */}
        {actionMessage && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center justify-between text-sm ${
              actionMessage.type === "success"
                ? "bg-green-950/60 border border-green-800/60 text-green-300"
                : "bg-red-950/60 border border-red-800/60 text-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {actionMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{actionMessage.text}</span>
            </div>
            <button onClick={() => setActionMessage(null)} className="opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-900/40 text-primary-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">Total de Firmas</p>
              <p className="text-2xl font-bold text-white">{firmas.length}</p>
            </div>
          </div>

          <div className="card p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-900/40 text-accent-400 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">Resultados Filtrados</p>
              <p className="text-2xl font-bold text-white">{filteredFirmas.length}</p>
            </div>
          </div>

          <div className="card p-5 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium">Acciones Rápidas</p>
              <p className="text-sm font-semibold text-slate-200 mt-1">Recargar Base</p>
            </div>
            <button
              onClick={loadFirmas}
              disabled={loading}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-primary-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="card p-4 border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por DNI, Nombre o Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
            <select
              value={selectedBarrio}
              onChange={(e) => setSelectedBarrio(e.target.value)}
              className="input-field text-xs py-2 w-full sm:w-auto"
            >
              <option value="TODOS">Todos los Barrios</option>
              {BARRIOS_FLORENCIO_VARELA.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={selectedRol}
              onChange={(e) => setSelectedRol(e.target.value)}
              className="input-field text-xs py-2 w-full sm:w-auto"
            >
              <option value="TODOS">Todos los Roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla de Firmas */}
        <div className="card overflow-hidden border border-slate-800 p-0 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">DNI</th>
                  <th className="p-4">Nombre Completo</th>
                  <th className="p-4">Barrio</th>
                  <th className="p-4">Rol</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary-500" />
                      Cargando firmas registradas...
                    </td>
                  </tr>
                ) : filteredFirmas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No se encontraron firmas que coincidan con los filtros.
                    </td>
                  </tr>
                ) : (
                  filteredFirmas.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 font-mono font-semibold text-white">{f.dni}</td>
                      <td className="p-4 font-medium text-slate-200">{f.nombreCompleto}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-800 rounded-md text-slate-300 border border-slate-700/50">
                          {f.barrio}
                        </span>
                      </td>
                      <td className="p-4">{f.rol}</td>
                      <td className="p-4">
                        <div className="text-slate-300">{f.email}</div>
                        {f.telefono && <div className="text-slate-500 text-[10px] mt-0.5">{f.telefono}</div>}
                      </td>
                      <td className="p-4 text-slate-400">
                        {f.createdAt ? new Date(f.createdAt).toLocaleDateString("es-AR") : "-"}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setViewingFirma(f)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                          title="Ver detalle completo"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingFirma({ ...f })}
                          className="p-1.5 bg-primary-950/60 border border-primary-800/60 hover:bg-primary-900 text-primary-300 rounded-lg transition"
                          title="Editar firma"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(f)}
                          className="p-1.5 bg-red-950/60 border border-red-800/60 hover:bg-red-900 text-red-300 rounded-lg transition"
                          title="Eliminar firma"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal de Detalle */}
      {viewingFirma && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card max-w-lg w-full border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-white text-base">Detalle de Firma</h3>
              <button onClick={() => setViewingFirma(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Nombre Completo:</span>
                <span className="text-slate-200 font-semibold text-sm">{viewingFirma.nombreCompleto}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">DNI:</span>
                  <span className="text-slate-200 font-mono">{viewingFirma.dni}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Barrio:</span>
                  <span className="text-slate-200">{viewingFirma.barrio}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="text-slate-200">{viewingFirma.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Teléfono:</span>
                  <span className="text-slate-200">{viewingFirma.telefono || "No especificado"}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Rol en la Nocturnidad:</span>
                <span className="text-slate-200">{viewingFirma.rol}</span>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Problemas Identificados:</span>
                <div className="flex flex-wrap gap-1">
                  {viewingFirma.problemasIdentificados?.length ? (
                    viewingFirma.problemasIdentificados.map((p, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300 text-[11px]">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">Ninguno seleccionado</span>
                  )}
                </div>
              </div>

              {viewingFirma.propuestaMejora && (
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                  <span className="text-primary-400 font-semibold block mb-1">Propuesta de Mejora:</span>
                  <p className="text-slate-300 leading-relaxed">{viewingFirma.propuestaMejora}</p>
                </div>
              )}

              {viewingFirma.sugerenciaArticulado && (
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                  <span className="text-accent-400 font-semibold block mb-1">Sugerencia al Articulado:</span>
                  <p className="text-slate-300 leading-relaxed">{viewingFirma.sugerenciaArticulado}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 flex justify-end">
              <button onClick={() => setViewingFirma(null)} className="btn-secondary text-xs px-4 py-2">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {editingFirma && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card max-w-lg w-full border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-white text-base">Editar Firma (DNI: {editingFirma.dni})</h3>
              <button onClick={() => setEditingFirma(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="label text-xs">Nombre Completo</label>
                <input
                  type="text"
                  value={editingFirma.nombreCompleto}
                  onChange={(e) => setEditingFirma({ ...editingFirma, nombreCompleto: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label text-xs">Barrio</label>
                  <select
                    value={editingFirma.barrio}
                    onChange={(e) => setEditingFirma({ ...editingFirma, barrio: e.target.value })}
                    className="input-field text-xs"
                  >
                    {BARRIOS_FLORENCIO_VARELA.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label text-xs">Rol</label>
                  <select
                    value={editingFirma.rol}
                    onChange={(e) => setEditingFirma({ ...editingFirma, rol: e.target.value })}
                    className="input-field text-xs"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label text-xs">Email</label>
                  <input
                    type="email"
                    value={editingFirma.email}
                    onChange={(e) => setEditingFirma({ ...editingFirma, email: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="label text-xs">Teléfono</label>
                  <input
                    type="text"
                    value={editingFirma.telefono || ""}
                    onChange={(e) => setEditingFirma({ ...editingFirma, telefono: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="label text-xs">Propuesta de Mejora</label>
                <textarea
                  rows={3}
                  value={editingFirma.propuestaMejora || ""}
                  onChange={(e) => setEditingFirma({ ...editingFirma, propuestaMejora: e.target.value })}
                  className="input-field text-xs resize-none"
                />
              </div>

              <div>
                <label className="label text-xs">Sugerencia al Articulado</label>
                <textarea
                  rows={3}
                  value={editingFirma.sugerenciaArticulado || ""}
                  onChange={(e) => setEditingFirma({ ...editingFirma, sugerenciaArticulado: e.target.value })}
                  className="input-field text-xs resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingFirma(null)}
                disabled={savingEdit}
                className="btn-secondary text-xs px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
              >
                {savingEdit ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
