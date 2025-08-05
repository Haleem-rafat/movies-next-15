import { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetails from "@/components/MovieDetails";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  try {
    // Fetch movie data to generate dynamic metadata
    const { id: movieId } = await params;

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

export default async function MoviePage({ params }: MoviePageProps) {
  const { id: movieId } = await params;

  // Validate movie ID
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
