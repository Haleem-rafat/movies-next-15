# 🎬 MovieHub - Next.js Movie & TV Series Application

A modern, responsive movie and TV series discovery application built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Discover trending movies, TV shows, search content, and explore detailed information about your favorite entertainment.

![MovieHub](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-black?style=for-the-badge)

## ✨ Features

### 🎯 Core Features
- **🎬 Movie Discovery**: Browse trending, popular, top-rated, and upcoming movies
- **📺 TV Series**: Explore TV shows with detailed information
- **🔍 Advanced Search**: Search across movies, TV shows, and people
- **👤 Person Details**: View actor/crew information and filmography
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile
- **⚡ Real-time Search**: Instant search suggestions with debouncing

### 🎨 UI/UX Features
- **🌙 Dark Theme**: Modern dark theme with glassmorphism effects
- **🎭 Smooth Animations**: Framer Motion powered animations
- **🎨 Gradient Design**: Beautiful gradients and visual effects
- **📱 Mobile-First**: Touch-optimized mobile experience
- **♿ Accessibility**: WCAG compliant design

### 🚀 Performance Features
- **⚡ SWR Caching**: Intelligent data caching and revalidation
- **🖼️ Image Optimization**: Next.js Image component optimization
- **📦 Code Splitting**: Automatic code splitting for better performance
- **🔍 SEO Optimized**: Meta tags and dynamic SEO

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **SWR**: Data fetching and caching

