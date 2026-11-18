import { glass } from "@/lib/design-system/classes";
import { CircleCheck, TriangleAlert, CircleAlert, Info } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { FeedbackTone } from "@/lib/design-system/models"
const tones = {
  success: { icon: CircleCheck, style: glass.statusSuccess },
  warning: { icon: TriangleAlert, style: glass.statusWarning },
  error: { icon: CircleAlert, style: glass.statusDanger },
  info: { icon: Info, style: glass.statusInfo },
}
export function Feedback({ tone, title, description, dataRetained, action }: { tone: FeedbackTone; title: string; description: string; dataRetained?: boolean; action?: { label: string; onAction: () => void } }) {
  const { icon: Icon, style } = tones[tone]
  return <Alert role="status" data-test-id={`feedback-${tone}`} className={`${glass.statusSurface} ${style} min-w-0`}><Icon aria-hidden="true" /><AlertTitle>{title}</AlertTitle><AlertDescription className="text-current break-words leading-body">
    <p data-test-id="feedback-p-1">{description}</p>{dataRetained !== undefined && <p data-test-id="feedback-p-2">{dataRetained ? "اطلاعات واردشده حفظ شده است." : "اطلاعات ثبت نشده است؛ ورودی‌ها را پیش از ادامه بررسی کنید."}</p>}
    {action && <Button data-test-id="feedback-button-3" variant="outline" onClick={action.onAction}>{action.label}</Button>}
  </AlertDescription></Alert>
}
