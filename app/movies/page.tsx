import { Metadata } from "next";
import MoviesList from "@/components/MoviesList";

export const metadata: Metadata = {
  title: "Movies - Rise of coding",
  description:
    "Discover and explore the latest movies, trending films, and cinematic masterpieces.",
};

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Movies
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the latest blockbusters, timeless classics, and hidden gems
            from around the world.
          </p>
        </div>

        <MoviesList />
      </div>
    </div>
  );
}
