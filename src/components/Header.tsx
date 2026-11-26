import { RotateCcw } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#D8E4F0] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-[#0F2942] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146EBE] focus-visible:ring-offset-2 rounded"
        >
          Laboratoire virtuel
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#47607A]"
        >
          <a
            href="#mission"
            className="hover:text-[#0F2942] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Mission
          </a>
          <a
            href="#paillasse"
            className="hover:text-[#0F2942] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Paillasse
          </a>
          <a
            href="#formule"
            className="hover:text-[#0F2942] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Formule
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <Tooltip
            position="bottom"
            align="right"
            content="Remet l'expérience à zéro : sélectionne l'eau, règle le volume sur 50 mL et vide la balance."
          >
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#C5D6E8] bg-[#F5F8FC] px-4 py-2 text-sm font-semibold text-[#0F2942] transition-colors hover:bg-[#E7F0FA] hover:border-[#9DBCE0] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146EBE] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-[#146EBE]" aria-hidden="true" />
              <span>Réinitialiser</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
