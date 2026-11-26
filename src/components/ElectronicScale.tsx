import { AlertTriangle, CheckCircle2, Scale, FlaskConical } from 'lucide-react';
import { Tooltip, InfoTooltipButton } from './Tooltip';
import { EMPTY_CYLINDER_MASS, LIQUIDS, LiquidId } from '../types/lab';

interface ElectronicScaleProps {
  selectedLiquid: LiquidId;
  volume: number;
  isTared: boolean;
  measuredMass: number | null;
  isWeighing: boolean;
  tareWarning: boolean;
  onTare: () => void;
  onWeigh: () => void;
}

export function ElectronicScale({
  selectedLiquid,
  volume,
  isTared,
  measuredMass,
  isWeighing,
  tareWarning,
  onTare,
  onWeigh,
}: ElectronicScaleProps) {
  const liquid = LIQUIDS[selectedLiquid];

  // Détermination de l'affichage réaliste sur l'écran LCD
  let displayReading = `${EMPTY_CYLINDER_MASS.toFixed(2)} g`;
  let statusText = 'Éprouvette vide sur le plateau · Tarer avant de peser';
  let statusTone: 'idle' | 'ready' | 'done' | 'measuring' = 'idle';

  if (isWeighing) {
    displayReading = '----.-- g';
    statusText = 'Stabilisation de la mesure en cours…';
    statusTone = 'measuring';
  } else if (measuredMass !== null) {
    displayReading = `${measuredMass.toFixed(2)} g`;
    statusText = 'Mesure effectuée';
    statusTone = 'done';
  } else if (isTared) {
    displayReading = '0.00 g';
    statusText = 'Balance tarée – Prête à peser';
    statusTone = 'ready';
  }

  // Niveau visuel du liquide dans le récipient posé sur le plateau de la balance
  const hasLiquidOnPan = measuredMass !== null || isWeighing;
  const fillPercent = hasLiquidOnPan ? volume : 0;

  return (
    <section
      aria-labelledby="step-3-heading"
      className="flex flex-col justify-between rounded-2xl border border-[#D8E4F0] bg-white p-5 sm:p-6"
    >
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs font-semibold tracking-wider text-[#146EBE]">
            Étape 3
          </p>
          <span className="font-mono text-xs text-[#627D98]">
            Précision 0,01 g
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <h2
            id="step-3-heading"
            className="text-xl font-bold tracking-tight text-[#0F2942]"
          >
            3. Mesurer la masse
          </h2>
          <InfoTooltipButton
            label="Comment utiliser la balance électronique"
            position="bottom"
            align="right"
            content="La balance mesure la masse m en grammes (g). Tare d'abord la balance avec l'éprouvette vide (0,00 g), puis clique sur « Peser le liquide »."
          />
        </div>
      </div>

      {/* Balance électronique de laboratoire réaliste */}
      <div className="my-4 flex flex-col items-center">
        {/* Récipient posé sur le plateau */}
        <div className="relative z-10 -mb-1 flex flex-col items-center">
          <svg
            width="88"
            height="92"
            viewBox="0 0 88 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="scaleBeakerClip">
                <rect x="20" y="14" width="48" height="72" rx="4" />
              </clipPath>
            </defs>
            {/* Bécher / récipient en verre posé sur le plateau */}
            <path
              d="M16 10 Q20 11 20 16 V82 Q20 86 24 86 H64 Q68 86 68 82 V16 Q68 11 72 10"
              fill="#FFFFFF"
              fillOpacity="0.9"
            />
            <g clipPath="url(#scaleBeakerClip)">
              <rect
                x="18"
                y="22"
                width="52"
                height="66"
                fill={liquid.liquidColor}
                fillOpacity="0.8"
                style={{
                  transform: `scaleY(${fillPercent / 100})`,
                  transformOrigin: '44px 86px',
                  transition: 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </g>
            {/* Contours verre */}
            <path
              d="M16 10 Q20 11 20 16 V82 Q20 86 24 86 H64 Q68 86 68 82 V16 Q68 11 72 10"
              fill="none"
              stroke="#7A96B1"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="25"
              y1="20"
              x2="25"
              y2="78"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeOpacity="0.7"
              strokeLinecap="round"
            />
            {/* Petites graduations décoratives */}
            <line x1="54" y1="34" x2="64" y2="34" stroke="#627D98" strokeWidth="1.2" />
            <line x1="57" y1="50" x2="64" y2="50" stroke="#627D98" strokeWidth="1.2" />
            <line x1="54" y1="66" x2="64" y2="66" stroke="#627D98" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Plateau en acier brossé */}
        <div className="relative z-10 h-3 w-44 rounded-t-md border border-[#94A7BA] bg-gradient-to-b from-[#E8EFF6] to-[#B7C7D7] shadow-sm" />
        <div className="h-2 w-12 bg-[#8A9DB0]" />

        {/* Boîtier de la balance électronique */}
        <div className="w-full rounded-2xl border border-[#B8CAE0] bg-gradient-to-b from-[#F0F5FA] to-[#E2EAF3] p-4 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide text-[#47607A]">
            <span>BALANCE ÉLECTRONIQUE</span>
            <span>MAX 500 g · d = 0,01 g</span>
          </div>

          {/* Écran LCD rétroéclairé */}
          <div
            className="mt-2.5 rounded-xl border-2 border-[#23394D] bg-[#10262B] px-4 py-3.5 text-right shadow-inner"
            aria-live="polite"
          >
            <div className="flex items-center justify-between font-mono text-[11px] font-semibold tracking-wider text-[#64D99E]/80">
              <span>{isTared ? 'TARE' : 'BRUT'}</span>
              <span>
                {statusTone === 'measuring'
                  ? 'MESURE…'
                  : statusTone === 'done' || statusTone === 'ready'
                  ? 'STABLE'
                  : 'ATTENTE'}
              </span>
            </div>
            <div
              id="balanceDisplay"
              className="mt-1 font-mono text-3xl sm:text-[32px] font-bold tracking-tight tabular-nums text-[#5FFFB0]"
            >
              {displayReading}
            </div>
          </div>

          {/* Statut textuel explicite (jamais de couleur seule) */}
          <div
            id="balanceStatus"
            className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#243B53]"
          >
            {statusTone === 'done' && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F8A5F]" aria-hidden="true" />
            )}
            <span>{statusText}</span>
          </div>
        </div>
      </div>

      {/* Avertissement inline si pesée avant tarage (remplace window.alert) */}
      {tareWarning && (
        <div
          role="alert"
          className="mb-3 flex items-start gap-2.5 rounded-xl border border-[#F5C26B] bg-[#FFF8EB] px-3.5 py-3 text-sm font-medium text-[#7A4A00]"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#C97A00]" aria-hidden="true" />
          <span>
            Attention ! Il faut d'abord tarer la balance avant de peser le liquide.
          </span>
        </div>
      )}

      {/* Boutons larges adaptés au tactile en classe */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <Tooltip
            className="w-full"
            position="top"
            align="left"
            content="Remet l'affichage de la balance à 0,00 g pour annuler la masse du récipient vide."
          >
            <button
              type="button"
              onClick={onTare}
              className="inline-flex w-full min-h-[50px] items-center justify-center gap-2 rounded-xl border border-[#9EB6CF] bg-[#47607A] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#354B63] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146EBE] focus-visible:ring-offset-2 cursor-pointer"
            >
              <Scale className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Tarer la balance</span>
            </button>
          </Tooltip>

          <Tooltip
            className="w-full"
            position="top"
            align="right"
            content="Pèse le liquide pour mesurer sa masse m en grammes (g). Pense à tarer la balance avant !"
          >
            <button
              type="button"
              onClick={onWeigh}
              disabled={isWeighing}
              className="inline-flex w-full min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#0F8A5F] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0B6E4B] active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8A5F] focus-visible:ring-offset-2 cursor-pointer"
            >
              <FlaskConical className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Peser le liquide</span>
            </button>
          </Tooltip>
        </div>

        <p className="text-center text-xs text-[#47607A]">
          Note la masse <em className="font-serif italic font-semibold">m</em> mesurée sur ton cahier.
        </p>
      </div>
    </section>
  );
}
