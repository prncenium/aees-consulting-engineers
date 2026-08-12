import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import SegmentedToggle from '@/components/ui/SegmentedToggle';
import GlassPanel from '@/components/ui/GlassPanel';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DELIVERY_MODES, SERVICE_LINES, SORT_OPTIONS } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * All project filtering UI. Owns nothing but the debounce and the panel's
 * open/closed state — every filter value lives in the URL query string, held
 * by the Projects page.
 */
export default function ProjectFilters({
  filters,
  counts,
  states,
  activeCount,
  resultCount,
  onChange,
  onClear,
}) {
  const reduced = useReducedMotion();
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState(filters.q);
  const debouncedQuery = useDebouncedValue(query, 300);
  const lastPushed = useRef(filters.q);
  const searchId = useId();
  const panelId = useId();

  // Push the debounced keyword up into the URL.
  useEffect(() => {
    if (debouncedQuery === lastPushed.current) return;
    lastPushed.current = debouncedQuery;
    onChange({ q: debouncedQuery });
  }, [debouncedQuery, onChange]);

  // Pull external changes (back/forward, "clear filters") back into the input.
  useEffect(() => {
    if (filters.q !== lastPushed.current) {
      lastPushed.current = filters.q;
      setQuery(filters.q);
    }
  }, [filters.q]);

  const toggleService = (service) => {
    const next = filters.services.includes(service)
      ? filters.services.filter((item) => item !== service)
      : [...filters.services, service];
    onChange({ service: next });
  };

  const selectClasses =
    'min-h-[44px] w-full cursor-pointer rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2.5 text-[0.875rem] text-ink shadow-glass-sm transition-colors duration-200 hover:border-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1 — status segments + search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SegmentedToggle
          label="Filter by project status"
          value={filters.status}
          onChange={(value) => onChange({ status: value })}
          options={[
            { value: 'All', label: 'All', count: counts.All },
            { value: 'Ongoing', label: 'Ongoing', count: counts.Ongoing },
            { value: 'Completed', label: 'Completed', count: counts.Completed },
          ]}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:w-80">
            <label htmlFor={searchId} className="sr-only">
              Search projects by name, client, corridor or state
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search corridor, client, state…"
              className="min-h-[46px] w-full rounded-full border border-white/70 bg-white/85 py-2.5 pl-11 pr-11 text-[0.875rem] text-ink placeholder:text-muted shadow-glass-sm transition-colors duration-200 hover:border-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
              >
                <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setPanelOpen((value) => !value)}
            aria-expanded={panelOpen}
            aria-controls={panelId}
            className={cn(
              'inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-5 text-[0.875rem] font-medium transition-all duration-200 hover:-translate-y-[1px]',
              panelOpen || activeCount > 0
                ? 'bg-primary text-white shadow-glow-primary'
                : 'glass-thin text-ink hover:bg-white/85'
            )}
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            Filters
            {activeCount > 0 ? (
              <span className="tnum font-mono text-[0.6875rem]">{activeCount}</span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Row 2 — collapsible detail panel */}
      <AnimatePresence initial={false}>
        {panelOpen ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 26 }}
            className="overflow-hidden"
          >
            <GlassPanel tier="read" className="flex flex-col gap-7 p-6">
              <fieldset>
                <legend className="text-small font-semibold text-ink">Service line</legend>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {SERVICE_LINES.map((service) => (
                    <li key={service}>
                      <Chip
                        selected={filters.services.includes(service)}
                        onClick={() => toggleService(service)}
                      >
                        {service}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="filter-state" className="text-small font-semibold text-ink">
                    State
                  </label>
                  <select
                    id="filter-state"
                    value={filters.state}
                    onChange={(event) => onChange({ state: event.target.value })}
                    className={selectClasses}
                  >
                    <option value="All">All states</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="filter-mode" className="text-small font-semibold text-ink">
                    Delivery mode
                  </label>
                  <select
                    id="filter-mode"
                    value={filters.mode}
                    onChange={(event) => onChange({ mode: event.target.value })}
                    className={selectClasses}
                  >
                    <option value="All">All modes</option>
                    {DELIVERY_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="filter-sort" className="text-small font-semibold text-ink">
                    Sort by
                  </label>
                  <select
                    id="filter-sort"
                    value={filters.sort}
                    onChange={(event) => onChange({ sort: event.target.value })}
                    className={selectClasses}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {activeCount > 0 ? (
                <div className="flex justify-start border-t border-hairline pt-6">
                  <Button variant="secondary" size="sm" onClick={onClear}>
                    <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    Clear all filters
                  </Button>
                </div>
              ) : null}
            </GlassPanel>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Result count — announced politely so filtering is perceivable */}
      <p aria-live="polite" className="text-small font-medium text-meta">
        {resultCount === 0
          ? 'No projects match the current filters'
          : `${resultCount} ${resultCount === 1 ? 'project' : 'projects'} match`}
      </p>
    </div>
  );
}
