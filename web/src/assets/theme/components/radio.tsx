export const Radio = {
  variants: {
    primary: {
      color: "secondary",
      control: {
        w: "20px",
        h: "20px",
        color: "secondary",
        _checked: {
          background: "secondary",
          borderColor: "secondary",
        },
        _hover: {
          _checked: {
            background: "secondary",
            borderColor: "secondary",
          },
        },
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};
