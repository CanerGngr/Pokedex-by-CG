# 🎮 Pokedex by CG

A modern, responsive Pokedex application built with vanilla HTML, CSS, and JavaScript. Browse, search, and discover detailed information about Pokemon from the original games and beyond.

![Pokemon Logo](./assets/logos/pokemon-tcgp.svg)

## ✨ Features

### 🔍 **Smart Search System**
- **Real-time search** as you type
- **Flexible search modes**: Search by name, ID, or Pokemon number
- **Intelligent matching**: Find Pokemon even with partial names
- **Minimum character requirements** with helpful user feedback
- **Search result counter** showing matched Pokemon

### 📄 **Advanced Pagination**
- **Dynamic loading** of Pokemon in batches of 20
- **Smart pagination controls** with previous/next navigation
- **Automatic pagination hiding** during search mode
- **Offset-based loading** for optimal performance

### 🎴 **Interactive Pokemon Cards**
- **Type-based color theming** for each Pokemon card
- **Hover effects** and smooth animations
- **Flip animation** between Pokemon info and stats
- **Responsive card layout** adapting to screen sizes

### 🔍 **Detailed Pokemon Modal**
- **Comprehensive Pokemon information** display
- **Front/back card flip** showing stats and details
- **Modal overlay** with keyboard navigation (ESC to close)
- **Type-specific styling** matching Pokemon characteristics

### 🎨 **Modern UI/UX**
- **Bootstrap 5.3.7 integration** for responsive design
- **Custom CSS styling** with Pokemon-themed colors
- **Loading states** with user-friendly messages
- **Sticky search bar** for easy access while browsing
- **Professional navigation** with logo and branding

### 🚀 **Performance Optimized**
- **Parallel API loading** for faster Pokemon detail fetching
- **Efficient data management** with smart caching
- **Lazy loading approach** with pagination
- **Minimal DOM manipulation** for smooth performance

