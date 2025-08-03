import MovieDetails from "@/components/MovieDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  try {
    // Fetch movie data to generate dynamic metadata
    const movieId = params.id;

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

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = params.id;

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
