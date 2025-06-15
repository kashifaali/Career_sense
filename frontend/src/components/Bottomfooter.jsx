import React from 'react'

export default function Bottomfooter() {
  return (
    <footer>
      <div className="border-t border-gray-300 py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-2 text-gray-600">
          
          {/* Text */}
          <div className="text-center font-medium text-sm">
            <div className="text-lg font-bold whitespace-nowrap">
              <span className="text-blue-600">Career</span>
              <span className="text-emerald-600">Sense</span>
              <span> © copyright 2025 | Kashif Ali</span>

            </div> 
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M19.633 7.997c.013.176.013.353.013.529 0 5.386-4.096 11.6-11.6 11.6-2.307 0-4.45-.676-6.253-1.84.323.037.647.05.983.05 1.92 0 3.69-.647 5.096-1.736a4.096 4.096 0 01-3.827-2.84c.25.037.5.062.763.062.366 0 .732-.05 1.072-.138A4.092 4.092 0 012.9 9.045v-.05c.684.38 1.47.608 2.304.635A4.08 4.08 0 013.1 6.082c0-.75.2-1.45.55-2.053a11.61 11.61 0 008.423 4.274 4.63 4.63 0 01-.1-.936 4.092 4.092 0 017.075-2.8 8.13 8.13 0 002.6-.99 4.092 4.092 0 01-1.8 2.25 8.17 8.17 0 002.35-.647 8.7 8.7 0 01-2.05 2.117z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.17c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.76-1.604-2.665-.3-5.467-1.334-5.467-5.931 0-1.312.469-2.383 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.295-1.23 3.295-1.23.653 1.653.24 2.873.118 3.176.77.84 1.234 1.91 1.234 3.222 0 4.61-2.807 5.628-5.48 5.922.43.37.814 1.102.814 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.63.297 12 .297z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24h11.498v-9.294H9.692v-3.622h3.131V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.326-.597 1.326-1.326V1.326C24 .597 23.403 0 22.675 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
