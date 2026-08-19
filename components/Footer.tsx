import { Moon, Shield, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  Nocturnidad Segura
                </p>
                <p className="text-slate-500 text-xs">Florencio Varela</p>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Iniciativa ciudadana para la reforma del Código de Faltas
              Municipal (Ord. 442/77) orientada a una nocturnidad regulada,
              segura y con trabajo local.
            </p>
          </div>

          {/* Marco Legal */}
          <div>
            <h4 className="text-slate-300 font-semibold text-sm mb-4">
              Marco Legal
            </h4>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li>Ordenanza Municipal 442/77 — Código de Faltas</li>
              <li>Ley Provincial 14.050 (Buenos Aires)</li>
              <li>Ley Nacional 25.326 — Protección de Datos Personales</li>
              <li>Reglamento Interno HCD — Florencio Varela</li>
            </ul>
          </div>

          {/* Transparencia */}
          <div>
            <h4 className="text-slate-300 font-semibold text-sm mb-4">
              Transparencia
            </h4>
            <ul className="space-y-2 text-slate-500 text-xs">
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                Datos procesados en servidor seguro
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                Sin venta ni cesión de datos a terceros
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                Verificación anti-bot Cloudflare Turnstile
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                DNI único — Una firma por persona
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/60 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs text-center sm:text-left">
              © {currentYear} Nocturnidad Segura Florencio Varela. Todos los
              derechos reservados.
            </p>
            <p className="text-slate-600 text-xs flex items-center gap-1.5">
              Hecho con{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500" /> por y para
              los vecinos de Florencio Varela
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
