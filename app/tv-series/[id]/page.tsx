import { Metadata } from "next";
import { notFound } from "next/navigation";
import TVSeriesDetails from "@/components/TVSeriesDetails";

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `TV Series Details - Rise of coding`,
      description: `Watch TV series details, cast, episodes, reviews, and more information.`,
    };
  } catch (error) {
    return {
      title: "TV Series Not Found - Rise of coding",
      description: "The requested TV series could not be found.",
    };
  }
}

export default async function TVSeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: seriesId } = await params;

  if (!seriesId || isNaN(Number(seriesId))) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <TVSeriesDetails seriesId={seriesId} />
      </div>
    </div>
  );
}
