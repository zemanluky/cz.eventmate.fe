import { defineConfig } from "@pandacss/dev";
import {createPreset} from "@park-ui/panda-preset";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  // preset styles
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: "grass",
      grayColor: "olive",
      borderRadius: 'md'
    })
  ],
  // Custom themes for coloring
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          fg: {
            cancel: { value: '{colors.olive.12}' },     // cancel button color 
            buttonLarge: {value: '{#FFFFFF}'},          // large button color 
            buttonSmall: {value: '{colors.olive.12}'},  // small button color
            card: {value: "{colors.olive.11}"},         // event cards text color (date,location)
            cardHeading: {value: "{#000000}"}           // event cards text color (heading)

          },
          bg: {
            cancel: { value: '{colors.olive.7}'},     // cancel button background color 
            buttonLarge: {value: '{colors.grass.8}'}, // large button background color 
            buttonSmall: {value: '{colors.lime.9}'},  // small button background color
            card: {value: "{colors.olive.2}"},        // event cards background color
            navbar: {value: "{colors.olive.2}"}       // nav background color
          },
        },
      },
    },
  },
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Files to exclude
  exclude: [],
  // The output directory for your css system
  outdir: "styled-system",
  // this is needed for creating components with panda styles
  jsxFramework: "react"
});
