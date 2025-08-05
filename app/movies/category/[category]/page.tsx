import { Metadata } from "next";
import { notFound } from "next/navigation";
import MoviesByCategory from "@/components/MoviesByCategory";

interface CategoryPageProps {
  params: Promise<{
    category: string; 
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
  
  return {
    title: `${categoryTitle} Movies - Rise of coding`,
    description: `Discover ${categoryTitle.toLowerCase()} movies and films.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category
  const validCategories = ['trending', 'popular', 'top-rated', 'upcoming', 'now-playing'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Movies
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the best {category.replace('-', ' ')} movies and discover new favorites.
          </p>
        </div>
        
        <MoviesByCategory category={category} />
      </div>
    </div>
  );
} 