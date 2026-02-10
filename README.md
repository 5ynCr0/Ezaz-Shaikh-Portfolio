# 🎮 Persona 5-Themed Game Designer Portfolio

A bold, stylized portfolio website inspired by **Persona 5's** iconic UI design. Built for game designers who want their work to stand out with aggressive typography, dramatic angles, and high-contrast visuals.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-pink?style=flat-square&logo=framer)

---

## ✨ Features

- **Persona 5 Aesthetic** — Skewed panels, aggressive typography, high-contrast crimson/black/cream palette
- **Fully Responsive** — Optimized for mobile, tablet, laptop, and desktop
- **Animated Transitions** — Smooth page and element animations using Framer Motion
- **Game Showcase** — Display games with trailers, screenshots, key decisions, and store links
- **Game Design Documents** — Dedicated section for showcasing GDDs with PDF previews
- **Game Breakdowns** — Analytical deep-dives into game mechanics and design

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/StormSplits/Persona-Themed-Portfolio.git

# Navigate to the project
cd Persona-Themed-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be running at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (Hero, About, Skills, Contact)
│   ├── layout.tsx         # Root layout with Navigation & Footer
│   ├── games/             # Released games showcase
│   │   └── page.tsx       # Games grid + detail modal
│   ├── gdd/               # Game Design Documents
│   │   └── page.tsx       # GDD library with previews
│   └── breakdowns/        # Game analysis articles
│       └── page.tsx       # Breakdown cards with tags
│
├── components/            # Reusable UI components
│   ├── Button.tsx         # Persona-styled buttons (primary, outline, ghost)
│   ├── Footer.tsx         # Site footer
│   ├── GameCard.tsx       # Game thumbnail card with hover effects
│   ├── Hero.tsx           # Landing hero section
│   ├── Navigation.tsx     # Slide-out menu with active states
│   ├── PageTransition.tsx # Page transition wrapper
│   └── SlantedPanel.tsx   # Skewed panel component
│
├── lib/                   # Utilities and helpers
│   └── animations.ts      # Framer Motion variants
│
└── styles/               # Global styles
    └── globals.css       # Tailwind + custom Persona styles
```

### Key Files

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Color palette, fonts, custom utilities |
| `globals.css` | Base styles, component classes, animations |
| `lib/animations.ts` | Reusable Framer Motion animation variants |

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Crimson** | `#E73A3A` | Primary accent, CTAs, highlights |
| **Ink** | `#0D0D0D` | Background, text on light surfaces |
| **Ink Light** | `#1A1A1A` | Cards, elevated surfaces |
| **Cream** | `#FAF7F0` | Text on dark surfaces, panels |
| **Electric** | `#00D4FF` | Secondary accent (optional) |

### Typography

- **Display Font**: `Bebas Neue` — Used for headings, navigation, buttons
- **Body Font**: `Inter` — Used for paragraphs, descriptions

### Core Visual Elements

1. **Skewed Panels** — 6° skew angle creates dynamic, aggressive feel
2. **Brutal Shadows** — Solid offset shadows (no blur) for depth
3. **High Contrast** — Crimson on black, cream on crimson
4. **Diagonal Decorations** — Background lines, section dividers

### Responsive Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| `sm` | 640px | Mobile landscape, small tablets |
| `md` | 768px | Tablets (iPad Mini) |
| `lg` | 1024px | Tablets (iPad Pro), laptops |
| `xl` | 1280px | Desktop, large laptops |
| `2xl` | 1536px | Large desktop |

---

## 🎯 Design Approach & Philosophy

### The Persona 5 Influence

Persona 5's UI is universally praised for breaking every conventional design rule—and making it work. This portfolio channels that same rebellious energy:

> "Design should evoke emotion. A portfolio isn't just a list of projects—it's an experience."

### Core Design Principles

#### 1. **Controlled Chaos**
Every element that looks "off" is intentional. The 6° skew, the aggressive red accents, the oversized typography—they create tension that demands attention. But chaos without structure is just noise. Every chaotic element is balanced by whitespace and consistent spacing.

#### 2. **Motion as Communication**
Animations aren't decorative—they guide the eye. The staggered fade-up on page load creates a reading hierarchy. The menu slide-in transitions focus. Every motion tells the user where to look next.

#### 3. **Contrast is King**
High contrast isn't just an aesthetic choice—it's accessibility. The crimson-on-black and cream-on-crimson combinations exceed WCAG AA standards while maintaining the bold visual style.

#### 4. **Typography Hierarchy**
Display fonts (Bebas Neue) create impact. Body fonts (Inter) ensure readability. The font pairing creates a clear visual hierarchy: headlines grab attention, body text delivers information.

#### 5. **Progressive Disclosure**
Information is revealed in layers. Cards show essential info; modals reveal depth. This respects the user's cognitive load while rewarding curiosity with detailed content.

### UX Decisions

| Decision | Rationale |
|----------|-----------|
| Slide-out navigation | Maximizes content space; creates focused navigation experience |
| Game detail modals | Keeps user in context; allows deep exploration without page load |
| YouTube embeds over video files | Reduces bandwidth; leverages familiar player controls |
| Store links in modals | Provides immediate CTA when user interest is highest |
| Hidden card numbers on mobile | Prevents layout breakage; numbers return on desktop where space allows |

---

## ⚙️ Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  crimson: {
    DEFAULT: '#E73A3A',
    light: '#FF5252',
    dark: '#C62828',
  },
  ink: {
    DEFAULT: '#0D0D0D',
    light: '#1A1A1A',
  },
  cream: '#FAF7F0',
}
```

### Adding New Games

In `src/app/games/page.tsx`, add to the `games` array:

```typescript
{
  id: 4,
  title: "Your Game Title",
  platform: "PC / Mobile",
  role: "Game Designer",
  studio: "Your Studio",
  year: "2025",
  description: "Game description...",
  tags: ["Systems Design", "UX"],
  youtubeId: "YOUTUBE_VIDEO_ID", // or null
  storeUrl: "https://store.example.com/your-game", // or null
  tools: ["Unity", "Figma"],
  keyDecisions: [
    {
      decision: "Decision Title",
      tradeoff: "Why you made this decision..."
    }
  ],
  screenshots: [
    {
      image: "/Screenshots/YourGame/screenshot1.webp",
      caption: "Screenshot description"
    }
  ]
}
```

### Adding Game Breakdowns

In `src/app/breakdowns/page.tsx`, add to the `breakdowns` array:

```typescript
{
  id: 2,
  title: "Your Breakdown Title",
  game: "Game Name",
  type: "ANALYSIS",
  excerpt: "Brief description...",
  sections: ["Gameplay", "Core Loop", "Monetization"],
  slug: "your-breakdown-slug"
}
```

### Modifying Animations

Edit `src/lib/animations.ts`:

```typescript
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **next/image** | Optimized image loading |

---

## 📱 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for your own portfolio!

```
MIT License

Copyright (c) 2025 Ezaz Shaikh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Credits

- **Design Inspiration**: Atlus — Persona 5 UI Design Team
- **Fonts**: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue), [Inter](https://fonts.google.com/specimen/Inter)
- **Icons**: Custom inline SVGs

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  <strong>Built with 🎮 by <a href="https://github.com/StormSplits">Ezaz Shaikh</a></strong>
</p>
