import React from 'react';

// Define the color palette for easy reference and consistency
const colors = {
  background: 'bg-amber-100', // A warm, parchment-like background
  textPrimary: 'text-stone-800', // Dark, earthy brown for main text
  textSecondary: 'text-stone-600', // Slightly lighter brown for secondary text
  borderPrimary: 'border-stone-800', // For borders, matching the dark text
  accentPrimary: 'bg-lime-600', // A friendly, earthy green for primary actions
  accentPrimaryHover: 'hover:bg-lime-700',
  accentSecondary: 'bg-rose-500', // A muted, warm red for special actions like "Nudge"
  accentSecondaryHover: 'hover:bg-rose-600',
  inputBackground: 'bg-amber-50', // Light background for inputs
  inputFocusBorder: 'focus:border-lime-700',
  shadowColor: 'shadow-stone-800', // For the pixelated shadow effect
  shadowColorJs: '#44403c', // stone-800 hex for dynamic shadow
};

// Helper function to generate the pixelated shadow style string
// Tailwind JIT needs full class names, but for dynamic shadows, this can be useful
// However, for this example, we'll use Tailwind's theme() for direct shadow color
const pixelShadow = (color = colors.shadowColorJs) => `4px 4px 0px ${color}`;
const activePixelShadow = (color = colors.shadowColorJs) => `1px 1px 0px ${color}`;


// Main App component to showcase the design system
export default function App() {
  // It's good practice to add the font link to your main HTML file (e.g., public/index.html)
  // <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
  // For this self-contained example, we'll assume it's loaded.

  return (
    <div className={`font-vt323 ${colors.background} ${colors.textPrimary} min-h-screen p-4 sm:p-8 selection:bg-lime-300 selection:text-lime-900`}>
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
            background: ${colors.inputBackground.replace('bg-','')} /* amber-50 */;
            border: 2px solid ${colors.borderPrimary.replace('border-','')} /* stone-800 */;
          }
          ::-webkit-scrollbar-thumb {
            background: ${colors.accentPrimary.replace('bg-','')} /* lime-600 */;
            border: 2px solid ${colors.borderPrimary.replace('border-','')} /* stone-800 */;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${colors.accentPrimaryHover.replace('hover:bg-','')} /* lime-700 */;
          }
        `}
      </style>

      <header className="text-center mb-12">
        <h1 className={`text-6xl sm:text-7xl ${colors.textPrimary} mb-2`}>Danagrams</h1>
        <p className={`${colors.textSecondary} text-2xl`}>Design System Showcase</p>
      </header>

      <div className="space-y-12 max-w-4xl mx-auto">

        {/* Typography Section */}
        <section>
          <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Typography</h2>
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl">Heading 1: Daily Puzzle</h1>
            <h2 className="text-4xl sm:text-5xl">Heading 2: Player Scores</h2>
            <h3 className="text-3xl sm:text-4xl">Heading 3: How to Play</h3>
            <h4 className="text-2xl sm:text-3xl">Heading 4: Settings</h4>
            <h5 className="text-xl sm:text-2xl">Heading 5: Hint Unlocked</h5>
            <p className="text-lg sm:text-xl leading-relaxed">
              Body Text: Welcome to Danagrams, the daily anagram puzzle game created just for Dan and his fiancée!
              Each day, a new "Danagram" awaits. Log in, take your best shot (up to five guesses!), and see how you stack up.
              Use the "nudge" feature for a bit of friendly competition. Good luck, and have fun!
              This text should be cosy and readable, fitting the cottage-y, pixel-art vibe.
            </p>
          </div>
        </section>

        {/* Buttons Section */}
        <section>
          <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Buttons</h2>
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
                            hover:bg-amber-200
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

        {/* Text Inputs Section */}
        <section>
          <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Text Inputs</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="guess" className="block text-xl sm:text-2xl mb-2">Your Guess:</label>
              <input
                type="text"
                id="guess"
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
              <label htmlFor="username" className="block text-xl sm:text-2xl mb-2">Username (Disabled):</label>
              <input
                type="text"
                id="username"
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

        {/* Color Palette Section */}
        <section>
          <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: 'Background', class: colors.background, text: colors.textPrimary },
              { name: 'Text Primary', class: colors.textPrimary, text: 'text-white' },
              { name: 'Text Secondary', class: colors.textSecondary.replace('text-','bg-'), text: 'text-white' }, // show bg for text color
              { name: 'Border Primary', class: colors.borderPrimary.replace('border-','bg-'), text: 'text-white' }, // show bg for border color
              { name: 'Accent Primary', class: colors.accentPrimary, text: 'text-white' },
              { name: 'Accent Secondary', class: colors.accentSecondary, text: 'text-white' },
              { name: 'Input Background', class: colors.inputBackground, text: colors.textPrimary },
              { name: 'Shadow Color', class: colors.shadowColor.replace('shadow-','bg-'), text: 'text-white' },
            ].map(color => (
              <div key={color.name} className={`p-4 border-4 ${colors.borderPrimary} shadow-[4px_4px_0px_theme(colors.stone.800)]`}>
                <div className={`${color.class} h-20 w-full border-2 ${colors.borderPrimary} mb-2 flex items-center justify-center`}>
                   <span className={`${color.text} text-lg p-1 bg-black/20`}>{color.class}</span>
                </div>
                <p className="text-center text-lg">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Card/Block */}
        <section>
          <h2 className={`text-4xl sm:text-5xl ${colors.textPrimary} border-b-4 ${colors.borderPrimary} pb-2 mb-6`}>UI Block / Card</h2>
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
