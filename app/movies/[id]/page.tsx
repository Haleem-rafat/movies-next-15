import { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetails from "@/components/MovieDetails";

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Movie Details - Rise of coding`,
      description: `Watch movie details, cast, reviews, and more information.`,
    };
  } catch (error) {
    return {
      title: "Movie Not Found - Rise of coding",
      description: "The requested movie could not be found.",
    };
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = await params;

  if (!movieId || isNaN(Number(movieId))) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <MovieDetails movieId={movieId} />
      </div>
    </div>
  );
}
