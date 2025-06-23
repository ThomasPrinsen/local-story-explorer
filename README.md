# Local Story Explorer 🌍

Een interactieve reisapplicatie die lokale verhalen en ervaringen toont op een interactieve kaart. Gebruikers kunnen verhalen van locals ontdekken, door verschillende steden browsen, en praktische reistips vinden voor authentieke ervaringen wereldwijd.

## ✨ Features

### 🗺️ Interactieve Kaart
- **OpenStreetMap integratie** met Leaflet.js
- **Vloeiende animaties** bij het inzoomen en verplaatsen
- **Klikbare markers** om verhalen te ontdekken
- **Wereldwijde dekking** met verhalen van alle continenten
- **Responsive design** voor desktop en mobiel

### 📚 Lokale Verhalen
- **Authentieke ervaringen** van locals wereldwijd
- **Gecategoriseerde verhalen** per continent:
  - 🌍 **Europa** - Verborgen grachten, fietsroutes, lokale eetcultuur
  - 🌏 **Azië** - Tempel etiquette, sushi tradities, straatvoedsel
  - 🌍 **Afrika** - Markt onderhandelen, theecultuur, township tours
  - 🌎 **Amerika** - Jazz cultuur, First Nations tradities, carnaval
  - 🌏 **Oceanië** - Aboriginal cultuur, lokale gebruiken

### 🔍 Zoeken & Filteren
- **Intelligente zoekfunctie** op locatie, activiteit of thema
- **Continent filter** voor gerichte ontdekking
- **Real-time filtering** met instant resultaten
- **Visuele feedback** met hover effecten

### 💡 Praktische Tips
- **Budget tips** voor voordelige reizen
- **Do's & Don'ts** per bestemming
- **Lokale etiquette** en culturele gebruiken
- **Verborgen pareltjes** buiten de gebaande paden

### 🎨 Moderne UI/UX
- **Responsive design** voor alle apparaten
- **Shadcn/ui componenten** voor consistente styling
- **Tailwind CSS** voor moderne styling
- **Smooth animaties** en hover effecten
- **Intuïtieve navigatie** met duidelijke feedback

## 🚀 Installatie

### Vereisten
- Node.js (versie 18 of hoger)
- npm, yarn, of bun package manager

### Stappen

**Clone de repository**
```sh
git clone https://github.com/your-username/local-story-explorer.git
cd local-story-explorer
```

**Installeer dependencies**
```sh
npm install
# of
yarn install
# of
bun install
```

**Start de development server**
```sh
npm run dev
# of
yarn dev
# of
bun dev
```

**Open de applicatie**
- Ga naar `http://localhost:5173` in je browser
- De applicatie laadt standaard met een overzicht van alle verhalen

## 📖 Gebruik

### Basis Navigatie
- **Verhalen bekijken**: Ga naar de "Verhalen" pagina voor een overzicht
- **Kaart verkennen**: Gebruik de "Kaart" pagina voor geografische ontdekking
- **Tips vinden**: Bekijk "Budget & Tips" en "Do's & Don'ts" voor praktische informatie
- **Verhaal delen**: Voeg je eigen lokale ervaring toe via "Verhaal Delen"

### Functies
- **Zoekbalk**: Type een locatie, activiteit of thema en druk op Enter
- **Continent filter**: Selecteer een continent voor gerichte verhalen
- **Kaart markers**: Klik op markers voor verhaal details
- **Verhaal details**: Bekijk volledige verhalen met afbeeldingen en beschrijvingen

## 🏗️ Project Structuur

