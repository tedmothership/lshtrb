# LUSHTURBATE - Live Webcam Platform

A modern, responsive web application for discovering live webcam performers, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Live Performer Discovery**: Browse thousands of live webcam models
- **Advanced Filtering**: Filter by gender, tags, region, and HD quality
- **Real-time Search**: Search performers by username, tags, or description
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Complete SEO implementation with structured data
- **Performance Focused**: Fast loading with optimized images and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Database**: Supabase
- **SEO**: React Helmet Async
- **Deployment**: VPS with Coolify

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lshtrb.git
cd lshtrb
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

### VPS with Coolify

The application is configured for deployment on a VPS using Coolify:

1. **Push to GitHub**: All changes pushed to the main branch will trigger automatic deployment
2. **Coolify Configuration**: 
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables configured in Coolify dashboard

### Development Workflow

1. **Local Development**: 
   ```bash
   npm run dev
   ```

2. **Build for Production**:
   ```bash
   npm run build
   ```

3. **Preview Production Build**:
   ```bash
   npm run preview
   ```

4. **Deploy**: Push to main branch for automatic deployment via Coolify

## 🔧 Configuration

### Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Supabase Setup

1. Create a new Supabase project
2. Run the migration in `supabase/migrations/`
3. Configure Row Level Security policies
4. Add your credentials to environment variables

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🎨 Key Components

- **CamGrid**: Displays performer cards in a responsive grid
- **CamCard**: Individual performer card with details
- **FilterPanel**: Advanced filtering interface
- **Header**: Navigation with search functionality
- **HeroBanner**: Landing page hero section

## 🔍 SEO Features

- Complete meta tags implementation
- Structured data (Schema.org)
- XML sitemap generation
- Robots.txt configuration
- Open Graph and Twitter Cards
- Canonical URLs

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive Web App ready

## 🚦 Performance

- Lazy loading for images
- Code splitting
- Optimized bundle size
- Fast loading times
- Efficient API calls

## 🔄 Development Workflow with Coolify

### Making Changes

1. **Work locally**: Make changes and test with `npm run dev`
2. **Commit changes**: 
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
3. **Push to GitHub**: 
   ```bash
   git push origin main
   ```
4. **Automatic deployment**: Coolify will automatically detect the push and deploy

### Monitoring

- Check Coolify dashboard for deployment status
- Monitor application logs through Coolify interface
- Use Coolify's built-in monitoring tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using React and TypeScript
Deployed on VPS with Coolify