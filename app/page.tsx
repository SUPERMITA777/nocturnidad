import { getSignatureCount } from "@/lib/actions";
import { getProyectoLey } from "@/lib/proyecto-actions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectViewer from "@/components/ProjectViewer";
import PetitionForm from "@/components/PetitionForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Revalidar cada 60 segundos para reflejar nuevas firmas y cambios en el proyecto
export const revalidate = 60;

export default async function Home() {
  const [count, proyecto] = await Promise.all([
    getSignatureCount(),
    getProyectoLey(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero initialCount={count} />
      <ProjectViewer proyecto={proyecto} />
      <PetitionForm />
      <FAQ />
      <Footer />
    </main>
  );
}