### Backend & API
- **Next.js API Routes**: Server-side API endpoints
- **TMDB API**: Movie and TV data source
- **Axios**: HTTP client for external API calls

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDB API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movies-next-15.git
   cd movies-next-15
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Get TMDB API Key**
   - Visit [TMDB](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Copy your API key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
movies-next-15/
├── app/
│   ├── api/                    # API routes
│   │   ├── movies/            # Movie endpoints
│   │   ├── tv/                # TV series endpoints
│   │   ├── person/            # Person endpoints
│   │   ├── search/            # Search endpoint
│   │   ├── service/           # API services
│   │   └── types/             # TypeScript types
│   ├── movies/                # Movie pages
│   ├── tv-series/             # TV series pages
│   ├── person/                # Person pages
│   ├── search/                # Search pages
│   ├── hooks/                 # Custom hooks
│   ├── constants/             # App constants
│   ├── providers/             # Context providers
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── not-found.tsx          # 404 page
├── components/                # React components
│   ├── Header.tsx             # Navigation header
│   ├── HeroSection.tsx        # Hero carousel
│   ├── TrendingMovies.tsx     # Trending movies
│   ├── PopularTVSeries.tsx    # Popular TV series
│   ├── QuickNavigation.tsx    # Quick nav links
│   ├── MovieDetails.tsx       # Movie details
│   ├── TVSeriesDetails.tsx    # TV series details
│   ├── PersonDetails.tsx      # Person details
│   ├── SearchResults.tsx      # Search results
│   ├── MoviesList.tsx         # Movies grid
│   ├── MoviesByCategory.tsx   # Category movies
│   └── SeasonDetails.tsx      # Season details
├── config/                    # Configuration files
│   └── env.ts                 # Environment config
├── public/                    # Static assets
└── README.md                  # This file
```

## 🎯 API Endpoints

### Movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/top-rated` - Get top-rated movies
- `GET /api/movies/upcoming` - Get upcoming movies
- `GET /api/movies/[id]` - Get movie details

### TV Series
- `GET /api/tv/[id]` - Get TV series details

### People
- `GET /api/person/[id]` - Get person details

### Search
- `GET /api/search?q=query` - Search movies, TV shows, and people

## 🎨 Components

### Core Components

#### Header
- **Navigation**: Dropdown menus for Movies and TV Series
- **Search**: Real-time search with suggestions
- **Responsive**: Mobile-optimized menu
- **Animations**: Smooth transitions and hover effects

#### HeroSection
- **Auto-rotating**: Automatic carousel with trending content
- **Interactive**: Navigation arrows and indicators
- **Responsive**: Adapts to different screen sizes

#### TrendingMovies
- **Horizontal Scroll**: Smooth scrolling movie list
- **SWR Integration**: Efficient data fetching and caching
- **Interactive**: Hover effects and action buttons

### Detail Components

#### MovieDetails
- **Comprehensive Info**: Cast, crew, videos, images
- **Tabbed Interface**: Overview, cast, reviews sections
- **Related Content**: Similar movies and recommendations

#### TVSeriesDetails
- **Season Navigation**: Browse different seasons
- **Episode Details**: Episode information and cast
- **Show Information**: Complete series details

## 🎣 Custom Hooks

### Data Fetching Hooks
- `useSearchSuggestions(query)` - Search suggestions
- `usePopularMovies(page)` - Popular movies
- `useTopRatedMovies(page)` - Top-rated movies
- `useTrending(mediaType, timeWindow)` - Trending content
- `useMovieDetails(movieId)` - Movie details
- `useTVDetails(tvId)` - TV series details
- `usePersonDetails(personId)` - Person details

### Features
- **SWR Integration**: Automatic caching and revalidation
- **Error Handling**: Graceful error states
- **Loading States**: Loading indicators
- **Type Safety**: Full TypeScript support

## 🎨 Styling

### Design System
- **Color Palette**: Dark theme with accent colors
- **Typography**: Consistent font hierarchy
- **Spacing**: 4px grid system
- **Components**: Reusable component patterns

### Tailwind Classes
- **Responsive**: Mobile-first responsive design
- **Custom Utilities**: Extended utility classes
- **Dark Mode**: Built-in dark theme support

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Similar to Vercel deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NODE_ENV=development
```

### API Configuration
The app uses TMDB API for movie and TV data. Configure the API key in your environment variables.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile Menu**: Collapsible navigation
- **Touch Optimized**: Large touch targets
- **Adaptive Layout**: Flexible grid systems

## 🎭 Animations

### Framer Motion
- **Page Transitions**: Smooth page navigation
- **Component Animations**: Hover and interaction effects
- **Loading States**: Animated loading indicators

### Performance
- **Optimized**: 60fps animations
- **Reduced Motion**: Respects user preferences
- **Efficient**: Minimal performance impact

## 🔍 Search Features

### Real-time Search
- **Debounced Input**: Prevents excessive API calls
- **Instant Results**: Live search suggestions
- **Multi-type Search**: Movies, TV shows, and people

### Search Results
- **Rich Preview**: Movie posters and details
- **Quick Actions**: View, favorite, share buttons
- **Filtering**: Media type and year filters

## 🎯 Performance

### Optimization Techniques
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **SWR Caching**: Intelligent data caching
- **Bundle Analysis**: Optimized bundle sizes

### Metrics
- **Lighthouse Score**: 90+ performance score
- **Core Web Vitals**: Optimized for all metrics
- **SEO Score**: 100/100 SEO optimization

## 🐛 Troubleshooting

### Common Issues

#### API Key Issues
```bash
# Check if API key is set
echo $NEXT_PUBLIC_TMDB_API_KEY

# Verify in .env.local
NEXT_PUBLIC_TMDB_API_KEY=your_key_here
```

#### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript
npm run type-check

# Fix auto-fixable issues
npm run lint -- --fix
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- **TypeScript**: Strict type checking
- **ESLint**: Code linting rules
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB**: For providing the movie and TV data API
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For the animation library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/movies-next-15/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/movies-next-15/discussions)
- **Email**: your.email@example.com

## 🔄 Changelog

### v1.0.0 (Current)
- ✨ Initial release
- 🎬 Movie and TV series browsing
- 🔍 Advanced search functionality
- 📱 Responsive design
- ⚡ SWR integration
- 🎨 Modern UI with animations

---

**Made with ❤️ by [Your Name]**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/movies-next-15?style=social)](https://github.com/yourusername/movies-next-15)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/movies-next-15?style=social)](https://github.com/yourusername/movies-next-15)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/movies-next-15)](https://github.com/yourusername/movies-next-15/issues)
