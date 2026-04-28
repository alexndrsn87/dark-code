import { CodeConstellationHero } from "@/components/hero/CodeConstellationHero";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { Cta } from "@/components/sections/Cta";
import { FounderNote } from "@/components/sections/FounderNote";
import { Manifesto } from "@/components/sections/Manifesto";
import { Process } from "@/components/sections/Process";

export default function Home() {
  return (
    <>
      <CodeConstellationHero />
      <Manifesto />
      <CapabilitiesGrid />
      <Process />
      <FounderNote />
      <Cta />
    </>
  );
}
