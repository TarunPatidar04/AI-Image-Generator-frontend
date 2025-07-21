// components/Gallery.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Gallery() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/image`);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images", err);
      toast.error("Failed to load gallery");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      toast.success("Image deleted");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!images.length) return null;

  return (
    <section className="mt-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-300 mb-8 text-center">
        🖼️ Your Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white/5 border border-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg transition hover:shadow-xl"
          >
            <img
              src={img.imageUrl}
              alt={img.prompt}
              className="w-full h-64 object-cover rounded-lg mb-3 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-white/80 text-sm mb-3 ">{img.prompt}</p>
            <div className="flex justify-between items-center text-xs">
              <a
                href={img.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                🔍 View
              </a>
              <button
                onClick={() => handleDelete(img._id)}
                className="text-red-500 hover:underline"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
