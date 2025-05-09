import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/styleguide')({
  component: RouteComponent,
})

// Define the color palette for easy reference and consistency
const colors = {
    // For gradient, we apply it directly to the main div. This is for reference.
    backgroundGradient: 'bg-gradient-to-br from-teal-200 to-sky-200', 
    textPrimary: 'text-stone-800', 
    textSecondary: 'text-stone-600', 
    borderPrimary: 'border-stone-800', 
    accentPrimary: 'bg-lime-600', 
    accentPrimaryHover: 'hover:bg-lime-700',
    accentSecondary: 'bg-rose-500', 
    accentSecondaryHover: 'hover:bg-rose-600',
    inputBackground: 'bg-slate-100', // Neutral light gray for inputs, works with gradient
    inputFocusBorder: 'focus:border-lime-700',
    shadowColor: 'shadow-stone-800', 
    shadowColorJs: '#44403c', // stone-800 hex for dynamic shadow
    subtleButtonHoverBg: 'hover:bg-slate-200', // Hover for subtle buttons on a neutral input-like bg
    scrollbarTrackBg: 'slate-100', // Tailwind color name for slate-100
    letterTileBg: 'bg-slate-50', // Background for anagram letter tiles
    letterTileBorder: 'border-slate-400', // Border for anagram letter tiles
    loaderDotBg: 'bg-lime-600', // Color for loader dots
  };
  
  // Helper function to generate the pixelated shadow style string
  // Tailwind JIT needs full class names, but for dynamic shadows, this can be useful
  // However, for this example, we'll use Tailwind's theme() for direct shadow color
  const pixelShadow = (color = colors.shadowColorJs) => `4px 4px 0px ${color}`;
  const activePixelShadow = (color = colors.shadowColorJs) => `1px 1px 0px ${color}`;

