// app/page.js
"use client";

import { useState } from "react";
import axios from "axios";
import Gallery from "@/component/Gallery";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/image/generate`, {
        prompt,
      });
      setImage(res.data.imageUrl);
      setPrompt("");
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-green-400 tracking-tight">
          🎨 AI Image Generator
        </h1>

        <form
          onSubmit={handleGenerate}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image idea..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold transition-all"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {image && (
          <div className="mt-10 text-left">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Generated Image
            </h3>
            <img
              src={image}
              alt="Generated"
              className="rounded-lg border border-white/20 w-full max-w-md mx-auto"
            />
            <a
              href={image}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-400 hover:underline mt-3 text-center"
            >
              ⬇️ Download Image
            </a>
          </div>
        )}
      </div>

      <Gallery />
    </main>
  );
}
