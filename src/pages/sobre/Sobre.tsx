import React from "react";
import aboutHeroImg from "../../assets/illustrations/about-hero.png";
import { AboutHero } from "../../components/landing/about/hero/AboutHero";
import { HowItHelps } from "../../components/landing/about/help/HowItHelps";
import { ResultsAside } from "../../components/landing/about/results/ResultsAside";
import { ValuesSection } from "../../components/landing/about/values/ValuesSection";
import { TeamSection } from "../../components/landing/about/team/TeamSection";
import { AboutCta } from "../../components/landing/about/cta/AboutCta";



const Sobre: React.FC = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#012340] via-[#025959] to-[#027333] text-white py-16">
            <section className="w-full px-6 lg:px-12">
                <AboutHero heroImg={aboutHeroImg} />

                <section className="mt-12 grid gap-8 lg:grid-cols-3">
                    <HowItHelps />
                    <ResultsAside />
                </section>

                <ValuesSection />

                <TeamSection />

                <AboutCta />
            </section>
        </main>
    );
};

export default Sobre;

