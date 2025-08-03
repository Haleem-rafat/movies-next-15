import { Metadata } from "next";
import TVSeriesList from "@/components/TVSeriesList";

export const metadata: Metadata = {
  title: "TV Series - Rise of coding",
  description:
    "Discover and explore the latest TV series, trending shows, and binge-worthy content.",
};

export default function TVSeriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            TV Series
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the latest TV series, binge-worthy shows, and award-winning
            dramas from around the world.
          </p>
        </div>

        <TVSeriesList />
      </div>
    </div>
  );
}
