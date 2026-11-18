/** Paired record timestamps with explicit labels and a stable Tehran calendar. */
const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  timeZone: "Asia/Tehran", year: "numeric", month: "short", day: "numeric",
});

export function RecordDates({ createdAt, updatedAt, testId }: {
  createdAt?: string; updatedAt?: string; testId: string;
}) {
  return <dl data-test-id={testId} className="space-y-1 text-[11px] leading-4">
    {([{ id: "created", label: "ایجاد", value: createdAt }, { id: "updated", label: "ویرایش", value: updatedAt }]).map(({ id, label, value }) => {
      const timestamp = value ? Date.parse(value) : NaN;
      return <div key={id} data-test-id={`${testId}-${id}`} className="flex items-baseline gap-2 whitespace-nowrap">
        <dt data-test-id={`${testId}-${id}-label`} className="w-8 shrink-0 text-[10px] text-muted-foreground">{label}</dt>
        <dd data-test-id={`${testId}-${id}-value`} className="m-0 tabular-nums">
          {Number.isFinite(timestamp)
            ? <time data-test-id={`${testId}-${id}-time`} dateTime={value}>{dateFormatter.format(timestamp)}</time>
            : <span data-test-id={`${testId}-${id}-unknown`} aria-label="نامشخص">—</span>}
        </dd>
      </div>;
    })}
  </dl>;
}
