import { getSignatureCount } from "@/lib/actions";
import { getProyectoLey } from "@/lib/proyecto-actions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectViewer from "@/components/ProjectViewer";
import PetitionForm from "@/components/PetitionForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Renderizado dinámico para reflejar siempre el conteo de firmas en tiempo real
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [count, proyecto] = await Promise.all([
    getSignatureCount(),
    getProyectoLey(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero initialCount={count} metaFirmas={proyecto.metaFirmas || 5000} />
      <ProjectViewer proyecto={proyecto} />
      <PetitionForm />
      <FAQ />
      <Footer />
    </main>
  );
}
