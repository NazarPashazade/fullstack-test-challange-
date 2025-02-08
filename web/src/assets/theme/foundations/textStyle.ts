export const FONT_WEIGHT = {
  EXTRABOLD: 800,
  BOLD: 700,
  SEMIBOLD: 600,
  MEDIUM: 500,
  NORMAL: 400,
};

const textStyles = {
  label: {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: "12px",
    color: "textColor",
  },
  title: {
    fontSize: "30px",
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: "16px",
    color: "textColor",
  },
  text: {
    fontSize: "14px",
    fontWeight: FONT_WEIGHT.MEDIUM,
    lineHeight: "24px",
    color: "textColor",
  },
  textHint: {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: "12px",
    color: "hintColor",
  },
  noMatchesTitle: {
    fontSize: "26px",
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: "28px",
    color: "textColor",
  },
};

export type TextStyles = typeof textStyles;

export default textStyles;
