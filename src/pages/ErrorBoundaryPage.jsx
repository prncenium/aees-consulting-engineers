import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import GlassPanel from '@/components/ui/GlassPanel';
import AuroraBackground from '@/components/ui/AuroraBackground';
import { routeError } from '@/data/notFound';

/**
 * Router errorElement. This renders OUTSIDE the layout (the layout itself may
 * be what failed), so it carries its own background and header and never
 * depends on anything that could have thrown.
 */
export default function ErrorBoundaryPage() {
  const error = useRouteError();

  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AuroraBackground />

      <Container className="flex h-20 items-center">
        <Logo />
      </Container>

      <main className="flex flex-1 items-center py-12">
        <Container>
          <GlassPanel
            tier="thick"
            radius="rounded-[2rem] sm:rounded-[2.5rem]"
            className="px-6 py-14 sm:px-10 lg:px-14"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-[clamp(2.5rem,8vw,4rem)] font-semibold leading-none tracking-tight text-accent-ink/25">
                  {routeError.code}
                </p>
                <p className="eyebrow mt-7">{routeError.eyebrow}</p>
                <h1 className="mt-4 text-balance">{routeError.heading}</h1>
                <p className="mt-5 max-w-prose text-copy text-body">{routeError.body}</p>

                <div className="mt-9 flex flex-wrap gap-3.5">
                  <Button size="lg" variant="primary" onClick={() => window.location.reload()}>
                    <RefreshCw aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
                    {routeError.primary.label}
                  </Button>
                  <Button size="lg" variant="secondary" to={routeError.secondary.to}>
                    {routeError.secondary.label}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <h2 className="text-small font-semibold text-ink">Technical detail</h2>
                <pre className="mt-3.5 overflow-x-auto rounded-2xl bg-white/70 p-4 font-mono text-[0.75rem] leading-relaxed text-body shadow-glass-sm">
                  {detail}
                </pre>
                <p className="mt-5 text-copy-sm text-body">
                  If this keeps happening,{' '}
                  <Link to="/contact" className="link-sweep font-medium text-accent-ink">
                    tell us what you were trying to reach
                  </Link>
                  .
                </p>
              </div>
            </div>
          </GlassPanel>
        </Container>
      </main>
    </div>
  );
}
