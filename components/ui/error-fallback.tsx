"use client"

export const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-lg">
    <h3 className="mb-2 text-lg font-semibold text-red-300">Component Error</h3>
    <p className="text-sm text-red-200/80">{error.message}</p>
    <button
      className="mt-3 text-sm text-red-200 hover:text-red-100"
      onClick={() => location.reload()}
    >
      Try Again →
    </button>
  </div>
)
