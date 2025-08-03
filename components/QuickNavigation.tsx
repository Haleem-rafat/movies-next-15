"use client";

import { motion } from "framer-motion";
import {
  Film,
  Tv,
  Search,
  TrendingUp,
  Star,
  Calendar,
  Heart,
  Bookmark,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "Movies",
    description: "Explore the latest movies",
    href: "/movies",
    icon: Film,
    color: "from-red-500 to-red-600",
    hoverColor: "from-red-600 to-red-700",
  },
  {
    title: "TV Series",
    description: "Discover amazing TV shows",
    href: "/tv-series",
    icon: Tv,
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
  },
  {
    title: "Trending",
    description: "What's popular right now",
    href: "/movies/category/trending",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
  },
  {
    title: "Top Rated",
    description: "Highest rated content",
    href: "/movies/category/top-rated",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
    hoverColor: "from-yellow-600 to-yellow-700",
  },
  {
    title: "Upcoming",
    description: "Coming soon to theaters",
    href: "/movies/category/upcoming",
    icon: Calendar,
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
  },
  {
    title: "Search",
    description: "Find your favorite content",
    href: "/search",
    icon: Search,
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
  },
];

export default function QuickNavigation() {
  return (
    <section className="py-16 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quick Navigation
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Jump to your favorite sections and discover new content quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Link href={link.href}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${link.color} group-hover:bg-gradient-to-r ${link.hoverColor} transition-all duration-300`}
                    >
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors duration-300">
                        {link.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-r from-red-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-purple-600">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Personalized Recommendations
              </h3>
            </div>
            <p className="text-gray-300">
              Get movie and TV show recommendations based on your preferences
              and watch history.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-gradient-to-r from-purple-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Watchlist</h3>
            </div>
            <p className="text-gray-300">
              Save your favorite movies and TV shows to watch later with our
              watchlist feature.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
