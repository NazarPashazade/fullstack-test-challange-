import { FONT_WEIGHT } from "../foundations/textStyle";

export const Table = {
  variants: {
    striped: {
      table: {
        border: "1px solid transparent",
        bg: "tableBgColor",
        color: "textColor",
        thead: {
          fontSize: "16px",
          fontWeight: FONT_WEIGHT.BOLD,
          tr: {
            th: {
              padding: "12px",
            },
          },
        },
        tbody: {
          tr: {
            "&:hover": {
              color: "secondaryDark",
            },
            _odd: {
              td: {
                borderRight: "1px solid #D9D9D9",
                fontSize: "14px",
                fontWeight: 500,
                padding: "12px",
                wordWrap: "break-word",
                bg: "rowOddTdTableBgColor",
              },
            },
            td: {
              padding: "12px",
              borderRight: "1px solid #D9D9D9",
              fontSize: "14px",
              fontWeight: 500,
              wordWrap: "break-word",
              "&:last-child": {
                borderRight: "none",
              },
            },
          },
        },
      },
    },
  },
  defaultProps: {
    variant: "striped",
  },
};
