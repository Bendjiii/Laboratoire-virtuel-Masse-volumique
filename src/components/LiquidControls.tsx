import { Minus, Plus, ChevronDown } from 'lucide-react';
import { Tooltip, InfoTooltipButton } from './Tooltip';
import {
  LIQUIDS,
  LiquidId,
  MAX_VOLUME,
  MIN_VOLUME,
  VOLUME_STEP,
} from '../types/lab';

interface LiquidControlsProps {
  selectedLiquid: LiquidId;
  volume: number;
  onLiquidChange: (id: LiquidId) => void;
  onVolumeChange: (volume: number) => void;
}

const VOLUME_TICKS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export function LiquidControls({
  selectedLiquid,
  volume,
  onLiquidChange,
  onVolumeChange,
}: LiquidControlsProps) {
  const liquid = LIQUIDS[selectedLiquid];

  const handleDecrease = () => {
    if (volume > MIN_VOLUME) {
      onVolumeChange(volume - VOLUME_STEP);
    }
  };

  const handleIncrease = () => {
    if (volume < MAX_VOLUME) {
      onVolumeChange(volume + VOLUME_STEP);
    }
  };

  return (
    <section
      aria-labelledby="step-1-heading"
      className="flex flex-col justify-between rounded-2xl border border-[#D8E4F0] bg-white p-5 sm:p-6"
    >
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs font-semibold tracking-wider text-[#146EBE]">
            Étape 1
          </p>
          <span className="font-mono text-xs text-[#627D98]">
            {liquid.formula}
          </span>
        </div>
        <h2
          id="step-1-heading"
          className="mt-1 text-xl font-bold tracking-tight text-[#0F2942]"
        >
          1. Choisir un liquide
        </h2>

        {/* Menu déroulant du liquide */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="liquidSelect"
              className="block text-sm font-semibold text-[#243B53]"
            >
              Liquide à étudier
            </label>
            <InfoTooltipButton
              label="Aide sur le choix du liquide"
              position="top"
              align="left"
              content="Sélectionne le liquide à étudier (eau, alcool ou dichlorométhane). Changer de liquide remet la balance à l'état initial."
            />
          </div>
          <Tooltip
            className="mt-1.5"
            position="top"
            align="center"
            content="Sélectionne le liquide (eau, alcool ou dichlorométhane) dont tu veux déterminer la masse volumique."
          >
            <div className="relative">
              <select
                id="liquidSelect"
                value={selectedLiquid}
                onChange={(e) => onLiquidChange(e.target.value as LiquidId)}
                className="w-full min-h-[48px] appearance-none rounded-xl border border-[#BBD0E6] bg-[#FAFCFF] py-3 pl-4 pr-11 text-base font-semibold text-[#0F2942] transition-colors hover:border-[#146EBE] focus:border-[#146EBE] focus:outline-none focus:ring-2 focus:ring-[#146EBE]/25 cursor-pointer"
              >
                <option value="water">Eau</option>
                <option value="alcohol">Alcool</option>
                <option value="dcm">Dichlorométhane</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#47607A]"
                aria-hidden="true"
              />
            </div>
          </Tooltip>
        </div>

        {/* Flacon de laboratoire + description du liquide */}
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#E2ECF5] bg-[#F5F8FC] p-4">
          <div className="shrink-0" aria-hidden="true">
            <svg
              width="58"
              height="76"
              viewBox="0 0 58 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bouchon bleu labo */}
              <rect
                x="19"
                y="3"
                width="20"
                height="10"
                rx="2.5"
                fill="#146EBE"
              />
              <rect x="21" y="13" width="16" height="4" fill="#0F4E8A" />
              {/* Col du flacon */}
              <path
                d="M22 17H36V24L47 34C48.8 35.6 50 38 50 40.5V67C50 70.3 47.3 73 44 73H14C10.7 73 8 70.3 8 67V40.5C8 38 9.2 35.6 11 34L22 24V17Z"
                fill="#FFFFFF"
                stroke="#8FB0CF"
                strokeWidth="2"
              />
              {/* Liquide à l'intérieur */}
              <path
                d="M10 47H48V67C48 69.2 46.2 71 44 71H14C11.8 71 10 69.2 10 67V47Z"
                fill={liquid.bottleTint}
              />
              <path
                d="M10 47C15 48.8 43 48.8 48 47"
                stroke={liquid.meniscusStroke}
                strokeWidth="1.5"
                strokeOpacity="0.55"
              />
              {/* Étiquette blanche */}
              <rect
                x="13"
                y="41"
                width="32"
                height="18"
                rx="2"
                fill="#FFFFFF"
                stroke="#CBD9E8"
                strokeWidth="1"
              />
              <text
                x="29"
                y="53"
                textAnchor="middle"
                fill="#0F2942"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
              >
                {liquid.formula}
              </text>
              {/* Reflet verre */}
              <path
                d="M14 38V66"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.8"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#0F2942]">{liquid.name}</p>
            <p
              id="liquidDescription"
              className="mt-1 text-sm leading-relaxed text-[#47607A]"
            >
              {liquid.description}
            </p>
          </div>
        </div>
      </div>

      {/* Réglage du volume */}
      <div className="mt-6 border-t border-[#E6EEF7] pt-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="volume"
              className="text-base font-bold text-[#0F2942]"
            >
              Choisir le volume
            </label>
            <InfoTooltipButton
              label="Aide sur le réglage du volume"
              position="top"
              align="left"
              content="Ajuste le volume de liquide versé dans l'éprouvette entre 10 mL et 100 mL à l'aide du curseur ou des boutons."
            />
          </div>
          <span
            id="volumeValue"
            className="font-mono text-xl font-bold tabular-nums text-[#146EBE]"
          >
            {volume} mL
          </span>
        </div>

        <div className="mt-4">
          <Tooltip
            position="top"
            align="center"
            content="Règle le volume V de liquide versé dans l'éprouvette graduée entre 10 mL et 100 mL."
          >
            <input
              type="range"
              id="volume"
              min={MIN_VOLUME}
              max={MAX_VOLUME}
              step={VOLUME_STEP}
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              aria-label="Volume du liquide en millilitres"
              className="lab-slider w-full"
            />
          </Tooltip>
          <div
            className="mt-2 flex justify-between px-1 font-mono text-[11px] font-medium tabular-nums text-[#627D98]"
            aria-hidden="true"
          >
            {VOLUME_TICKS.map((tick) => (
              <span
                key={tick}
                className={
                  tick === volume ? 'font-bold text-[#146EBE]' : undefined
                }
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        {/* Grands boutons tactiles +/- pour tablettes et TNI en classe */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Tooltip
            className="w-full"
            position="top"
            align="left"
            content="Retire 10 mL de liquide dans l'éprouvette graduée."
          >
            <button
              type="button"
              onClick={handleDecrease}
              disabled={volume <= MIN_VOLUME}
              className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#C5D6E8] bg-[#F5F8FC] px-4 py-2.5 text-sm font-semibold text-[#0F2942] transition-colors hover:bg-[#E7F0FA] hover:border-[#9DBCE0] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146EBE] cursor-pointer"
            >
              <Minus className="h-4 w-4 text-[#146EBE]" aria-hidden="true" />
              <span>10 mL</span>
            </button>
          </Tooltip>
          <Tooltip
            className="w-full"
            position="top"
            align="right"
            content="Ajoute 10 mL de liquide dans l'éprouvette graduée."
          >
            <button
              type="button"
              onClick={handleIncrease}
              disabled={volume >= MAX_VOLUME}
              className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#C5D6E8] bg-[#F5F8FC] px-4 py-2.5 text-sm font-semibold text-[#0F2942] transition-colors hover:bg-[#E7F0FA] hover:border-[#9DBCE0] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146EBE] cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#146EBE]" aria-hidden="true" />
              <span>10 mL</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}
