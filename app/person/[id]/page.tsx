import { Metadata } from "next";
import { notFound } from "next/navigation";
import PersonDetails from "@/components/PersonDetails";

interface PersonPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PersonPageProps): Promise<Metadata> {
  const personId = params.id;

  return {
    title: `Actor Details - Rise of coding`,
    description: `Explore actor filmography, biography, and career highlights.`,
  };
}

export default function PersonPage({ params }: PersonPageProps) {
  const personId = params.id;

  // Validate person ID
  if (!personId || isNaN(Number(personId))) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <PersonDetails personId={personId} />
      </div>
    </div>
  );
}