```
local-story-explorer/
├── src/
│   ├── components/
│   │   ├── Layout.tsx              # Hoofdnavigatie en layout
│   │   ├── LocalStories.tsx        # Verhalen overzicht
│   │   ├── MapView.tsx             # Interactieve kaart
│   │   ├── StoryDetail.tsx         # Verhaal detail pagina
│   │   ├── CulturalGuide.tsx       # Culturele gids
│   │   ├── TravelTips.tsx          # Reistips
│   │   ├── FilterMenu.tsx          # Zoek en filter componenten
│   │   ├── LoginDialog.tsx         # Login functionaliteit
│   │   └── ui/                     # Shadcn/ui componenten
│   ├── pages/
│   │   ├── Index.tsx               # Hoofdpagina
│   │   ├── BudgetTips.tsx          # Budget tips pagina
│   │   ├── DosAndDonts.tsx         # Do's & Don'ts pagina
│   │   ├── VerhaalDelen.tsx        # Verhaal delen pagina
│   │   └── NotFound.tsx            # 404 pagina
│   ├── hooks/
│   │   ├── use-mobile.tsx          # Mobiele detectie
│   │   └── use-toast.ts            # Toast notificaties
│   ├── lib/
│   │   └── utils.ts                # Utility functies
│   └── styles/
│       └── globals.css             # Globale styling
├── public/
│   └── images/                     # Lokale afbeeldingen
├── stories.json                    # Verhalen data
└── package.json                    # Dependencies en scripts
```

## 🔧 Technische Details

### Frontend Stack
- **React 18** met TypeScript
- **Vite** voor snelle development en build
- **Tailwind CSS** voor styling
- **Shadcn/ui** voor UI componenten
- **Lucide React** voor iconen

### Kaart & Locatie
- **Leaflet.js** voor interactieve kaarten
- **OpenStreetMap** voor kaart tiles
- **React Leaflet** voor React integratie
- **Custom markers** met verhaal informatie

### State Management
- **React Hooks** (useState, useEffect, useCallback)
- **React Router** voor navigatie
- **TanStack Query** voor data fetching
- **Local state** voor component data

### Data Structuur
- **JSON-based** verhalen database
- **Geografische coördinaten** voor kaart integratie
- **Categorieën** per continent en thema
- **Afbeeldingen** voor visuele verhalen

## 🎨 Customization

### Nieuwe Verhalen Toevoegen
Voeg nieuwe verhalen toe in `stories.json`:

```json
{
  "title": "Jouw verhaal titel",
  "description": "Beschrijving van de lokale ervaring",
  "lat": 52.3702,
  "lng": 4.8952
}
```

### Kaart Styling
Pas de kaart aan in `src/components/MapView.tsx`:

```typescript
// Verander kaart tiles
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
```

### Nieuwe Pagina's
Voeg nieuwe pagina's toe in `src/pages/` en registreer ze in `src/App.tsx`:

```typescript
<Route path="/nieuwe-pagina" element={<NieuwePagina />} />
```

## 🚀 Deployment

### Build voor Productie
```sh
npm run build
# of
yarn build
# of
bun build
```

### Deploy naar Vercel
1. Push code naar GitHub
2. Verbind repository met Vercel
3. Deploy automatisch

### Deploy naar Netlify
1. Build de applicatie
2. Upload `dist/` folder naar Netlify
3. Configure environment variables

## 🔍 Troubleshooting

### Veelvoorkomende Problemen

**Kaart laadt niet**
- Controleer internetverbinding
- Verifieer OpenStreetMap toegang
- Controleer Leaflet CSS import

**Verhalen verschijnen niet**
- Controleer console voor errors
- Verifieer `stories.json` structuur
- Controleer afbeelding paden

**Styling problemen**
- Controleer Tailwind CSS configuratie
- Verifieer shadcn/ui installatie
- Controleer PostCSS configuratie

**Build errors**
- Verifieer Node.js versie (18+)
- Controleer dependency versies
- Clear node_modules en reinstall

## 🤝 Bijdragen

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📝 Licentie

Dit project is gelicenseerd onder de MIT License - zie het LICENSE bestand voor details.

## 🙏 Credits

- **OpenStreetMap** voor kaart data
- **Leaflet.js** voor kaart functionaliteit
- **Shadcn/ui** voor UI componenten
- **Lucide** voor iconen
- **Unsplash** voor placeholder afbeeldingen

## 📞 Contact

Voor vragen of ondersteuning:

- **GitHub Issues**: [Project Issues](https://github.com/your-username/local-story-explorer/issues)
- **Email**: thomas05.prinsen@gmail.com
- **Website**: [Local Story Explorer](https://your-domain.com)

---

**Ontdek de wereld door de ogen van locals** 🌍✨
