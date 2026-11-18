import { DialogSection } from "@/components/ui/DialogSection";
import { useRepositoryPreview } from "./context";
export function RepositoryInfo() {
  const { repo } = useRepositoryPreview();
  const details = [{ label: "نقش شما", value: repo.role }, { label: "وضعیت", value: repo.archived ? "بایگانی‌شده" : "فعال" }, { label: "اعضا", value: `${repo.members.length} نفر` }, { label: "فایل‌ها", value: `${repo.files.length} فایل` }];
  return <DialogSection testId="repo-info-summary" title={repo.name} description={repo.description}>
    <dl data-test-id="repo-info-properties" className="grid grid-cols-2 gap-3">{details.map(item => <div data-test-id={`repo-info-${item.label}`} key={item.label} className="space-y-1"><dt data-test-id={`repo-info-label-${item.label}`} className="text-[11px] text-muted-foreground">{item.label}</dt><dd data-test-id={`repo-info-value-${item.label}`} className="text-xs font-medium">{item.value}</dd></div>)}</dl>
  </DialogSection>;
}
