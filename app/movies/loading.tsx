export default function MoviesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-700 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse max-w-2xl mx-auto"></div>
        </div>

        {/* Loading skeleton for movie grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-64 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
