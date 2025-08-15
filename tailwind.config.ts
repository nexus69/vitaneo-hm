import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        jasmin:"#FFF9F2", sable:"#F3E8D7", azur:"#1E86A6", mer:"#0A3D5E",
        terra:"#C96A3B", olive:"#6B8E6E", or:"#C2A86B", ligne:"#E7E2D9",
        graphite:"#1C1C1C", ardoise:"#2F3A4A",
        border:"hsl(var(--border))", input:"hsl(var(--input))",
        ring:"hsl(var(--ring))", background:"hsl(var(--background))", foreground:"hsl(var(--foreground))",
        primary:{ DEFAULT:"hsl(var(--primary))", foreground:"hsl(var(--primary-foreground))" },
        secondary:{ DEFAULT:"hsl(var(--secondary))", foreground:"hsl(var(--secondary-foreground))" },
        muted:{ DEFAULT:"hsl(var(--muted))", foreground:"hsl(var(--muted-foreground))" },
        accent:{ DEFAULT:"hsl(var(--accent))", foreground:"hsl(var(--accent-foreground))" },
        card:{ DEFAULT:"hsl(var(--card))", foreground:"hsl(var(--card-foreground))" },
      },
      borderRadius: { lg:"12px", xl:"16px", "2xl":"20px" },
      boxShadow: {
        elev1:"0 2px 6px rgba(10,61,94,.06)",
        elev2:"0 8px 24px rgba(10,61,94,.08)",
        elev3:"0 20px 48px rgba(10,61,94,.10)",
      },
      fontFamily: {
        heading:["var(--font-manrope)","system-ui","sans-serif"],
        sans:["var(--font-inter)","system-ui","sans-serif"],
        mono:["var(--font-geist-mono)","ui-monospace","SFMono-Regular","Menlo","monospace"],
      },
      fontSize: {
        h1:["44px",{ lineHeight:"52px", letterSpacing:"-0.01em", fontWeight:"600" }],
        h2:["34px",{ lineHeight:"42px", letterSpacing:"-0.01em", fontWeight:"600" }],
        h3:["26px",{ lineHeight:"34px", letterSpacing:"-0.01em", fontWeight:"600" }],
        p1:["18px",{ lineHeight:"28px" }],
        p2:["16px",{ lineHeight:"26px" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
