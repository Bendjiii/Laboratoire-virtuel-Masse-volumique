import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { LiquidControls } from './components/LiquidControls';
import { GraduatedCylinder } from './components/GraduatedCylinder';
import { ElectronicScale } from './components/ElectronicScale';
import { FormulaSection } from './components/FormulaSection';
import { LIQUIDS, LiquidId } from './types/lab';

export default function App() {
  const [selectedLiquid, setSelectedLiquid] = useState<LiquidId>('water');
  const [volume, setVolume] = useState<number>(50);
  const [isTared, setIsTared] = useState<boolean>(false);
  const [measuredMass, setMeasuredMass] = useState<number | null>(null);
  const [isWeighing, setIsWeighing] = useState<boolean>(false);
  const [tareWarning, setTareWarning] = useState<boolean>(false);

  const weighTimerRef = useRef<number | null>(null);

  const clearWeighTimer = () => {
    if (weighTimerRef.current !== null) {
      window.clearTimeout(weighTimerRef.current);
      weighTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearWeighTimer();
  }, []);

  const handleLiquidChange = (newLiquid: LiquidId) => {
    clearWeighTimer();
    setSelectedLiquid(newLiquid);
    setIsTared(false);
    setMeasuredMass(null);
    setIsWeighing(false);
    setTareWarning(false);
  };

  const handleVolumeChange = (newVolume: number) => {
    clearWeighTimer();
    setVolume(newVolume);
    setMeasuredMass(null);
    setIsWeighing(false);
    setTareWarning(false);
  };

  const handleTare = () => {
    clearWeighTimer();
    setIsTared(true);
    setMeasuredMass(null);
    setIsWeighing(false);
    setTareWarning(false);
  };

  const handleWeigh = () => {
    if (!isTared) {
      setTareWarning(true);
      return;
    }

    clearWeighTimer();
    setTareWarning(false);
    setIsWeighing(true);

    const targetMass = volume * LIQUIDS[selectedLiquid].density;
    weighTimerRef.current = window.setTimeout(() => {
      setMeasuredMass(targetMass);
      setIsWeighing(false);
      weighTimerRef.current = null;
    }, 260);
  };

  const handleReset = () => {
    clearWeighTimer();
    setSelectedLiquid('water');
    setVolume(50);
    setIsTared(false);
    setMeasuredMass(null);
    setIsWeighing(false);
    setTareWarning(false);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#0F2942]">
      <Header onReset={handleReset} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* En-tête pédagogique & mission */}
        <section
          id="mission"
          aria-labelledby="mission-heading"
          className="rounded-2xl border border-[#D8E4F0] bg-white p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#47607A]">
            <span>Physique-Chimie</span>
            <span aria-hidden="true">·</span>
            <span>Activité expérimentale</span>
          </div>

          <h1
            id="mission-heading"
            className="mt-2 max-w-3xl text-2xl sm:text-3xl font-bold tracking-tight text-[#0F2942] [text-wrap:balance]"
          >
            Laboratoire virtuel – Masse volumique
          </h1>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
            <p className="text-sm sm:text-base leading-relaxed text-[#243B53] md:col-span-7">
              Tu disposes de trois liquides différents : l'eau, l'alcool et le dichlorométhane. Ton objectif est de mesurer leur masse et leur volume afin de déterminer leur masse volumique.
            </p>
            <div className="rounded-xl border border-[#DCE8F5] bg-[#F5F8FC] px-4 py-3.5 text-sm leading-relaxed text-[#243B53] md:col-span-5">
              <strong className="font-semibold text-[#0F2942]">Consigne :</strong>{' '}
              réalise les mesures à l'aide de l'éprouvette graduée et de la balance électronique, puis note tes résultats sur ton cahier.
            </div>
          </div>
        </section>

        {/* Paillasse interactive (3 postes) */}
        <section
          id="paillasse"
          aria-label="Paillasse d'expérimentation"
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch"
        >
          <LiquidControls
            selectedLiquid={selectedLiquid}
            volume={volume}
            onLiquidChange={handleLiquidChange}
            onVolumeChange={handleVolumeChange}
          />

          <GraduatedCylinder
            selectedLiquid={selectedLiquid}
            volume={volume}
          />

          <ElectronicScale
            selectedLiquid={selectedLiquid}
            volume={volume}
            isTared={isTared}
            measuredMass={measuredMass}
            isWeighing={isWeighing}
            tareWarning={tareWarning}
            onTare={handleTare}
            onWeigh={handleWeigh}
          />
        </section>

        {/* Formule uniquement (sans calcul automatique) */}
        <FormulaSection />
      </main>

      <footer className="border-t border-[#D8E4F0] bg-white py-5 text-center text-sm text-[#47607A]">
        Laboratoire virtuel de Physique-Chimie
      </footer>
    </div>
  );
}
