/**
 * WaterUI against other UI frameworks on memory, frame time and package size.
 *
 * No number here is measured yet: every row is a placeholder that sizes the
 * chart, and the page marks it as one. A row becomes `measured` only with a
 * value from the competitive benchmark harness and a link to the run that
 * produced it.
 */

export type Framework = 'waterui' | 'swiftui' | 'flutter' | 'react-native' | 'electron'

export const frameworks: Record<Framework, string> = {
  waterui: 'WaterUI',
  swiftui: 'SwiftUI',
  flutter: 'Flutter',
  'react-native': 'React Native',
  electron: 'Electron',
}

export type Row =
  | { framework: Framework; measured: true; value: number; source: string }
  | { framework: Framework; measured: false; placeholder: number }

export type Metric = {
  id: 'memory' | 'frame' | 'size'
  unit: string
  rows: readonly Row[]
}

const placeholder = (framework: Framework, value: number): Row => ({ framework, measured: false, placeholder: value })

export const metrics: readonly Metric[] = [
  {
    id: 'memory',
    unit: 'MB',
    rows: [placeholder('waterui', 40), placeholder('swiftui', 45), placeholder('flutter', 90), placeholder('react-native', 110), placeholder('electron', 220)],
  },
  {
    id: 'frame',
    unit: 'ms',
    rows: [placeholder('waterui', 4), placeholder('swiftui', 5), placeholder('flutter', 6), placeholder('react-native', 9), placeholder('electron', 11)],
  },
  {
    id: 'size',
    unit: 'MB',
    rows: [placeholder('waterui', 8), placeholder('swiftui', 4), placeholder('flutter', 20), placeholder('react-native', 25), placeholder('electron', 95)],
  },
]
