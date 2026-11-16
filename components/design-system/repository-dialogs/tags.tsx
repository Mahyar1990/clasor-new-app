"use client";
import { TagManager } from "@/components/ui/TagManager";
import { Button } from "@/components/ui/button";
import { useDialogNavigation } from "@/components/ui/DialogNavigation";
import { useRepositoryPreview } from "./context";
import { useOptionalLibrary } from "../library/store";
function ConfirmTag({ tag, confirm }: { tag: string; confirm: () => void }) {
  const { back } = useDialogNavigation();
  return <div data-test-id="repo-delete-tag-confirm" className="space-y-3">
    <p data-test-id="repo-delete-tag-description" className="text-xs">تگ «{tag}» از مخزن و همهٔ سندهای آن حذف شود؟</p>
    <div data-test-id="repo-delete-tag-actions" className="flex gap-2"><Button data-test-id="repo-delete-tag-cancel" variant="outline" onClick={back}>انصراف</Button><Button data-test-id="repo-delete-tag-submit" variant="destructive" onClick={() => { confirm(); back(); }}>حذف تگ</Button></div>
  </div>;
}
export function RepositoryTags() {
  const { repo, setRepo } = useRepositoryPreview();
  const library = useOptionalLibrary();
  const { push } = useDialogNavigation();
  function change(tags: string[]) { if (library) library.setRepositoryTags(repo.id, tags); else setRepo(current => ({ ...current, tags })); }
  return <TagManager testId="repository-tags" value={repo.tags ?? []} onValueChange={change} onDelete={tag => push("حذف تگ", <ConfirmTag tag={tag} confirm={() => change((repo.tags ?? []).filter(item => item !== tag))} />)} />;
}
