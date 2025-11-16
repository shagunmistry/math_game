# Math Number Quest - Kid-Friendly Arithmetic Game

A super fun and educational math game designed specifically for kids aged 6-12! Built with Next.js, featuring bright colors, encouraging feedback, and production-ready SEO optimization.

## Game Features

### Kid-Friendly Design
- **Bright, Playful Colors**: Vibrant gradients and animations to keep kids engaged
- **Fun Font (Fredoka)**: Friendly, rounded letters that appeal to children
- **Big Buttons**: Easy to click for small fingers
- **Emojis Everywhere**: Visual cues that kids understand
- **Star Rewards**: Earn 1-3 stars based on performance
- **Encouraging Messages**: Positive feedback like "You're doing great!" and "Amazing effort!"

### Gameplay Features
- **Three Fun Difficulty Levels**:
  - Easy Peasy (10-40 range)
  - Super Fun (20-90 range)
  - Brain Power (50-200 range)
- **Real-time Feedback**: Visual arrows showing "Go Higher!" or "Go Lower!"
- **Magic Hints System**: Optional help showing all possible winning moves
- **Move History**: Track progress with color-coded moves
- **Celebration Win Screen**: Big trophy, stars, and party emojis
- **No Negative Feedback**: Always encouraging, never discouraging

### SEO & Production Ready
- **Comprehensive Meta Tags**: Title, description, Open Graph, Twitter Cards
- **JSON-LD Schema**: Structured data for search engines
- **PWA Support**: Manifest.json for mobile app-like experience
- **Robots.txt & Sitemap**: Ready for search engine indexing
- **Mobile Optimized**: Fully responsive design
- **Fast Loading**: Next.js optimizations for performance

## 🎯 How to Play

1. **Choose your difficulty** - Select Easy, Medium, or Hard
2. **Start with a random number** - The game gives you a starting number
3. **Apply operations** - Use addition (+), subtraction (-), multiplication (×), or division (÷)
4. **Get feedback** - After each move, see if you're higher or lower than the target
5. **Use hints** - Click "Show Hints" to see operations that would help
6. **Reach the target** - Win by making your number equal to the target!

## Tech Stack

- **Next.js 16** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **Headless UI** - Accessible dialog/modal components
- **Heroicons** - Beautiful SVG icons
- **Google Fonts (Fredoka)** - Kid-friendly font

## 📦 Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
number-game/
├── app/
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main game component
├── public/              # Static assets
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## 🎨 Features in Detail

### Operation Hints
- Shows all possible operations that would bring you closer to the target
- Highlights winning moves
- Can be toggled on/off during gameplay

### Move History
- Tracks every operation you perform
- Color-coded based on whether you got closer (blue) or further (red)
- Shows the exact distance from target after each move

### Smart Feedback
- Tells you if you're too high or too low
- Shows which operation types (±×÷) would help
- Preview of what your result will be before applying

### Difficulty Levels
- **Easy Peasy** (🌟): Target 10-40, Start 1-15 - Perfect for beginners
- **Super Fun** (⭐⭐): Target 20-90, Start 1-25 - Moderate challenge
- **Brain Power** (🔥🔥🔥): Target 50-200, Start 1-40 - For math wizards!

### Star Rewards System
- **3 Stars**: Reach target in 1 move - Amazing!
- **2 Stars**: Reach target in 2-3 moves - Great job!
- **1 Star**: Reach target in 4+ moves - Well done!

## 🎓 Game Strategy Tips

1. Start with simple operations to understand the distance
2. Use multiplication/division for big jumps
3. Use addition/subtraction for fine-tuning
4. Check the hints if you're stuck!
5. Try to reach the target in the fewest moves possible

## 🔧 Customization

You can easily customize the game by modifying:

- **Difficulty ranges** in the `initGame()` function
- **Color scheme** in `tailwind.config.js`
- **Hint test values** in the `operationHints` effect
- **UI layout** in the JSX components

## 📄 License

This project is open source and available for educational purposes.

## Before Deploying

### Required Assets (Create These!)

You need to create these image files in the `public/` folder:

1. **favicon.ico** (32x32) - Browser tab icon
2. **apple-touch-icon.png** (180x180) - iOS icon
3. **og-image.png** (1200x630) - Social media preview
4. **icon-192.png** (192x192) - PWA icon
5. **icon-512.png** (512x512) - PWA icon

Tools to create them:
- Canva (free templates)
- DALL-E or Midjourney (AI generation)
- Figma (design tool)
- https://realfavicongenerator.net/ (favicon generator)

### Update Domain

1. In `app/layout.tsx` (line 13), replace:
   ```typescript
   metadataBase: new URL('https://mathgamesforkids.com'),
   ```
   With YOUR actual domain.

2. In `public/sitemap.xml`, replace all instances of `https://mathgamesforkids.com`

3. Add Google Search Console verification code in `app/layout.tsx` (line 79)

## Deployment (Vercel Recommended)

```bash
# Push to GitHub
git init
git add .
git commit -m "Kid-friendly math game ready for deployment"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main

# Deploy on Vercel
# 1. Go to https://vercel.com
# 2. Import your GitHub repository
# 3. Click Deploy
# Done!
```

## Post-Deployment SEO Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Test social media previews (Twitter Card Validator, Facebook Debugger)
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test on mobile devices
- [ ] Add Google Analytics (optional)
- [ ] Share on educational platforms

## Marketing & SEO

### Target Keywords
- "free math games for kids"
- "educational math game"
- "practice arithmetic online"
- "kids mental math"
- "elementary math practice"

### Target Audience
- Parents of kids aged 6-12
- Elementary school teachers
- Homeschool educators
- Educational resource websites

## Contributing

Feature ideas:
- Sound effects for wins/moves
- More difficulty levels
- Multiplayer mode
- Daily challenges
- Achievement system
- Progress tracking

## License

Open source and available for educational purposes.

---

**Made with love for kids who love math!**

For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md)
