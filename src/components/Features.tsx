import type { ReactNode } from 'react'
import {
  Activity,
  AppWindow,
  AudioLines,
  Bell,
  Bluetooth,
  CalendarDays,
  Camera,
  Clapperboard,
  Clipboard,
  Contact,
  Cpu,
  Fingerprint,
  FolderOpen,
  HeartPulse,
  KeyRound,
  Link,
  Lock,
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  Nfc,
  Shapes,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  Timer,
  Type,
  Vibrate,
  Video,
  Volume2,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Code from './Code'
import { lineOf } from './snippet'
import { Frame, Heading } from './ui'
import testingSnippet from '../snippets/testing.rs?raw'
import { stringList } from '../i18n'

const icon = (Icon: LucideIcon, size: number) => <Icon size={size} strokeWidth={1.75} aria-hidden />

const groups: { id: string; icon: ReactNode }[] = [
  { id: 'layout', icon: icon(Type, 21) },
  { id: 'controls', icon: icon(SlidersHorizontal, 21) },
  { id: 'navigation', icon: icon(AppWindow, 21) },
  { id: 'graphics', icon: icon(Shapes, 21) },
  { id: 'media', icon: icon(Clapperboard, 21) },
  { id: 'icons', icon: icon(Smile, 21) },
]

/** WaterKit's capabilities, each with its icon; the names come from the locale under the same keys. */
const kit: { id: string; icon: ReactNode }[] = [
  { id: 'camera', icon: icon(Camera, 22) },
  { id: 'location', icon: icon(MapPin, 22) },
  { id: 'notifications', icon: icon(Bell, 22) },
  { id: 'permissions', icon: icon(ShieldCheck, 22) },
  { id: 'biometrics', icon: icon(Fingerprint, 22) },
  { id: 'passkeys', icon: icon(KeyRound, 22) },
  { id: 'bluetooth', icon: icon(Bluetooth, 22) },
  { id: 'nfc', icon: icon(Nfc, 22) },
  { id: 'haptics', icon: icon(Vibrate, 22) },
  { id: 'clipboard', icon: icon(Clipboard, 22) },
  { id: 'contacts', icon: icon(Contact, 22) },
  { id: 'calendar', icon: icon(CalendarDays, 22) },
  { id: 'health', icon: icon(HeartPulse, 22) },
  { id: 'sensors', icon: icon(Activity, 22) },
  { id: 'secureStorage', icon: icon(Lock, 22) },
  { id: 'share', icon: icon(Share2, 22) },
  { id: 'speech', icon: icon(AudioLines, 22) },
  { id: 'deepLinks', icon: icon(Link, 22) },
  { id: 'dialogs', icon: icon(MessageSquare, 22) },
  { id: 'fileSystem', icon: icon(FolderOpen, 22) },
  { id: 'audio', icon: icon(Volume2, 22) },
  { id: 'video', icon: icon(Video, 22) },
  { id: 'screen', icon: icon(MonitorSmartphone, 22) },
  { id: 'backgroundTasks', icon: icon(Timer, 22) },
  { id: 'systemInfo', icon: icon(Cpu, 22) },
]

export default function Features() {
  const { t } = useTranslation()
  const testingNotes = [
    { line: lineOf(testingSnippet, 'ui.mount'), text: t('features.testing.notes.mount') },
    { line: lineOf(testingSnippet, 'app.query()'), text: t('features.testing.notes.query') },
    { line: lineOf(testingSnippet, 'assert_eq!'), text: t('features.testing.notes.assert') },
  ]

  return (
    <section id="features" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading label={t('features.label')} title={t('features.title')} lead={t('features.lead')} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {groups.map((group) => (
            <li key={group.id} className="rounded-2xl border border-rule bg-raised p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-guide-soft text-guide">{group.icon}</span>
                <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{t(`features.groups.${group.id}.title`)}</h3>
              </div>
              <ul className="mt-5 space-y-2 text-[16px] leading-snug text-ink-2">
                {stringList(t(`features.groups.${group.id}.items`, { returnObjects: true })).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="display text-[clamp(32px,3.4vw,48px)]">{t('features.kit.title')}</h3>
            <p className="mt-4 max-w-[38ch] text-[18px] leading-relaxed text-ink-2">{t('features.kit.lead')}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {kit.map((capability) => (
              <li key={capability.id} className="flex flex-col gap-3 rounded-xl border border-rule bg-raised p-4 transition-colors hover:border-guide hover:text-guide">
                {capability.icon}
                <span className="text-[15px] leading-tight font-medium">{t(`features.kit.items.${capability.id}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="display text-[clamp(32px,3.4vw,48px)]">{t('features.testing.title')}</h3>
            <p className="mt-4 max-w-[38ch] text-[18px] leading-relaxed text-ink-2">{t('features.testing.lead')}</p>
          </div>
          <figure className="lg:col-span-8">
            <Code code={testingSnippet} language="rust" title="tests/stepper.rs" notes={testingNotes} />
          </figure>
        </div>
      </Frame>
    </section>
  )
}
