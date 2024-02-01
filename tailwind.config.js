module.exports = {
  content: [
    './src/**/*.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), 
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: [{
      synthwave: { 
        "primary": "#ff00ff",
        "secondary": "#ffffff",
        "accent": "#ffffff",
        "neutral": "#ffffff",
        "base-100": "#ffffff",
        "info": "#ffffff",
        "success": "#00ffff",
        "warning": "#ffffff",
        "error": "#ffffff"
      },
    }],    
  }
}