function RouteComponent() {
    const [isLoading, setIsLoading] = useState(true);
    const exampleAnagram = "DANAGRM"; // Example anagram
  
    // Simulate loading for the loader example
    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 5000); // Show loader for 5 seconds
      return () => clearTimeout(timer);
    }, []);
  
  
    return (
      <div className={`font-vt323 ${colors.backgroundGradient} ${colors.textPrimary} min-h-screen p-4 sm:p-8 selection:bg-lime-300 selection:text-lime-900`}>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
            body {
              font-family: 'VT323', monospace; /* Ensure font is applied */
            }
            /* Custom scrollbar for a more pixelated feel - optional */
            ::-webkit-scrollbar {
              width: 12px;
              height: 12px;
            }
            ::-webkit-scrollbar-track {
              background: #${tailwindColors[colors.scrollbarTrackBg.split('-')[0]][colors.scrollbarTrackBg.split('-')[1]]} /* e.g., slate-100 */;
              border: 2px solid ${colors.shadowColorJs} /* stone-800 */;
            }
            ::-webkit-scrollbar-thumb {
              background: ${tailwindColors.lime[600]} /* lime-600 */;
              border: 2px solid ${colors.shadowColorJs} /* stone-800 */;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: ${tailwindColors.lime[700]} /* lime-700 */;
            }
  
            /* Pixel Pulse Loader Animation */
            .pixel-loader-dot {
              width: 20px;
              height: 20px;
              margin: 4px;
              border: 2px solid ${colors.shadowColorJs};
              animation: pulse 1.5s infinite ease-in-out;
            }
            .pixel-loader-dot:nth-child(1) { animation-delay: -0.30s; }
            .pixel-loader-dot:nth-child(2) { animation-delay: -0.15s; }
            .pixel-loader-dot:nth-child(3) { animation-delay: 0s; }
  
            @keyframes pulse {
              0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
              }
              40% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
  
        <header className="text-center mb-12">
          <h1 className={`text-6xl sm:text-7xl ${colors.textPrimary} mb-2`}>Danagrams</h1>
          <p className={`${colors.textSecondary} text-2xl`}>Style Guide (Gradient Theme)</p>
        </header>
  
        <div className="space-y-12 max-w-4xl mx-auto">
  
          {/* Typography Section (Existing) */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Typography</h2>
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl">Heading 1: Daily Puzzle</h1>
              <h2 className="text-4xl sm:text-5xl">Heading 2: Player Scores</h2>
              {/* ... other typography elements ... */}
              <p className="text-lg sm:text-xl leading-relaxed">
                Body Text: Welcome to Danagrams, the daily anagram puzzle game created just for Dan and his fiancée!
              </p>
            </div>
          </section>
  
          {/* Anagram Display and Input Section - NEW */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Today's Danagram</h2>
            <div className={`p-6 ${colors.inputBackground} border-4 ${colors.borderPrimary} shadow-[6px_6px_0px_theme(colors.stone.800)]`}>
              <p className={`${colors.textSecondary} text-xl mb-4`}>Unscramble the letters:</p>
              <div className="flex justify-center space-x-2 sm:space-x-3 mb-6">
                {exampleAnagram.split('').map((letter, index) => (
                  <div 
                    key={index}
                    className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
                                ${colors.letterTileBg} ${colors.textPrimary} text-3xl sm:text-4xl 
                                border-4 ${colors.letterTileBorder} 
                                shadow-[3px_3px_0px_theme(colors.stone.800)]`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="anagram-guess" className="block text-xl sm:text-2xl mb-2">Your Guess:</label>
                <input
                  type="text"
                  id="anagram-guess"
                  placeholder="Enter your solution"
                  className={`w-full text-xl sm:text-2xl ${colors.inputBackground} ${colors.textPrimary} placeholder-stone-500 
                              ${colors.borderPrimary} border-4 p-3 
                              focus:outline-none ${colors.inputFocusBorder} focus:ring-4 focus:ring-lime-600/50
                              shadow-[4px_4px_0px_theme(colors.stone.800)] 
                              focus:shadow-[2px_2px_0px_theme(colors.lime.700)] focus:translate-x-[2px] focus:translate-y-[2px]
                              transition-all duration-100 ease-out mb-4`}
                />
                <button
                  className={`w-full text-xl sm:text-2xl ${colors.accentPrimary} ${colors.accentPrimaryHover} text-white ${colors.borderPrimary} border-4 py-3 px-6
                              shadow-[4px_4px_0px_theme(colors.stone.800)]
                              hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px]
                              active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px]
                              transition-all duration-75 ease-out`}
                >
                  Submit Guess
                </button>
              </div>
            </div>
          </section>
  
          {/* Buttons Section (Existing) */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Buttons</h2>
            {/* ... button examples ... */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
              {/* Primary Button */}
              <div>
                <p className={`${colors.textSecondary} mb-2 text-lg`}>Primary Button:</p>
                <button
                  className={`w-full text-xl sm:text-2xl ${colors.accentPrimary} ${colors.accentPrimaryHover} text-white ${colors.borderPrimary} border-4 py-3 px-6
                              shadow-[4px_4px_0px_theme(colors.stone.800)]
                              hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px]
                              active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px]
                              transition-all duration-75 ease-out`}
                >
                  Submit Guess
                </button>
              </div>
  
              {/* Secondary/Special Button (Nudge) */}
              <div>
                <p className={`${colors.textSecondary} mb-2 text-lg`}>Nudge Button:</p>
                <button
                  className={`w-full text-xl sm:text-2xl ${colors.accentSecondary} ${colors.accentSecondaryHover} text-white ${colors.borderPrimary} border-4 py-3 px-6
                              shadow-[4px_4px_0px_theme(colors.stone.800)]
                              hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px]
                              active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px]
                              transition-all duration-75 ease-out`}
                >
                  Nudge Player!
                </button>
              </div>
              
              {/* Ghost/Subtle Button */}
               <div>
                <p className={`${colors.textSecondary} mb-2 text-lg`}>Subtle Button:</p>
                <button
                  className={`w-full text-xl sm:text-2xl ${colors.textPrimary} hover:text-lime-700 bg-transparent ${colors.borderPrimary} border-4 py-3 px-6
                              ${colors.subtleButtonHoverBg}
                              active:translate-y-[2px] active:translate-x-[2px]
                              transition-all duration-75 ease-out`}
                >
                  View Rules
                </button>
              </div>
  
              {/* Disabled Button */}
              <div>
                <p className={`${colors.textSecondary} mb-2 text-lg`}>Disabled Button:</p>
                <button
                  disabled
                  className={`w-full text-xl sm:text-2xl bg-stone-300 text-stone-500 border-stone-400 border-4 py-3 px-6
                              shadow-[4px_4px_0px_theme(colors.stone.400)]
                              cursor-not-allowed`}
                >
                  No Guesses Left
                </button>
              </div>
            </div>
          </section>
  
          {/* Text Inputs Section (Existing) */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Text Inputs</h2>
            {/* ... text input examples ... */}
             <div className="space-y-6">
              <div>
                <label htmlFor="guess-example" className="block text-xl sm:text-2xl mb-2">Your Guess:</label>
                <input
                  type="text"
                  id="guess-example"
                  placeholder="Enter anagram solution"
                  className={`w-full text-xl sm:text-2xl ${colors.inputBackground} ${colors.textPrimary} placeholder-stone-500 
                              ${colors.borderPrimary} border-4 p-3 
                              focus:outline-none ${colors.inputFocusBorder} focus:ring-4 focus:ring-lime-600/50
                              shadow-[4px_4px_0px_theme(colors.stone.800)] 
                              focus:shadow-[2px_2px_0px_theme(colors.lime.700)] focus:translate-x-[2px] focus:translate-y-[2px]
                              transition-all duration-100 ease-out`}
                />
              </div>
              <div>
                <label htmlFor="username-example" className="block text-xl sm:text-2xl mb-2">Username (Disabled):</label>
                <input
                  type="text"
                  id="username-example"
                  value="DanTheMan"
                  disabled
                  className={`w-full text-xl sm:text-2xl bg-stone-300 text-stone-500 placeholder-stone-400 
                              border-stone-400 border-4 p-3 
                              shadow-[4px_4px_0px_theme(colors.stone.400)] 
                              cursor-not-allowed`}
                />
              </div>
            </div>
          </section>
  
          {/* Loading Indicator Section - NEW */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Loading States</h2>
            <div className={`p-6 ${colors.inputBackground} border-4 ${colors.borderPrimary} shadow-[6px_6px_0px_theme(colors.stone.800)] text-center`}>
              <h3 className="text-2xl mb-4">Fetching today's Danagram...</h3>
              {isLoading ? (
                <div className="flex justify-center items-center my-6">
                  <div className={`pixel-loader-dot ${colors.loaderDotBg}`}></div>
                  <div className={`pixel-loader-dot ${colors.loaderDotBg}`}></div>
                  <div className={`pixel-loader-dot ${colors.loaderDotBg}`}></div>
                </div>
              ) : (
                <p className="text-xl text-lime-700">Danagram Loaded!</p>
              )}
              <p className={`${colors.textSecondary} text-lg mt-4`}>
                (This is a demo. Loader shows for 5 seconds then switches to "Loaded" message.)
              </p>
               <button
                  onClick={() => setIsLoading(true)}
                  className={`mt-4 text-lg ${colors.accentSecondary} ${colors.accentSecondaryHover} text-white ${colors.borderPrimary} border-2 py-2 px-4
                              shadow-[2px_2px_0px_theme(colors.stone.800)]
                              hover:shadow-[1px_1px_0px_theme(colors.stone.800)] hover:translate-x-[1px] hover:translate-y-[1px]
                              active:shadow-[0px_0px_0px_theme(colors.stone.800)] active:translate-x-[2px] active:translate-y-[2px]
                              transition-all duration-75 ease-out`}
                >
                  Re-show Loader
                </button>
            </div>
          </section>
  
          {/* Color Palette Section (Existing) */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Color Palette</h2>
            {/* ... color palette display ... */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'Background', class: colors.backgroundGradient, text: colors.textPrimary, isGradient: true },
                { name: 'Text Primary', class: colors.textPrimary, text: 'text-white' }, 
                { name: 'Text Secondary', class: colors.textSecondary.replace('text-','bg-'), text: 'text-white' },
                { name: 'Border Primary', class: colors.borderPrimary.replace('border-','bg-'), text: 'text-white' },
                { name: 'Accent Primary', class: colors.accentPrimary, text: 'text-white' },
                { name: 'Accent Secondary', class: colors.accentSecondary, text: 'text-white' },
                { name: 'Input Background', class: colors.inputBackground, text: colors.textPrimary },
                { name: 'Letter Tile BG', class: colors.letterTileBg, text: colors.textPrimary },
                { name: 'Loader Dot BG', class: colors.loaderDotBg, text: 'text-white' },
                { name: 'Shadow Color', class: colors.shadowColor.replace('shadow-','bg-'), text: 'text-white' },
              ].map(color => (
                <div key={color.name} className={`p-4 border-4 ${colors.borderPrimary} shadow-[4px_4px_0px_theme(colors.stone.800)] ${color.isGradient ? '' : colors.inputBackground }`}>
                  <div className={`${color.class} h-20 w-full border-2 ${colors.borderPrimary} mb-2 flex items-center justify-center`}>
                     <span className={`${color.text} text-lg p-1 bg-black/30 rounded`}>{color.class}</span>
                  </div>
                  <p className="text-center text-lg">{color.name}</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* Example Card/Block (Existing) */}
          <section>
            <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>UI Block / Card</h2>
            {/* ... UI block example ... */}
             <div className={`p-6 ${colors.inputBackground} border-4 ${colors.borderPrimary} shadow-[6px_6px_0px_theme(colors.stone.800)]`}>
                  <h3 className="text-3xl mb-3">Today's Stats</h3>
                  <p className="text-xl mb-1">Guesses Left: <span className={`${colors.accentPrimary.replace('bg-','text-')}`}>3</span></p>
                  <p className="text-xl">Current Score: <span className={`${colors.accentSecondary.replace('bg-','text-')}`}>50</span></p>
                  <div className="mt-6">
                       <button
                          className={`w-full sm:w-auto text-xl ${colors.accentPrimary} ${colors.accentPrimaryHover} text-white ${colors.borderPrimary} border-4 py-2 px-5
                                      shadow-[4px_4px_0px_theme(colors.stone.800)]
                                      hover:shadow-[2px_2px_0px_theme(colors.stone.800)] hover:translate-x-[2px] hover:translate-y-[2px]
                                      active:shadow-[1px_1px_0px_theme(colors.stone.800)] active:translate-x-[3px] active:translate-y-[3px]
                                      transition-all duration-75 ease-out`}
                        >
                          View Leaderboard
                        </button>
                  </div>
              </div>
          </section>
  
        </div>
  
        <footer className={`text-center ${colors.textSecondary} mt-16 pb-8 text-lg`}>
          <p>&copy; {new Date().getFullYear()} Danagrams. Made with love (and pixels!).</p>
        </footer>
      </div>
    );
}



// Minimal representation of Tailwind default colors for scrollbar styling
const tailwindColors = {
    teal: { // Used in gradient
      200: '#99f6e4',
    },
    sky: { // Used in gradient
      200: '#bae6fd',
    },
    slate: { // Used for input backgrounds and scrollbar with gradient
      50: '#f8fafc', // For letter tiles
      100: '#f1f5f9',
      200: '#e2e8f0',
      400: '#94a3b8', // For letter tile borders
    },
    lime: {
      600: '#65a30d',
      700: '#4d7c0f',
    },
    stone: {
      800: '#292524'
    }
  };
  