# Rakan Clinic Global

A modern medical tourism website for Rakan Clinic Tokyo, featuring regenerative medicine treatments and international patient services.

## 🚀 Auto-Deploy Status
This project is configured for automatic deployment to Vercel on every push to the main branch.

## 🌟 Features

- **Multi-language Support**: English, Japanese, Arabic, Spanish, French, German, Russian, Chinese
- **International Contact Form**: Country code selection with Supabase integration
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Built with Next.js 15 and optimized for search engines

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Database**: Supabase
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/imaik129/rakan-clinic-global.git
cd rakan-clinic-global
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```
Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000)

## 📊 Database Setup

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed database configuration instructions.

## 🌍 Deployment

This project is automatically deployed to Vercel when you push to the main branch.

### Manual Deployment
1. Push to GitHub: `git push origin main`
2. Vercel automatically builds and deploys
3. Your site will be live at `https://rakan-clinic-global.vercel.app`

## 📁 Project Structure

```
rakan-global/
├── app/
│   ├── [locale]/           # Internationalized pages
│   └── api/                # API routes
├── components/             # React components
├── lib/                    # Utilities and configurations
├── messages/               # Translation files
└── public/                 # Static assets
```

## 🔧 Development

- **Add new translations**: Update files in `messages/` directory
- **Add new pages**: Create in `app/[locale]/` directory
- **Modify components**: Edit files in `components/` directory
- **Database changes**: Update Supabase schema and run migrations

## 📝 License

This project is proprietary software for Rakan Clinic Tokyo.

## 🤝 Contributing

This is a private project. For internal development, please follow the established patterns and ensure all changes are tested before deployment.

---

**Built with ❤️ for Rakan Clinic Tokyo**