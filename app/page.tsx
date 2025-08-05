import { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import QuickNavigation from "@/components/QuickNavigation";
import TrendingMovies from "@/components/TrendingMovies";
import PopularTVSeries from "@/components/PopularTVSeries";

export const metadata: Metadata = {
  title: "MovieHub - Discover Amazing Movies & TV Series",
  description:
    "Explore the latest movies, trending TV series, and discover new favorites. Your ultimate destination for entertainment.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Navigation */}
      <QuickNavigation />

      {/* Trending Movies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trending Movies
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover the most popular movies that everyone is talking about
              this week.
            </p>
          </div>
          <TrendingMovies />
        </div>
      </section>

      {/* Popular TV Series */}
      <section className="py-16 bg-gray-800/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular TV Series
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Binge-worthy TV series that are capturing audiences worldwide.
            </p>
          </div>
          <PopularTVSeries />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-red-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover More?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Explore our vast collection of movies and TV series. From
              blockbusters to hidden gems, there&apos;s something for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/movies"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse Movies
              </Link>
              <Link
                href="/tv-series"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Explore TV Series
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
