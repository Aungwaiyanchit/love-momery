import MemoryCard, { Memory } from "./MemoryCard";
import AddMemory from "./AddMemory";
import { getMemories } from "@/app/actions";

export default async function Memories() {
  const result = await getMemories();
  const memories: Memory[] = result.success && result.data ? result.data : [];

  return (
    <section id="memories" className="w-full max-w-4xl mx-auto py-12 px-4">
      <AddMemory />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {memories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-pink-300">
            <p className="text-lg">No memories yet. Add your first one!</p>
          </div>
        ) : (
          memories.map((memory, idx) => (
            <MemoryCard key={memory.id} memory={memory} idx={idx} />
          ))
        )}
      </div>
    </section>
  );
}
