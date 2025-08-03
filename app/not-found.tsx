import { Metadata } from "next";
import { Home, Search, Film, Tv } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found - Rise of coding",
  description:
    "The page you are looking for does not exist. Find amazing movies and TV shows on our platform.",
};

export default function NotFound() {
  const quickLinks = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      description: "Back to homepage",
    },
    {
      label: "Movies",
      href: "/movies",
      icon: Film,
      description: "Browse movies",
    },
    {
      label: "TV Series",
      href: "/tv-series",
      icon: Tv,
      description: "Explore TV shows",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {/* 404 Number */}
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>

          {/* Main Message */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h2>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, we've got plenty of amazing movies and TV shows waiting for
            you!
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {quickLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <link.icon className="w-8 h-8 mb-3 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {link.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-400 mr-3" />
              <h3 className="text-xl font-semibold">
                Can't find what you're looking for?
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Try using the search bar in the header to find movies, TV shows,
              or actors.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
