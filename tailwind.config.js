module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        default: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      animation: {
        fadeInOut: "fadeInOut 2s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        heartbeat: "heartbeat 2s ease 0s 1 normal forwards",
        scaleCenter: "scaleCenter 1s ease 0s 1 normal forwards",
        scaleHorCenter: "scaleHorCenter 1s ease 0s 1 normal forwards",
        scaleVerCenter: "scaleVerCenter 1s ease 0s 1 normal forwards",
        verBottom: "verBottom 1s ease 0s 1 normal forwards",
        scaleUp: "scaleUp 1s ease 0s 1 normal forwards",
        BounceIn: "BounceIn 1s ease 0s 1 normal forwards",
        scaleInCenter: "scaleInCenter 1s ease 0s 1 normal forwards;",
        conffeti: "conffeti 1s ease 0s 1 normal forwards;",
      },
      keyframes: {
        fadeInOut: {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
        conffeti: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },

        heartbeat: {
          "0%": {
            animationTimingFunction: "ease-out",
            transform: "scale(1)",
            transformOrigin: "center center",
          },
          "10%": {
            animationTimingFunction: "ease-in",
            transform: " scale(0.91)",
          },
          "17%": {
            animationTimingFunction: "ease-out",
            transform: "scale(0.98)",
          },
          "33%": {
            animationTimingFunction: "ease-in",

            transform: " scale(0.87)",
          },
          "45%": {
            animationTimingFunction: "ease-out",
            transform: "scale(1)",
          },
        },
        verBottom: {
          "0%": {
            transform: "translateY(0.4)",
            transformOrigin: "0% 100%",
          },
          "100%": {
            transform: "translateY(1)",
            transformOrigin: "0% 100%",
          },
        },
        scaleCenter: {
          "0%": {
            transform: "scale(0)",
          },

          "100%": {
            transform: "scale(1)",
          },
        },
        scaleHorCenter: {
          "0%": {
            transform: "scaleX(0)",
          },

          "100%": {
            transform: "scaleX(1)",
          },
        },
        scaleVerCenter: {
          "0%": {
            transform: "scaleY(0)",
          },

          "100%": {
            transform: "scaleY(1)",
          },
        },
        scaleInCenter: {
          "0%": {
            transform: "scale(0)",
            transformOrigin: "0% 0%",
          },
          "100%": {
            transform: "scale(1)",
            transformOrigin: "0% 0%",
          },
        },
        BounceIn: {
          "0%": {
            transitionTimingFunction: "ease-in",
            opacity: "0",
            transform: "translateY(-250px)",
          },

          "38%": {
            transitionTimingFunction: "ease-out",
            opacity: "1",
            transform: "translateY(0)",
          },

          "55%": {
            transitionTimingFunction: "ease-in",
            transform: "translateY(-65px)",
          },

          "72%": {
            transitionTimingFunction: "ease-out",
            transform: "translateY(0)",
          },

          "81%": {
            transitionTimingFunction: "ease-in",
            transform: "translateY(-28px)",
          },

          "90%": {
            transitionTimingFunction: "ease-out",
            transform: "translateY(0)",
          },

          "95%": {
            transitionTimingFunction: "ease-in",
            transform: "translateY(-8px)",
          },

          "100%": {
            transitionTimingFunction: "ease-out",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
