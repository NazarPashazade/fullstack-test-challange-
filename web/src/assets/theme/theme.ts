import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";

import foundations from "@assets/theme/foundations";
import components from "@assets/theme/components";

export const theme = extendTheme(
  {
    ...foundations,
  },
  {
    config: defaultTheme.config,
    direction: defaultTheme.direction,
    transition: defaultTheme.transition,
    zIndices: defaultTheme.zIndices,
    components: { ...defaultTheme.components, ...components },
    styles: {
      ...defaultTheme.styles,
      global: {
        ...defaultTheme.styles.global,
        "html, body": {
          fontFamily: "Mulish, sans-serif",
        },
        "*&::-webkit-scrollbar": {
          height: "6px",
        },
      },
    },
    colors: {},
    radii: foundations.borderRadius.radii,
    fonts: {
      heading: "Mulish, sans-serif",
      body: "Mulish, sans-serif",
    },
    fontSizes: {},
    fontWeights: {},
    lineHeights: {},
    space: {
      blockMargin: "24px",
    },
  },
);
