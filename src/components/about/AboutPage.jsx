import Navbar from "./Navbar";
import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import AboutPhilosophy from "./AboutPhilosophy";
import AboutTeam from "./AboutTeam";
import AboutStats from "./AboutStats";
import AboutCTA from "./AboutCTA";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <AboutTeam />
      <AboutStats />
      <AboutCTA />
    </div>
  );
}
