import { Navbar } from "@/components/navigation/Navbar";
import { Berkeley } from "@/components/sections/Berkeley";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Garage } from "@/components/sections/Garage";
import { Hero } from "@/components/sections/Hero";
import { Toolkit } from "@/components/sections/Toolkit";
import { Work } from "@/components/sections/Work";
import { CursorHalo } from "@/components/ui/CursorHalo";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { StatusStrip } from "@/components/ui/StatusStrip";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorHalo />
      <Navbar />
      <main id="main">
        <Hero />
        <Garage />
        <StatusStrip />
        <Berkeley />
        <Experience />
        <Work />
        <Toolkit />
        <Contact />
      </main>
    </>
  );
}
