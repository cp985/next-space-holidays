# 🚀 Galactic Horizons - Space Travel Agency

Welcome to **Galactic Horizons**, a futuristic full-stack web application for a premier space travel agency operating within the Solar System. Book deep-space orbital jumps, manage your itineraries, and access your encrypted flight clearance records.

🌐 **Live Deployment:** [https://next-space-holidays.vercel.app/](https://next-space-holidays.vercel.app/)

---

## 🛠️ Tech Stack

This project leverages cutting-edge web technologies to deliver exceptional performance, bulletproof type safety, and an immersive sci-fi terminal interface:

- **Next.js 15 (App Router)** – React framework for Server-Side Rendering (SSR), intercepted routing, and optimized multi-page architecture.
- **React 19** – Component-driven frontend architecture utilizing the latest ecosystem hooks.
- **Supabase** – Backend-as-a-Service providing a secure PostgreSQL instance and dynamic Row Level Security (RLS).
- **Auth.js v5 (NextAuth)** – Secure server-side authentication integration for space-traveler clearance.
- **TypeScript** – Strictly-typed codebase preventing data layer and state runtime failures.
- **Tailwind CSS & shadcn/ui** – Utility-first structural styling paired with customizable accessible components wrapped in a utility `cn` merger.
- **Framer Motion** – Advanced spatial micro-interactions and smooth transitional animations.
- **Lucide React** – Clean, minimal iconography suited for sci-fi terminal operations.

---

## ✨ Features

- **Space Hero Cockpit**: A high-impact landing deck featuring custom interactive elements and definitive Call to Actions (CTA).
- **Planet Exploration Grid**: Interactive grid utilizing dynamic routing (`app/planets/[slug]`) mapping destinations across the Solar System with specific contextual layouts.
- **Quantum Checkout Form**: Server Action-powered multi-stage verification fields with instant zod-backed payload error logs.
- **Mission Manifest (Pilot's Logbook)**: Client-session synchronized order history page fetching specific historical data points securely from Supabase.
- **Sub-space Cart Engine**: Persistent contextual shopping system optimizing passenger seat allocation counters via Context API.
- **Intercepted Modal Routing**: Dynamic modal overlay execution allowing forms to render seamlessly over underlying planet structures.
- **Fading Testimonial Carousel**: Immersive micro-animated reviews from veteran cosmic voyagers.

---

## 🚀 Installation & Local Development

Follow these protocols to clone and initialize the local core infrastructure:

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/galactic-horizons.git](https://github.com/your-username/galactic-horizons.git)
cd galactic-horizons
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and map your authentication and database connection strings:
```env
NEXTAUTH_SECRET=your_auth_secret
AUTH_SUPABASE_URL=your_supabase_url
AUTH_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Core Flight Deck
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the local terminal launchpad.

---

## 📁 Project Structure

```plaintext
├── action/              # Server Actions for checkout authentication operations
├── app/                 # Next.js App Router structural nodes (planets, profiles, shop)
├── components/          # Reusable design primitives and atomic blocks (ui, shop)
├── context/             # Global Context providers (Cart Context state engine)
├── lib/                 # Core modular code configurations (cn utilities, database wrappers)
└── styles/              # Core styling properties and token overrides
```

---

## 🔮 Roadmap

- [x] Complete implementation of the travel booking form.
- [x] Seamless Server-Action state integration via Auth.js.
- [x] User dashboard to track purchased trips and itineraries.
- [ ] Real-time planetary cosmic conditions alerts on dashboard.
- [ ] Live multi-currency exchange matrix (Credits/USD/BTC).

---

## 📸 Acknowledgements & Credits

Special thanks to the talented creators on **Unsplash** and **Pixabay** for providing the atmospheric deep-space imagery:

- [BoliviaInteligente](https://unsplash.com/it/@boliviainteligente) · Planet Portals
- [JavierMiranda](https://unsplash.com/it/@nuvaproductions) · Nebula backdrops
- [MikePetrucci](https://unsplash.com/it/foto/fotografia-di-luna-piena-uIf6H1or1nE) · Satellite views
- [PlanetVolumes](https://unsplash.com/it/foto/un-pianeta-blu-con-uno-sfondo-nero-yTo1u-i1pVI) · Orbital macro vectors
- [MaryanDembitskyi](https://pixabay.com/) · System renderings
- [TheSpaceway](https://pixabay.com/) · High-altitude telemetry
- [WikiImages](https://pixabay.com/) · Historical imagery
- [AdisResic](https://pixabay.com/) · Technical blueprints