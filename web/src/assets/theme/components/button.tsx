export const Button = {
  baseStyle: {
    minHeight: "48px",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
  },
  variants: {
    primary: {
      cursor: "pointer",
      backgroundColor: "primary",
      color: "white",
      fontWeight: 800,
      _disabled: {
        backgroundColor: "disabledBtnBgColor",
        color: "disabledBtnTextColor",
      },
      _hover: {
        backgroundColor: "primary",
        _disabled: {
          backgroundColor: "primary",
          opacity: 0.6,
        },
      },
    },
    secondary: {
      cursor: "pointer",
      backgroundColor: "secondary",
      color: "white",
      borderRadius: "base",
      _disabled: {
        backgroundColor: "secondary",
        opacity: 0.6,
      },
      _hover: {
        backgroundColor: "secondary",
        _disabled: {
          backgroundColor: "secondary",
          opacity: 0.6,
        },
      },
    },
    outlined: {
      cursor: "pointer",
      backgroundColor: "secondaryOutlinedBtnBgColor",
      color: "primary",
      fontWeight: 800,
      borderRadius: "base",
      p: "8px 24px",
      border: "2px solid ",
      borderColor: "secondary",
      _disabled: {
        backgroundColor: "white",
        opacity: 0.6,
      },
      _hover: {
        backgroundColor: "white",
        _disabled: {
          backgroundColor: "white",
          opacity: 0.6,
        },
      },
    },
    ghost: {
      cursor: "pointer",
      backgroundColor: "transparent",
      color: "primary",
      fontWeight: 800,
      _disabled: {
        opacity: 0.6,
      },
      _hover: {
        backgroundColor: "transparent",
      },
      _active: {
        backgroundColor: "transparent",
      },
    },
  },
};
