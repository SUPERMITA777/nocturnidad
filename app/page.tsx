import { getSignatureCount } from "@/lib/actions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectViewer from "@/components/ProjectViewer";
import PetitionForm from "@/components/PetitionForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Revalidar cada 60 segundos para reflejar nuevas firmas
export const revalidate = 60;

export default async function Home() {
  const count = await getSignatureCount();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero initialCount={count} />
      <ProjectViewer />
      <PetitionForm />
      <FAQ />
      <Footer />
    </main>
  );
}
