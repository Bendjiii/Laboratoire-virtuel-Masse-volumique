import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  align = 'center',
  className = '',
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const positionClasses =
    position === 'top'
      ? 'bottom-full mb-2.5'
      : 'top-full mt-2.5';

  const alignClasses =
    align === 'left'
      ? 'left-0'
      : align === 'right'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  const arrowAlignClasses =
    align === 'left'
      ? 'left-5'
      : align === 'right'
      ? 'right-5'
      : 'left-1/2 -translate-x-1/2';

  const arrowPositionClasses =
    position === 'top'
      ? 'top-full -mt-1 border-t-[#0F2942] border-r-transparent border-b-transparent border-l-transparent'
      : 'bottom-full -mb-1 border-b-[#0F2942] border-r-transparent border-t-transparent border-l-transparent';

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div aria-describedby={open ? tooltipId : undefined}>{children}</div>

      <div
        id={tooltipId}
        role="tooltip"
        aria-hidden={!open}
        className={`pointer-events-none absolute z-50 w-max max-w-[235px] rounded-xl bg-[#0F2942] px-3 py-2 text-left text-xs font-medium leading-relaxed text-white shadow-lg transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${positionClasses} ${alignClasses} ${
          open
            ? 'opacity-100 translate-y-0'
            : position === 'top'
            ? 'opacity-0 translate-y-1'
            : 'opacity-0 -translate-y-1'
        }`}
      >
        {content}
        <span
          aria-hidden="true"
          className={`absolute h-0 w-0 border-[5px] ${arrowAlignClasses} ${arrowPositionClasses}`}
        />
      </div>
    </div>
  );
}

interface InfoTooltipButtonProps {
  label: string;
  content: string;
  position?: 'top' | 'bottom';
  align?: 'center' | 'left' | 'right';
}

export function InfoTooltipButton({
  label,
  content,
  position = 'top',
  align = 'center',
}: InfoTooltipButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  const positionClasses =
    position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';

  const alignClasses =
    align === 'left'
      ? 'left-0'
      : align === 'right'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  const arrowAlignClasses =
    align === 'left'
      ? 'left-3'
      : align === 'right'
      ? 'right-3'
      : 'left-1/2 -translate-x-1/2';

  const arrowPositionClasses =
    position === 'top'
      ? 'top-full -mt-1 border-t-[#0F2942] border-r-transparent border-b-transparent border-l-transparent'
      : 'bottom-full -mb-1 border-b-[#0F2942] border-r-transparent border-t-transparent border-l-transparent';

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#47607A] transition-colors hover:bg-[#E7F0FA] hover:text-[#146EBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146EBE] cursor-pointer"
      >
        <HelpCircle className="h-4 w-4" aria-hidden="true" />
      </button>

      <div
        id={tooltipId}
        role="tooltip"
        aria-hidden={!open}
        className={`pointer-events-none absolute z-50 w-max max-w-[240px] rounded-xl bg-[#0F2942] px-3 py-2 text-left text-xs font-medium leading-relaxed text-white shadow-lg transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${positionClasses} ${alignClasses} ${
          open
            ? 'opacity-100 translate-y-0'
            : position === 'top'
            ? 'opacity-0 translate-y-1'
            : 'opacity-0 -translate-y-1'
        }`}
      >
        {content}
        <span
          aria-hidden="true"
          className={`absolute h-0 w-0 border-[5px] ${arrowAlignClasses} ${arrowPositionClasses}`}
        />
      </div>
    </div>
  );
}
