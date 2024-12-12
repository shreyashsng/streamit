'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Input } from "@/components/ui/input"; // ShadCN UI Input
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

// Replace with your OMDb API key
const OMDB_API_KEY =  process.env.NEXT_PUBLIC_OMDB_API_KEY;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');  // Movie search query
  const [movies, setMovies] = useState([]);  // Store movie search results
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);  // Store the embed URL
  const [error, setError] = useState<string | null>(null);  // Error state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog open/close state

  // Function to search for movies using OMDb API
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a valid search term.');
      return;
    }

    try {
      // Fetch movie search results from OMDb API
      const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);  // Store the search results
        setError(null);  // Clear any previous errors
        setDialogOpen(true);  // Open the dialog when results are fetched
      } else {
        setMovies([]);
        setError('No movies found.');
      }
    } catch (error) {
      setError('An error occurred while fetching movie data.');
    }
  };

  // Function to handle movie selection and set the embed player
  const handleMovieSelect = (imdbId: string) => {
    setEmbedUrl(`https://flicky.host/embed/movie/?id=${imdbId}`);
    setDialogOpen(false);  // Close the dialog once a movie is selected
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-6">streamit.</h1>

      <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie"
          className="w-72"
        />
        <Button type="submit" className="w-72">
          Search
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Embed Player */}
      {embedUrl && (
        <div className="mt-6 w-full max-w-4xl">
          <iframe
            src={embedUrl}
            className="w-full h-96 border-2 border-zinc-700 rounded"
            allowFullScreen
          />
        </div>
      )}

      {/* Movie Search Results Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6">Open Search Results</Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {movies.map((movie: any) => (
              <div
                key={movie.imdbID}
                onClick={() => handleMovieSelect(movie.imdbID)}
                className="cursor-pointer text-blue-500 hover:text-blue-300"
              >
                {movie.Title}
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
