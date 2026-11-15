/** Static Tailwind contracts; all state variants are compiled by Tailwind v4. */
const systemColors = "forced-colors:bg-[Canvas]! forced-colors:text-[CanvasText]! forced-colors:border-[CanvasText]! forced-colors:shadow-none! forced-colors:backdrop-blur-none!";
const opaque = `opaque:bg-[var(--glass-fallback)]! opaque:border-input opaque:backdrop-blur-none! ${systemColors}`;
const interaction = `transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 enabled:hover:shadow-md enabled:hover:shadow-purple-500/20 disabled:translate-y-0 data-disabled:translate-y-0 aria-disabled:translate-y-0 motion-reduce:translate-y-0! ${systemColors}`;
const panel = `rounded-lg border border-white/40 bg-[var(--glass-fallback)] text-[color:var(--glass-text)] shadow-[0_1px_4px_rgb(0_0_0/0.06)] backdrop-blur-none glass-enabled:bg-[var(--glass-tint)]/30 glass-enabled:backdrop-blur-md ${opaque}`;
const navigation = `rounded-lg border border-transparent transition-all duration-200 hover:bg-white/20 hover:backdrop-blur-md hover:border-white/30 hover:shadow-sm focus-visible:bg-white/20 focus-visible:backdrop-blur-md data-highlighted:bg-white/20 data-highlighted:backdrop-blur-md data-highlighted:border-white/30 data-highlighted:shadow-sm ${opaque}`;
const active = "bg-white/30 backdrop-blur-md border-white/40 shadow-sm font-medium";

export const glass = {
  panel,
  segmentedTabs: `${panel} w-full max-w-full gap-1 overflow-x-auto rounded-xl p-1 group-data-horizontal/tabs:h-auto`,
  segmentedTab: `${navigation} h-auto min-h-11 min-w-max flex-1 basis-0 px-4 py-2 font-medium focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-inset focus-visible:outline-none group-data-[variant=segmented]/tabs-list:data-active:bg-white/30 group-data-[variant=segmented]/tabs-list:data-active:border-white/40 group-data-[variant=segmented]/tabs-list:data-active:shadow-sm group-data-[variant=segmented]/tabs-list:data-active:text-primary dark:group-data-[variant=segmented]/tabs-list:data-active:text-purple-200 opaque:group-data-[variant=segmented]/tabs-list:data-active:bg-primary/15! opaque:group-data-[variant=segmented]/tabs-list:data-active:border-primary/40! forced-colors:group-data-[variant=segmented]/tabs-list:data-active:outline-2 forced-colors:group-data-[variant=segmented]/tabs-list:data-active:outline-[Highlight] motion-reduce:transition-none`,
  floating: `${panel} shadow-[0_24px_48px_rgb(0_0_0/0.2),inset_0_1px_rgb(255_255_255/0.5)]`,
  input: `rounded-md border border-gray-300/40 bg-[var(--glass-fallback)] text-[color:var(--glass-field-text)] shadow-inner backdrop-blur-none transition-all duration-200 glass-enabled:bg-white/40 glass-enabled:backdrop-blur-sm dark:glass-enabled:bg-white/10 enabled:hover:glass-enabled:bg-white/50 dark:enabled:hover:glass-enabled:bg-white/20 focus:glass-enabled:bg-white/50 dark:focus:glass-enabled:bg-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none aria-invalid:border-[var(--glass-error)]! aria-invalid:ring-2 aria-invalid:ring-[var(--glass-error)]/40 disabled:cursor-not-allowed disabled:opacity-50 ${opaque}`,
  select: `${interaction} rounded-md border border-white/40 bg-[var(--glass-fallback)] text-[color:var(--glass-field-text)] shadow-lg glass-enabled:bg-[var(--glass-tint)]/30 glass-enabled:backdrop-blur-md focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none aria-invalid:border-[var(--glass-error)]! aria-invalid:ring-[var(--glass-error)]/40 disabled:opacity-50 ${opaque}`,
  interaction,
  nativeButton: `${interaction} ${panel}`,
  navigation,
  active,
  current: "[&[aria-current]]:bg-white/30 [&[aria-current]]:backdrop-blur-md [&[aria-current]]:border-white/40 [&[aria-current]]:shadow-sm [&[aria-current]]:font-medium data-active:bg-white/30 data-active:backdrop-blur-md data-active:border-white/40 data-active:shadow-sm data-active:font-medium",
  control: `border border-white/20 bg-[var(--glass-fallback)] backdrop-blur-none glass-enabled:bg-white/10 glass-enabled:backdrop-blur-sm enabled:hover:glass-enabled:bg-white/20 ${opaque}`,
  primary: `border-purple-400/50 bg-primary text-white shadow-lg glass-enabled:bg-purple-600/60 glass-enabled:backdrop-blur-md enabled:hover:glass-enabled:bg-purple-500/80 opaque:bg-primary! opaque:backdrop-blur-none! ${systemColors}`,
  secondary: `border-white/60 bg-[var(--glass-fallback)] font-medium text-[color:var(--glass-field-text)] shadow-sm glass-enabled:bg-white/50 glass-enabled:backdrop-blur-md enabled:hover:glass-enabled:bg-white/60 dark:glass-enabled:bg-white/15 dark:enabled:hover:glass-enabled:bg-white/25 ${opaque}`,
  backdrop: "bg-black/40 backdrop-blur-sm forced-colors:backdrop-blur-none",
  canvas: "bg-[image:var(--material-canvas)]",
};
