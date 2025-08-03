import { Metadata } from "next";
import SearchResults from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search Results - Rise of coding",
  description: "Search for movies, TV series, and actors.",
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    type?: string;
    page?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const type = searchParams.type || "all";
  const page = parseInt(searchParams.page || "1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Search Results
          </h1>
          {query && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Results for:{" "}
              <span className="text-white font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        <SearchResults query={query} type={type} page={page} />
      </div>
    </div>
  );
}
