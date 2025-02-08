const colors = {
  //primary
  primary: "#F8784F",

  //secondary
  secondary: "#428698",
  secondaryDark: "#0D6C85",
  secondaryLight: "rgba(66, 134, 152, 0.3)",

  // border
  borderColor: "#d7d7d7",

  // text
  textColor: "#181818",

  // hint
  hintColor: "#575757",

  // error
  errorColor: "#E25969",
  errorBgColor: "#FFE7EA",

  // success
  successColor: "#5CA768",

  //tabe
  headerThTableColor: "#8F8F8F",
  rowOddTdTableBgColor: "#F8F8F8",
  tableBgColor: "#fffff",

  // button
  disabledBtnBgColor: "#D7D7D7",
  disabledBtnTextColor: "#8F8F8F",
  cancelBtnBgColor: "#F1F1F1",
  cancelBtnTextColor: "#F1F1F1",
  secondaryOutlinedBtnBgColor: "#F8F8F8",

  //input
  inputFocusBorderColor: "#7E7E7E",
  inputBorderColor: "#e2e8f0",

  gray: {
    40: "#F1F1F1",
    50: "#E7E7E7",
    60: "#EDEDED",
    80: "#68686817",
    100: "#F1F1F1",
  },
} as const;

export type Colors = typeof colors;
export default colors;
