import { Metadata } from "next";
import { notFound } from "next/navigation";
import SeasonDetails from "@/components/SeasonDetails";

interface SeasonPageProps {
  params: Promise<{
    id: string;
    seasonNumber: string;
  }>;
}

export async function generateMetadata({
  params,
}: SeasonPageProps): Promise<Metadata> {
  const { id: seriesId, seasonNumber } = await params;

  return {
    title: `Season ${seasonNumber} - Rise of coding`,
    description: `Watch Season ${seasonNumber} episodes, cast, and details.`,
  };
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { id: seriesId, seasonNumber } = await params;

  // Validate IDs
  if (
    !seriesId ||
    isNaN(Number(seriesId)) ||
    !seasonNumber ||
    isNaN(Number(seasonNumber))
  ) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Season {seasonNumber}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Watch all episodes from Season {seasonNumber} and explore the cast
            and crew.
          </p>
        </div>

        <SeasonDetails seriesId={seriesId} seasonNumber={seasonNumber} />
      </div>
    </div>
  );
}
