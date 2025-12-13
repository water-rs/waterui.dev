import { useState } from 'react'

export default function QuickStart() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const commands = [
    {
      id: 'install',
      step: '1. Install the CLI',
      command: 'cargo install waterui-cli'
    },
    {
      id: 'create',
      step: '2. Create Playground',
      command: 'water create --playground --name demo'
    },
    {
      id: 'run',
      step: '3. Run and Experiment',
      command: 'water run'
    }
  ]

  return (
    <section id="playground" className="max-w-7xl mx-auto py-20 px-6">
      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Instructions */}
        <div className="w-full md:w-1/3">
          <h2 className="text-5xl font-black mb-8 relative inline-block">
            QUICK<br />START
            <div className="absolute -bottom-2 left-0 w-20 h-4 bg-[#F1A814] -z-10" />
          </h2>
          <p className="text-lg mb-6">
            Skip the complex setup. Use Playground Mode to start coding immediately.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-xl rounded-full">
                1
              </div>
              <span className="font-bold">Install CLI</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1E488F] text-white flex items-center justify-center font-bold text-xl rounded-full">
                2
              </div>
              <span className="font-bold">Create Playground</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D22730] text-white flex items-center justify-center font-bold text-xl rounded-full">
                3
              </div>
              <span className="font-bold">Run & Hot Reload</span>
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="w-full md:w-2/3">
          <div className="bg-black text-white p-2 border-4 border-black rounded-t-lg flex justify-between items-center">
            <span className="font-mono text-sm ml-2">terminal — water-ui</span>
            <div className="flex gap-2 mr-2">
              <div className="w-3 h-3 bg-white rounded-full" />
              <div className="w-3 h-3 bg-white rounded-full opacity-50" />
            </div>
          </div>
          <div className="bg-[#111111] p-8 border-x-4 border-b-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-sm md:text-base">
            {commands.map((cmd) => (
              <div key={cmd.id} className="mb-6 group relative">
                <p className="text-gray-400 mb-2"># {cmd.step}</p>
                <div className="flex justify-between items-center bg-gray-900 p-4 rounded border border-gray-700">
                  <code className="text-[#F1A814]">$ {cmd.command}</code>
                  <button
                    onClick={() => copyToClipboard(cmd.command, cmd.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy"
                    aria-label="Copy to clipboard"
                  >
                    {copiedId === cmd.id ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
