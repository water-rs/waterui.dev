import { createContext, useContext } from 'react'

export type Inspector = { on: boolean; toggle: () => void }

export const InspectorContext = createContext<Inspector | null>(null)

export function useInspector(): Inspector {
  const inspector = useContext(InspectorContext)
  if (inspector === null) {
    throw new Error('useInspector must be used inside <InspectorProvider>')
  }
  return inspector
}
