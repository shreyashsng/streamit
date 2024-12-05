'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button" // Import ShadCN UI components
import { Input } from "@/components/ui/input" // Import ShadCN UI components

export default function Home() {
  const [tmdbId, setTmdbId] = useState('');
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tmdbId.trim()) {
      setError('Please enter a valid TMDB ID.');
      return;
    }

    try {
      const response = await fetch(`/api/embed?id=${tmdbId}`);
      const data = await response.json();

      if (data.embedUrl) {
        setEmbedUrl(data.embedUrl);
        setError(null);  // Clear previous errors
      } else {
        setError('Failed to load embed URL');
      }
    } catch (err) {
      setError('An error occurred while fetching the embed player.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-4">
      <h1 className="text-4xl font-bold text-zinc-50 mb-6">streamit.</h1>

      <form onSubmit={handleSearch} className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Input
            value={tmdbId}
            onChange={(e) => setTmdbId(e.target.value)}
            placeholder="Enter TMDB ID"
            className="w-72 p-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="w-72 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded mt-4"
          >
            Generate Embed Player
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-4">
            {error}
          </div>
        )}
      </form>

      {embedUrl && (
        <div className="mt-10 w-full max-w-4xl">
          <iframe
            src={embedUrl}
            className="w-full h-96 border-2 border-zinc-700 rounded"
            allowFullScreen
          />
        </div>
      )}
      
    </div>
  );
}


