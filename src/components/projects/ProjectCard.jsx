import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import StatusPill from '@/components/ui/StatusPill';
import { cn, formatNumber } from '@/lib/utils';

/**
 * Register entry. Deliberately image-free — the record is the content.
 * The full official assignment title sits behind a disclosure toggle so the
 * card stays scannable without hiding the formal record.
 */
export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const meta = [
    { label: 'Corridor', value: project.corridor },
    { label: 'Length', value: project.lengthKm ? `${formatNumber(project.lengthKm)} km` : '—' },
    { label: 'State', value: project.state },
    { label: 'Client', value: project.client },
  ];

  return (
    <Card as="article" interactive tier="read" className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] font-medium tracking-[0.06em] text-meta">
          {project.ref}
        </p>
        <StatusPill status={project.status} />
      </div>

      <h3 className="mt-5 text-balance">{project.name}</h3>

      <ul className="mt-4 flex flex-wrap gap-2">
        <li>
          <Badge tone="primary">{project.service}</Badge>
        </li>
        <li>
          <Badge>{project.mode}</Badge>
        </li>
      </ul>

      <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-hairline pt-5">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-copy-sm leading-snug text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-3 border-t border-hairline pt-4 text-left text-small font-semibold text-accent-ink transition-colors duration-200 hover:text-ink"
        >
          {open ? 'Hide official title' : 'Show official title'}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-300',
              open && 'rotate-180'
            )}
            strokeWidth={2}
          />
        </button>

        <div id={panelId} hidden={!open} className="pt-4">
          <p className="rounded-2xl bg-white/70 p-4 text-[0.8125rem] leading-relaxed text-body shadow-glass-sm">
            {project.title}
          </p>
          {project.started ? (
            <p className="mt-3 font-mono text-[0.6875rem] font-medium uppercase tracking-eyebrow text-meta">
              Commenced {project.started}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