## 🛠 Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.3.7 + Custom CSS
- **API**: [PokeAPI](https://pokeapi.co/) for Pokemon data
- **Icons**: Custom SVG icons for Pokemon types
- **Architecture**: Multi-script modular JavaScript architecture

## 📁 Project Structure

```
Pokedex/
├── 📄 index.html              # Main application page
├── 📁 css/
│   ├── style.css              # Main styling and layout
│   ├── colors.css             # Pokemon type colors
│   └── pokemon-types.css      # Type-specific styling
├── 📁 js/
│   ├── script.js              # Core application logic
│   ├── api.js                 # Pokemon API integration
│   ├── templates.js           # HTML template functions
│   ├── modal.js               # Modal interaction handling
│   ├── pagination.js          # Pagination logic
│   ├── search.js              # Search functionality
│   ├── ui-helpers.js          # UI utility functions
│   ├── utils.js               # General utilities
│   └── data-formatting.js     # Data processing functions
├── 📁 assets/
│   ├── 📁 icons/              # Pokemon type SVG icons
│   ├── 📁 logos/              # Application logos
│   └── 📁 favicon/            # Site favicon
└── 📁 html/
    ├── impressum.html         # Legal imprint page
    └── datenschutz.html       # Privacy policy page
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Pokemon API access

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/CanerGngr/Pokedex.git
   cd Pokedex
   ```

2. **Start a local server**
   ```bash
   # Using Python (recommended)
   python3 -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 💡 Usage Examples

### Basic Browsing
- **Load the application** - Pokemon cards appear automatically
- **Scroll through pages** - Use pagination controls to browse all Pokemon
- **View Pokemon details** - Click any Pokemon card to open detailed modal

### Search Functionality
- **Search by name**: Type "pikachu" to find Pikachu
- **Search by ID**: Type "25" to find Pokemon #25 (Pikachu)
- **Partial matching**: Type "char" to find Charmander, Charmeleon, Charizard
- **Clear search**: Delete search text to return to full Pokemon list

### Modal Interaction
- **Open details**: Click on any Pokemon card
- **Flip card**: Click "Show Stats" to see Pokemon statistics
- **Navigate**: Use arrow keys or click controls
- **Close modal**: Press ESC key or click outside modal

## 🎯 Key Features Deep Dive

### Search System Architecture
The search functionality implements multiple search strategies:

```javascript
// Intelligent search matching
- Name-based search with partial matching
- ID-based exact matching for numbers
- Minimum character requirements (3+ chars for names)
- Real-time result counting and feedback
```

### Pokemon Card System
Each Pokemon card dynamically receives type-based styling:

```css
/* Example type-based styling */
.grass { background: linear-gradient(135deg, #78C850, #A8E6A3); }
.fire { background: linear-gradient(135deg, #F08030, #FFB366); }
.water { background: linear-gradient(135deg, #6890F0, #A2C4F5); }
```

### Performance Optimization
- **Parallel API calls** for loading Pokemon details
- **Efficient pagination** with offset-based loading
- **Smart DOM updates** minimizing redraws
- **CSS-based animations** for smooth interactions

## 🔧 Development

### Code Architecture
The application follows a **modular vanilla JavaScript** approach:

- **No build process** required - direct file serving
- **Script-based modules** with clear separation of concerns
- **Function-based organization** with descriptive naming
- **DOM manipulation** via `getElementById` exclusively
- **Event handling** through inline `onclick` handlers

### Coding Standards
- **English-only** function and variable names
- **Maximum 14 lines per function** for maintainability
- **Vanilla JavaScript** - no external libraries except Bootstrap
- **Clear naming conventions** like `loadPokemon()`, `showModal()`

## 🌐 API Integration

This application integrates with the [PokeAPI](https://pokeapi.co/):

```javascript
// Example API endpoints used
https://pokeapi.co/api/v2/pokemon?limit=20&offset=0  // Pokemon list
https://pokeapi.co/api/v2/pokemon/{id}/              // Pokemon details
```

### Data Processing
- **Pokemon basic info**: Name, ID, image, types
- **Pokemon stats**: HP, Attack, Defense, Speed, etc.
- **Type information**: Colors, icons, characteristics
- **Image handling**: Official artwork and sprites

## 🎨 Styling & Design

### Design Philosophy
- **Pokemon-authentic** color schemes and typography
- **Mobile-first responsive** design approach
- **Bootstrap foundation** with custom Pokemon theming
- **Smooth animations** and hover effects
- **Accessibility-focused** with proper contrast and navigation

### Color System
Each Pokemon type has dedicated colors defined in `css/colors.css`:
- **Primary colors** for card backgrounds
- **Accent colors** for buttons and highlights
- **Gradient backgrounds** for visual depth

## 🔮 Future Enhancements

### Planned Features
- [ ] **Pokemon evolution chains** visualization
- [ ] **Advanced filtering** by type, generation, stats
- [ ] **Favorite Pokemon** system with local storage
- [ ] **Pokemon comparison** tool
- [ ] **Dark/light theme** toggle
- [ ] **Pokemon cries** audio integration
- [ ] **Move details** and battle statistics

### Technical Improvements
- [ ] **Service Worker** for offline functionality
- [ ] **Image lazy loading** for better performance
- [ ] **Advanced search filters** (type, generation, stats)
- [ ] **Keyboard navigation** throughout the application

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and architecture
- Maintain vanilla JavaScript approach
- Test across multiple browsers
- Ensure responsive design compatibility
- Write clear, descriptive commit messages

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[PokeAPI](https://pokeapi.co/)** - Free Pokemon API providing all Pokemon data
- **[Bootstrap](https://getbootstrap.com/)** - Responsive CSS framework
- **Pokemon Company** - For creating the amazing Pokemon universe
- **Nintendo/Game Freak** - Original Pokemon games and designs

## 📞 Contact & Support

- **Developer**: Caner Güngör
- **GitHub**: [@CanerGngr](https://github.com/CanerGngr)
- **Project Link**: [https://github.com/CanerGngr/Pokedex](https://github.com/CanerGngr/Pokedex)

---

**Made with ❤️ and lots of ☕ by CG**

*Gotta code 'em all! 🎮*