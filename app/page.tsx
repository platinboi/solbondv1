import SplineWrapper from "@/components/spline-wrapper"
import FloatingDockWrapper from "@/components/floating-dock-wrapper"

export default function Home() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      {/* Website Title */}
      <div className="absolute w-full text-center z-10 pt-12 px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Convert Solana into
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"> IRL </span>
          spending power with
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text"> Solbond</span>
        </h1>
      </div>

      {/* Full-screen Spline Background */}
      <SplineWrapper />

      {/* Floating Dock */}
      <FloatingDockWrapper />
    </main>
  )
}

