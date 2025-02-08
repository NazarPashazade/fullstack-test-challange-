export const Checkbox = {
  variants: {
    selectOption: {
      control: {
        height: "20px",
        width: "20px",
        borderColor: "borderColor",
        borderRadius: "small",
        borderWidth: "1px",
        _checked: {
          backgroundColor: "secondary",
          borderColor: "secondary",
          cursor: "pointer",
          _hover: {
            backgroundColor: "secondary",
            borderColor: "secondary",
          },
        },
      },
      label: {
        cursor: "auto",
      },
    },
  },
};
