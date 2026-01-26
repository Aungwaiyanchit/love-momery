import Memories from "@/components/Memories";
import MiniGame from "@/components/MiniGame";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      <Hero />

      <div className="mt-24 w-full">
          <Memories />
      </div>

      <div className="mt-24 w-full mb-24">
          <MiniGame />
      </div>
    </main>
  );
}
