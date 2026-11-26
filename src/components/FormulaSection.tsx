import { BookOpen } from 'lucide-react';

export function FormulaSection() {
  return (
    <section
      id="formule"
      aria-labelledby="formula-heading"
      className="rounded-2xl border border-[#D8E4F0] bg-white p-6 sm:p-8"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[#146EBE]">
            4. Exploitation des mesures
          </p>
          <h2
            id="formula-heading"
            className="mt-1.5 text-2xl font-bold tracking-tight text-[#0F2942]"
          >
            Déterminer la masse volumique
          </h2>
          <p className="mt-2 text-base text-[#47607A]">
            À partir des mesures réalisées précédemment, détermine la masse volumique du liquide sur ton cahier.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          {/* Encadré formule pure sans calcul */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#D8E4F0] bg-[#F5F8FC] px-6 py-8 md:col-span-5">
            <div
              className="flex items-center gap-4 text-4xl sm:text-5xl text-[#0F2942]"
              style={{ fontFamily: 'var(--font-serif)' }}
              aria-label="Formule : rho égale m divisé par V"
            >
              <span className="italic font-semibold text-[#146EBE]">ρ</span>
              <span className="text-[#47607A]">=</span>
              <div className="inline-flex flex-col items-center leading-none">
                <span className="italic font-semibold pb-1.5">m</span>
                <span className="h-[2.5px] w-11 bg-[#0F2942] rounded-full" aria-hidden="true" />
                <span className="italic font-semibold pt-2">V</span>
              </div>
            </div>
            <p className="mt-4 font-mono text-sm font-medium text-[#47607A]">
              ρ = m / V
            </p>
          </div>

          {/* Signification des grandeurs et unités */}
          <div className="rounded-xl border border-[#E2ECF5] bg-[#FAFCFF] p-5 sm:p-6 md:col-span-7">
            <h3 className="text-sm font-semibold text-[#0F2942]">
              Avec :
            </h3>
            <dl className="mt-3 space-y-3 text-base text-[#243B53]">
              <div className="flex items-baseline gap-3">
                <dt
                  className="w-7 shrink-0 text-center text-xl italic font-semibold text-[#146EBE]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  ρ
                </dt>
                <dd>
                  masse volumique en <strong className="font-mono text-sm font-semibold text-[#0F2942]">g/mL</strong>
                </dd>
              </div>
              <div className="flex items-baseline gap-3 border-t border-[#E6EEF7] pt-3">
                <dt
                  className="w-7 shrink-0 text-center text-xl italic font-semibold text-[#0F2942]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  m
                </dt>
                <dd>
                  masse du liquide en <strong className="font-mono text-sm font-semibold text-[#0F2942]">g</strong>
                </dd>
              </div>
              <div className="flex items-baseline gap-3 border-t border-[#E6EEF7] pt-3">
                <dt
                  className="w-7 shrink-0 text-center text-xl italic font-semibold text-[#0F2942]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  V
                </dt>
                <dd>
                  volume du liquide en <strong className="font-mono text-sm font-semibold text-[#0F2942]">mL</strong>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#DCE8F5] bg-[#F5F8FC] px-5 py-4 text-sm sm:text-base text-[#243B53]">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#146EBE]" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-[#0F2942]">À toi de jouer !</strong> Utilise les valeurs mesurées avec la balance et l'éprouvette graduée pour effectuer ton calcul sur ton cahier.
          </p>
        </div>
      </div>
    </section>
  );
}
