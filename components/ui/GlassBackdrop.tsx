export function GlassBackdrop() {
  return <div aria-hidden="true" data-test-id="layout-mesh" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[image:var(--material-canvas)]">
    <div data-test-id="AppLayout-div-3" className="absolute -top-24 -start-24 size-[32rem] rounded-full bg-[var(--clasor-color-brand-400)]/60 blur-3xl" />
    <div data-test-id="AppLayout-div-4" className="absolute top-16 -end-32 size-[36rem] rounded-full bg-[var(--panel-tertiary)]/35 blur-3xl" />
    <div data-test-id="AppLayout-div-5" className="absolute -bottom-32 start-1/4 size-[30rem] rounded-full bg-[var(--clasor-color-brand-300)]/60 blur-3xl" />
  </div>;
}
