import { Eye } from 'lucide-react';
import { InfoTooltipButton } from './Tooltip';
import { LIQUIDS, LiquidId } from '../types/lab';

interface GraduatedCylinderProps {
  selectedLiquid: LiquidId;
  volume: number;
}

// Coordonnées internes de l'éprouvette SVG (graduations de 0 à 100 mL)
const SCALE_TOP_Y = 52; // 100 mL
const SCALE_BOTTOM_Y = 252; // 0 mL
const SCALE_HEIGHT = SCALE_BOTTOM_Y - SCALE_TOP_Y; // 200 px => 2 px / mL

const GRADUATION_MARKS = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

export function GraduatedCylinder({
  selectedLiquid,
  volume,
}: GraduatedCylinderProps) {
  const liquid = LIQUIDS[selectedLiquid];
  // Calcul de la position verticale du ménisque (entre SCALE_TOP_Y et SCALE_BOTTOM_Y)
  const fillHeight = (volume / 100) * SCALE_HEIGHT;
  const meniscusY = SCALE_BOTTOM_Y - fillHeight;
  const translateY = SCALE_HEIGHT - fillHeight;

  return (
    <section
      aria-labelledby="step-2-heading"
      className="flex flex-col justify-between rounded-2xl border border-[#D8E4F0] bg-white p-5 sm:p-6"
    >
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs font-semibold tracking-wider text-[#146EBE]">
            Étape 2
          </p>
          <span className="font-mono text-xs text-[#627D98]">
            Capacité 100 mL
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <h2
              id="step-2-heading"
              className="text-xl font-bold tracking-tight text-[#0F2942]"
            >
              2. Mesurer le volume
            </h2>
            <InfoTooltipButton
              label="Comment utiliser l'éprouvette graduée"
              position="bottom"
              align="right"
              content="L'éprouvette graduée permet de mesurer le volume V d'un liquide en millilitres (mL) avec précision."
            />
          </div>
        </div>
      </div>

      {/* Éprouvette graduée réaliste */}
      <div className="my-4 flex flex-col items-center justify-center rounded-xl border border-[#E2ECF5] bg-[#F8FBFF] px-4 py-5">
        <svg
          viewBox="0 0 240 296"
          className="h-[268px] w-full max-w-[230px]"
          role="img"
          aria-label={`Éprouvette graduée contenant ${volume} mL de ${liquid.name}`}
        >
          <defs>
            {/* Masque interne du tube en verre */}
            <clipPath id="cylinderGlassClip">
              <path d="M84 36 H156 V250 Q156 260 146 260 H94 Q84 260 84 250 Z" />
            </clipPath>
            {/* Dégradé subtil du liquide */}
            <linearGradient id="liquidBodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={liquid.liquidColor} stopOpacity="0.82" />
              <stop offset="35%" stopColor={liquid.liquidTopColor} stopOpacity="0.72" />
              <stop offset="80%" stopColor={liquid.liquidColor} stopOpacity="0.86" />
              <stop offset="100%" stopColor={liquid.meniscusStroke} stopOpacity="0.78" />
            </linearGradient>
            {/* Reflet verre borosilicate */}
            <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="82%" stopColor="#FFFFFF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Ombre portée sur la paillasse */}
          <ellipse cx="120" cy="279" rx="54" ry="7" fill="#C9D9EA" fillOpacity="0.55" />

          {/* Socle hexagonal en verre/polypropylène bleu-gris */}
          <path
            d="M72 268 L84 260 H156 L168 268 L164 277 H76 Z"
            fill="#DCE7F3"
            stroke="#8BA5BF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="76" y="274" width="88" height="4" rx="1.5" fill="#B5C9DE" />

          {/* Corps en verre de l'éprouvette (fond) */}
          <path
            d="M78 30 Q84 30 84 38 V250 Q84 260 94 260 H146 Q156 260 156 250 V38 Q156 30 162 30"
            fill="#FFFFFF"
            fillOpacity="0.85"
          />

          {/* Colonne de liquide animée avec ménisque concave */}
          <g clipPath="url(#cylinderGlassClip)">
            <g
              style={{
                transform: `translateY(${translateY}px)`,
                transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Corps liquide : le bas du ménisque est à SCALE_TOP_Y (=52) quand translateY=0 */}
              <path
                d={`M 82 ${SCALE_TOP_Y - 5} Q 120 ${SCALE_TOP_Y + 5} 158 ${SCALE_TOP_Y - 5} V ${SCALE_BOTTOM_Y + 18} H 82 Z`}
                fill="url(#liquidBodyGrad)"
                style={{ transition: 'fill 300ms ease' }}
              />
              {/* Ligne supérieure du ménisque concave */}
              <path
                d={`M 83 ${SCALE_TOP_Y - 5} Q 120 ${SCALE_TOP_Y + 5} 157 ${SCALE_TOP_Y - 5}`}
                fill="none"
                stroke={liquid.meniscusStroke}
                strokeWidth="2"
                style={{ transition: 'stroke 300ms ease' }}
              />
              {/* Reflet lumineux à la surface du ménisque */}
              <path
                d={`M 90 ${SCALE_TOP_Y - 2} Q 120 ${SCALE_TOP_Y + 4} 148 ${SCALE_TOP_Y - 2}`}
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.65"
                strokeWidth="1.2"
              />
            </g>
          </g>

          {/* Reflet longitudinal sur la paroi en verre */}
          <rect
            x="84"
            y="36"
            width="72"
            height="224"
            rx="8"
            fill="url(#glassSheen)"
            pointerEvents="none"
          />
          <line
            x1="91"
            y1="42"
            x2="91"
            y2="248"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />

          {/* Contours extérieurs et bec verseur */}
          <path
            d="M76 28 Q84 29 84 38 V250 Q84 260 94 260 H146 Q156 260 156 250 V38 Q156 29 164 28"
            fill="none"
            stroke="#6F8DA8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Rebord supérieur */}
          <ellipse
            cx="120"
            cy="28"
            rx="42"
            ry="3.5"
            fill="none"
            stroke="#7C98B3"
            strokeWidth="2"
          />

          {/* Graduations sérigraphiées en mL */}
          {GRADUATION_MARKS.map((mark) => {
            const y = SCALE_BOTTOM_Y - (mark / 100) * SCALE_HEIGHT;
            const isMajor = mark % 20 === 0;
            return (
              <g key={mark}>
                <line
                  x1={isMajor ? 92 : 98}
                  y1={y}
                  x2="115"
                  y2={y}
                  stroke="#2B4863"
                  strokeWidth={isMajor ? '1.6' : '1.1'}
                />
                {isMajor && (
                  <text
                    x="120"
                    y={y + 3.5}
                    fill="#243B53"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {mark}
                  </text>
                )}
              </g>
            );
          })}

          {/* Mention mL en haut de la colonne */}
          <text
            x="120"
            y="45"
            textAnchor="middle"
            fill="#47607A"
            fontSize="9"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            mL
          </text>

          {/* Ligne de visée du ménisque (oeil à hauteur de la surface) */}
          <g
            style={{
              transform: `translateY(${meniscusY}px)`,
              transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <line
              x1="46"
              y1="0"
              x2="180"
              y2="0"
              stroke="#146EBE"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <polygon points="180,-3.5 180,3.5 172,0" fill="#146EBE" />
            <rect
              x="184"
              y="-11"
              width="50"
              height="22"
              rx="6"
              fill="#146EBE"
            />
            <text
              x="209"
              y="3.5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10.5"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              {volume} mL
            </text>
          </g>
        </svg>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#47607A]">
          <Eye className="h-3.5 w-3.5 text-[#146EBE]" aria-hidden="true" />
          <span>Lecture au bas du ménisque (graduations en mL)</span>
          <InfoTooltipButton
            label="Qu'est-ce que le ménisque ?"
            position="top"
            align="right"
            content="La surface du liquide est légèrement incurvée : c'est le ménisque. Il faut toujours lire le volume au point le plus bas de cette courbe."
          />
        </div>
      </div>

      {/* Valeur lue */}
      <div className="rounded-xl border border-[#E2ECF5] bg-[#F5F8FC] px-4 py-3.5 text-center">
        <p className="text-xs font-medium text-[#47607A]">
          Volume lu sur l'éprouvette
        </p>
        <p
          id="volumeRead"
          className="mt-0.5 font-mono text-3xl font-bold tabular-nums text-[#0F2942]"
        >
          {volume}{' '}
          <span className="text-base font-semibold text-[#47607A]">mL</span>
        </p>
        <p className="mt-1 text-xs text-[#47607A]">
          Note le volume <em className="font-serif italic font-semibold">V</em> mesuré sur ton cahier.
        </p>
      </div>
    </section>
  );
}
