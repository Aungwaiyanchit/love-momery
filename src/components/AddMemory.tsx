"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { createMemory } from "@/app/actions";

export default function AddMemory() {
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: "", description: "", date: "" });

  const handleSaveMemory = async () => {
    if (!newMemory.title || !newMemory.date) return;
    
    setIsSaving(true);
    const formData = new FormData();
    formData.append('title', newMemory.title);
    formData.append('date', newMemory.date);
    formData.append('description', newMemory.description);

    const result = await createMemory(formData);
    
    if (result.success) {
        setIsAdding(false);
        setNewMemory({ title: "", description: "", date: "" });
    } else {
        alert('Failed to save memory: ' + result.error);
    }
    setIsSaving(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-pink-800">Our Memories</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-colors font-medium shadow-sm hover:shadow"
        >
          <Plus size={18} />
          <span>Add Memory</span>
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-pink-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-pink-700">New Memory</h3>
                <button onClick={() => setIsAdding(false)} className="text-pink-400 hover:text-pink-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={newMemory.title}
                    onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50"
                    placeholder="First Date..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-600 mb-1">Date</label>
                  <input
                    type="date"
                    value={newMemory.date}
                    onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-600 mb-1">Description</label>
                  <textarea
                    value={newMemory.description}
                    onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50 min-h-[100px]"
                    placeholder="We went to..."
                  />
                </div>
                <button
                  onClick={handleSaveMemory}
                  disabled={isSaving}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Memory"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
