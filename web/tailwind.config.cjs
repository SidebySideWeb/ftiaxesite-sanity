/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'cream-deep': 'var(--cream-deep)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        green: 'var(--green)',
        'green-hover': 'var(--green-hover)',
        'green-tint': 'var(--green-tint)',
        amber: 'var(--amber)',
        navy: 'var(--navy)',
        'navy-soft': 'var(--navy-soft)',
        danger: 'var(--danger)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
}
