import {StyleSheet} from 'react-native';

export const PRIMARY_THEME = {
  PRIMARY_COLOR: '#072B2C',
  PRIMARY_COLOR_TRANSPARENT: '#08494A',
  SECONDARY_COLOR: '#131F28',
  INACTIVE_COLOR: '#BCBCBC',
  INACTIVE_COLOR_LIGHT: '#E8E8E8',
  INACTIVE_COLOR_DARK: '#D8D8D8',
  PLACEHOLDER_COLOR: '##6F7C82B2',
  STATE_RED: '#C94444',
  STATE_YELLOW: '#FFD247',
  STATE_GREEN: '#0C4C38',
  STATE_GREY: '#F0F0F0',
};
export const FONT_FAMILY_LATO = {
  thin: 'Lato-Thin',
  light: 'Lato-Light',
  regular: 'Lato-Regular',
  semibold: 'Lato-Bold',
  bold: 'Lato-Black',
};
export const FONT_FAMILY_APERTO = {
  regular: 'Aperto-Regular',
  semiBold: 'Aperto-SemiBold',
  bold: 'Aperto-Bold',
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#111420',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  // Justify Content
  jcfe: {
    justifyContent: 'flex-end',
  },
  jcc: {
    justifyContent: 'center',
  },
  jcfs: {
    justifyContent: 'flex-start',
  },
  jcsa: {
    justifyContent: 'space-around',
  },
  jcsb: {
    justifyContent: 'space-between',
  },
  jcse: {
    justifyContent: 'space-evenly',
  },
  // Justify Content
  // Text Align
  tac: {
    textAlign: 'center',
  },
  // alignitems
  itc: {
    alignItems: 'center',
  },
  its: {
    alignItems: 'flex-start',
  },
  ite: {
    alignItems: 'flex-end',
  },
  ase: {
    alignSelf: 'flex-end',
  },
  // Flex
  flex1: {flex: 1},
  w100: {width: '100%'},
  w164p: {width: 164},
  w100p: {width: 100},
  w300p: {width: 300},
  w500p: {width: 500},
  w80p: {width: 80},
  w250p: {width: '108%'},
  w90: {width: '90%'},
  w85: {width: '85%'},
  h100: {height: '100%'},
  w40: {width: '40%'},
  w50: {width: '50%'},
  w60: {width: '60%'},
  h50: {height: '50%'},
  w25: {width: '25%'},
  h25: {height: '25%'},
  w75: {width: '75%'},
  h75: {height: '75%'},
  h130p: {height: 130},
  h160p: {height: 160},
  h32p: {height: 32},
  h36p: {height: 36},
  h42p: {height: 42},
  h48p: {height: 48},
  h200p: {height: 200},
  h250p: {height: 250},
  h300p: {height: 300},
  h350p: {height: 350},
  h380p: {height: 380},
  h480p: {height: 480},
  h400p: {height: 400},
  h100p: {height: 100},
  h56p: {height: 56},
  h72p: {height: 72},
  h70p: {height: 70},

  // Flex

  // flex direction
  fdrjcsb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fdrjcse: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  fdrrjcsb: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  fdrac: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fdrcc: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  // flex direction
  // Font Sizes
  fs55: {
    fontSize: 55,
  },
  fs45: {
    fontSize: 45,
  },
  fs50: {
    fontSize: 50,
  },
  fs40: {
    fontSize: 40,
  },
  fs35: {
    fontSize: 35,
  },
  fs30: {
    fontSize: 30,
  },
  fs25: {
    fontSize: 25,
  },
  fs26: {
    fontSize: 26,
  },
  fs22: {
    fontSize: 22,
  },
  fs24: {
    fontSize: 24,
  },
  fs20: {
    fontSize: 20,
  },
  fs18: {
    fontSize: 18,
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  fs12: {
    fontSize: 12,
  },
  fs10: {
    fontSize: 10,
  },
  fs11: {
    fontSize: 11,
  },
  // Font Sizes
  // Font Families
  fft: {
    fontFamily: FONT_FAMILY_LATO.thin,
  },
  ffl: {
    fontFamily: FONT_FAMILY_LATO.light,
  },
  ffr: {
    fontFamily: FONT_FAMILY_LATO.regular,
  },
  ffsb: {
    fontFamily: FONT_FAMILY_LATO.semibold,
  },
  ffb: {
    fontFamily: FONT_FAMILY_LATO.bold,
  },
  // Font Families
  // Colors

  colorWhite: {
    color: '#ffffff',
  },
  colorBlack: {
    color: '#37474F',
  },
  colorBlue: {
    color: '#2856A2',
  },
  colorgreen: {
    color: '#1fcc7c',
  },
  colorLightBlue: {
    color: '#A3C7EE',
  },
  colorlightgreen: {
    color: '#a0ffd3',
  },
  colorlightred: {
    color: '#ff9d98',
  },
  colorred: {
    color: '#E85451',
  },
  colorlightpurple: {
    color: '#7471eb',
  },
  colorpurple: {
    color: '#4733da',
  },
  colorgrey: {
    color: '#a3a3a3',
  },
  colorlightgrey: {
    color: '#fefefe',
  },
  colorlightblack: {
    color: '#191919',
  },
  colorlightblack2: {
    color: '#4f4f4f',
  },
  colorextralightpurple: {
    color: '#e9e8fd',
  },
  colorLightWhite: {
    color: '#758692',
  },

  colorgrey2: {
    color: '#7d7d7d',
  },
  colorgrey3: {
    color: '#E8E8E8',
  },
  colorgrey4: {
    color: '#737678',
  },

  // Colors
  // Background Colors
  bgColorYellow: {
    backgroundColor: '#FFF600',
  },
  bgColorGreen: {
    backgroundColor: '#4F9A90',
  },
  bgColorPrimary: {
    backgroundColor: '#008080',
  },
  bgColorRed: {
    backgroundColor: '#f85951',
  },
  bgLightRed: {backgroundColor: '#E85451'},

  bgColorWhite: {
    backgroundColor: '#FFFFFF',
  },
  bgColorGrey: {
    backgroundColor: '#d9dadd',
  },
  bgColorWhiteTwo: {
    backgroundColor: '#F5F5F5',
  },
  bgColorWhiteWithOpacity: {
    backgroundColor: '#ffffffbf',
  },
  bgcolorblack: {
    backgroundColor: '#37474F',
  },
  bgLightBlue: {
    backgroundColor: '#3766b3',
  },
  bgColorBlue: {
    backgroundColor: '#2856a2',
  },
  bgColorGray: {
    backgroundColor: '#F2F2F2',
  },
  bgcolorlightgrey: {
    backgroundColor: '#fefefe',
  },
  bgcolorlightgrey2: {
    backgroundColor: '#f3f3f3',
  },
  bgcolorlightblack: {
    backgroundColor: '#191919',
  },
  bgcolororange: {
    backgroundColor: '#f4a261',
  },
  bgcolorlightgrey3: {
    backgroundColor: '#F2F2F2',
  },
  bggreyy: {backgroundColor: '#EDEDED'},
  // Background Colors
  // line Height
  lh5: {
    lineHeight: 5,
  },
  lh10: {
    lineHeight: 10,
  },
  lh15: {
    lineHeight: 15,
  },
  lh18: {
    lineHeight: 18,
  },
  lh20: {
    lineHeight: 20,
  },
  lh25: {
    lineHeight: 25,
  },
  lh30: {
    lineHeight: 30,
  },
  // line Height
  // border Radius
  br2: {
    borderRadius: 2,
  },
  br4: {
    borderRadius: 4,
  },
  br5: {
    borderRadius: 5,
  },
  br8: {
    borderRadius: 8,
  },
  br10: {
    borderRadius: 10,
  },
  br12: {
    borderRadius: 12,
  },
  br14: {
    borderRadius: 14,
  },
  br15: {
    borderRadius: 15,
  },
  br16: {
    borderRadius: 16,
  },
  br18: {
    borderRadius: 18,
  },
  br20: {
    borderRadius: 20,
  },
  br25: {
    borderRadius: 25,
  },
  br30: {
    borderRadius: 30,
  },

  br35: {
    borderRadius: 35,
  },
  br40: {
    borderRadius: 40,
  },
  br45: {
    borderRadius: 45,
  },
  br50: {
    borderRadius: 50,
  },
  br55: {
    borderRadius: 55,
  },
  br60: {
    borderRadius: 60,
  },
  btlr8: {
    borderTopLeftRadius: 8,
  },
  bblr8: {
    borderBottomLeftRadius: 8,
  },
  bbrr8: {
    borderBottomRightRadius: 8,
  },
  btrr8: {
    borderTopRightRadius: 8,
  },

  btr16: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  // border Radius

  //borderWidth
  bw0: {
    borderWidth: 0,
  },
  bw1: {
    borderWidth: 1,
  },
  bw2: {
    borderWidth: 2,
  },
  bw3: {
    borderWidth: 3,
  },
  btw1: {
    borderTopWidth: 1,
  },
  //borderWidth

  //borderColor
  bclightgrey: {
    borderColor: '#F2F2F2',
  },
  bclightgreyOne: {
    borderColor: '#DDDDDD',
  },
  bcWhite: {
    borderColor: '#FFFFFF',
  },
  bcPrimary: {
    borderColor: '#E85451',
  },
  bcPrimaryTransparent: {borderColor: '#08494A'},
  bcBlack: {
    borderColor: '#37474F',
  },
  bclightgreyTwo: {
    borderColor: '#BBBBBB',
  },
  //borderColor

  // Padding
  p2: {padding: 2},
  p3: {padding: 3},
  p4: {padding: 4},
  p5: {padding: 5},
  p8: {padding: 8},
  p10: {padding: 10},
  p12: {padding: 12},
  p15: {padding: 15},
  p16: {padding: 16},
  p20: {padding: 20},
  p25: {padding: 25},
  p30: {padding: 30},
  p35: {padding: 35},
  p40: {padding: 40},
  p45: {padding: 45},
  // Padding
  // paddingRight
  pr5: {paddingRight: 5},
  pr10: {paddingRight: 10},
  pr15: {paddingRight: 15},
  pr20: {paddingRight: 20},
  pr24: {paddingRight: 24},
  pr25: {paddingRight: 25},
  pr30: {paddingRight: 30},
  pr35: {paddingRight: 35},
  pr40: {paddingRight: 40},
  pr45: {paddingRight: 45},
  // paddingRight
  // paddingTop
  pt0: {paddingTop: 0},
  pt5: {paddingTop: 5},
  pt8: {paddingTop: 8},
  pt10: {paddingTop: 10},
  pt12: {paddingTop: 12},
  pt15: {paddingTop: 15},
  pt18: {paddingTop: 18},
  pt20: {paddingTop: 20},
  pt24: {paddingTop: 24},
  pt25: {paddingTop: 25},
  pt30: {paddingTop: 30},
  pt35: {paddingTop: 35},
  pt40: {paddingTop: 40},
  pt45: {paddingTop: 45},
  pt76: {paddingTop: 76},

  // paddingTop
  // paddingBottom
  pb5: {paddingBottom: 5},
  pb10: {paddingBottom: 10},
  pb15: {paddingBottom: 15},
  pb20: {paddingBottom: 20},
  pb25: {paddingBottom: 25},
  pb30: {paddingBottom: 30},
  pb35: {paddingBottom: 35},
  pb40: {paddingBottom: 40},
  pb45: {paddingBottom: 45},
  // paddingBottom
  // paddingLeft
  pl5: {paddingLeft: 5},
  pl10: {paddingLeft: 10},
  pl12: {paddingLeft: 12},
  pl15: {paddingLeft: 15},
  pl16: {paddingLeft: 16},
  pl18: {paddingLeft: 18},
  pl20: {paddingLeft: 20},
  pl24: {paddingLeft: 24},
  pl25: {paddingLeft: 25},
  pl30: {paddingLeft: 30},
  pl35: {paddingLeft: 35},
  pl40: {paddingLeft: 40},
  pl45: {paddingLeft: 45},
  // paddingLeft
  // paddingHorizontal
  ph0: {paddingHorizontal: 0},
  ph5: {paddingHorizontal: 5},
  ph6: {paddingHorizontal: 6},
  ph8: {paddingHorizontal: 8},
  ph10: {paddingHorizontal: 10},
  ph12: {paddingHorizontal: 12},
  ph15: {paddingHorizontal: 15},
  ph16: {paddingHorizontal: 16},
  ph18: {paddingHorizontal: 18},
  ph20: {paddingHorizontal: 20},
  ph23: {paddingHorizontal: 23},
  ph25: {paddingHorizontal: 25},
  ph30: {paddingHorizontal: 30},
  ph35: {paddingHorizontal: 35},
  ph40: {paddingHorizontal: 40},
  ph45: {paddingHorizontal: 45},
  // paddingHorizontal
  // paddingVertical
  pv3: {paddingVertical: 3},
  pv4: {paddingVertical: 4},
  pv5: {paddingVertical: 5},
  pv6: {paddingVertical: 6},
  pv8: {paddingVertical: 8},
  pv10: {paddingVertical: 10},
  pv12: {paddingVertical: 12},
  pv15: {paddingVertical: 15},
  pv20: {paddingVertical: 20},
  pv25: {paddingVertical: 25},
  pv30: {paddingVertical: 30},
  pv32: {paddingVertical: 32},
  pv34: {paddingVertical: 34},
  pv35: {paddingVertical: 35},
  pv40: {paddingVertical: 40},
  pv45: {paddingVertical: 45},
  // paddingVertical
  // margin
  m0: {margin: 0},
  m5: {margin: 5},
  m10: {margin: 10},
  m15: {margin: 15},
  m20: {margin: 20},
  m25: {margin: 25},
  m30: {margin: 30},
  m35: {margin: 35},
  m40: {margin: 40},
  m45: {margin: 45},
  // margin
  // paddingRight
  mr0: {marginRight: 0},
  mr5: {marginRight: 5},
  mr6: {marginRight: 6},
  mr8: {marginRight: 8},
  mr10: {marginRight: 10},
  mr12: {marginRight: 12},
  mr15: {marginRight: 15},
  mr16: {marginRight: 16},
  mr18: {marginRight: 18},
  mr20: {marginRight: 20},
  mr25: {marginRight: 25},
  mr30: {marginRight: 30},
  mr35: {marginRight: 35},
  mr40: {marginRight: 40},
  mr45: {marginRight: 45},
  // marginRight
  // marginTop
  mt0: {marginTop: 0},
  mt2: {marginTop: 2},
  mt4: {marginTop: 4},
  mt5: {marginTop: 5},
  mt6: {marginTop: 6},
  mt8: {marginTop: 8},
  mt10: {marginTop: 10},
  mt12: {marginTop: 12},
  mt14: {marginTop: 14},
  mt15: {marginTop: 15},
  mt16: {marginTop: 16},
  mt17: {marginTop: 17},
  mt18: {marginTop: 18},
  mt20: {marginTop: 20},
  mt25: {marginTop: 25},
  mt28: {marginTop: 28},
  mt30: {marginTop: 30},
  mt35: {marginTop: 35},
  mt40: {marginTop: 40},
  mt45: {marginTop: 45},
  mt52: {marginTop: 52},
  mt72: {marginTop: 72},

  // marginTop
  // marginBottom
  mb0: {marginBottom: 0},
  mb2: {marginBottom: 2},
  mb4: {marginBottom: 4},
  mb5: {marginBottom: 5},
  mb6: {marginBottom: 6},
  mb8: {marginBottom: 8},
  mb10: {marginBottom: 10},
  mb12: {marginBottom: 12},
  mb15: {marginBottom: 15},
  mb20: {marginBottom: 20},
  mb25: {marginBottom: 25},
  mb28: {marginBottom: 28},
  mb30: {marginBottom: 30},
  mb35: {marginBottom: 35},
  mb40: {marginBottom: 40},
  mb43: {marginBottom: 43},
  mb45: {marginBottom: 45},
  mb60: {marginBottom: 60},
  mb70: {marginBottom: 70},
  mb80: {marginBottom: 80},
  // marginBottom
  // marginLeft
  ml0: {marginLeft: 0},
  ml5: {marginLeft: 5},
  ml10: {marginLeft: 10},
  ml12: {marginLeft: 12},
  ml15: {marginLeft: 15},
  ml16: {marginLeft: 16},
  ml20: {marginLeft: 20},
  ml25: {marginLeft: 25},
  ml30: {marginLeft: 30},
  ml35: {marginLeft: 35},
  ml40: {marginLeft: 40},
  ml45: {marginLeft: 45},
  // marginLeft

  // marginHorizontal
  mh5: {marginHorizontal: 5},
  mh10: {marginHorizontal: 10},
  mh14: {marginHorizontal: 14},
  mh15: {marginHorizontal: 15},
  mh16: {marginHorizontal: 16},
  mh20: {marginHorizontal: 20},
  mh25: {marginHorizontal: 25},
  mh30: {marginHorizontal: 30},
  mh35: {marginHorizontal: 35},
  mh40: {marginHorizontal: 40},
  mh45: {marginHorizontal: 45},
  // marginHorizontal
  // marginVertical
  mv5: {marginVertical: 5},
  mv8: {marginVertical: 8},
  mv10: {marginVertical: 10},
  mv15: {marginVertical: 15},
  mv20: {marginVertical: 20},
  mv25: {marginVertical: 25},
  mv30: {marginVertical: 30},
  mv35: {marginVertical: 35},
  mv40: {marginVertical: 40},
  mv45: {marginVertical: 45},
  // marginVertical
  // Shadow of box
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.074,
    shadowRadius: 3.84,

    elevation: 4,
  },
  shadow2: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },

  // shadow of box

  //ResizeModes
  rsmc: {
    resizeMode: 'contain',
  },
  rsmcr: {
    resizeMode: 'center',
  },
  rsmco: {
    resizeMode: 'cover',
  },
  rsmr: {
    resizeMode: 'repeat',
  },
  rsms: {
    resizeMode: 'stretch',
  },
  //ResizeModes

  //Text Transform
  ttuc: {
    textTransform: 'uppercase',
  },
  ttc: {
    textTransform: 'capitalize',
  },
  ttl: {
    textTransform: 'lowercase',
  },
  ttn: {
    textTransform: 'none',
  },
  //Text Transform
  fdr: {
    flexDirection: 'row',
  },
  fdrjc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fdc: {
    flexDirection: 'column',
  },
  bold25: {
    fontSize: 25,
    fontFamily: FONT_FAMILY_LATO.bold,
    color: '#072B2C',
  },

  semiBold36: {
    fontSize: 36,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },

  semiBold24: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  semiBold20: {
    fontSize: 20,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  semiBold18: {
    fontSize: 18,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  semiBold16: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  semiBold14: {
    fontSize: 14,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  semiBold12: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  semiBold10: {
    fontSize: 10,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  bold36: {
    fontSize: 36,
    fontFamily: FONT_FAMILY_LATO.bold,
    color: '#072B2C',
  },
  medium16: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  medium14: {
    fontSize: 14,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  medium12: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  medium10: {
    fontSize: 10,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  medium8: {
    fontSize: 8,
    fontFamily: FONT_FAMILY_LATO.semibold,
    color: '#072B2C',
  },
  regular10: {
    fontSize: 10,
    fontFamily: FONT_FAMILY_LATO.regular,
    color: '#072B2C',
  },
  regular12: {
    fontSize: 12,
    fontFamily: FONT_FAMILY_LATO.regular,
    color: '#072B2C',
  },
  regular14: {
    fontSize: 14,
    fontFamily: FONT_FAMILY_LATO.regular,
    color: '#072B2C',
  },
  regular16: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_LATO.regular,
    color: '#072B2C',
  },
  apertoRegular: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_APERTO.regular,
    color: '#FFF',
  },
  apertoRegular24: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_APERTO.regular,
    color: '#FFF',
  },
  apertoRegular28: {
    fontSize: 28,
    fontFamily: FONT_FAMILY_APERTO.regular,
    color: '#FFF',
  },
  apertoSemiBold16: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_APERTO.semiBold,
    color: '#FFF',
  },
  apertoSemiBold24: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_APERTO.semiBold,
    color: '#FFF',
  },
  apertoSemiBold28: {
    fontSize: 28,
    fontFamily: FONT_FAMILY_APERTO.semiBold,
    color: '#FFF',
  },
  apertoBold16: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_APERTO.bold,
    color: '#FFF',
  },
  apertoBold24: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_APERTO.bold,
    color: '#FFF',
  },
  apertoBold28: {
    fontSize: 28,
    fontFamily: FONT_FAMILY_APERTO.bold,
    color: '#FFF',
  },
  widthHeight8: {
    width: 8,
    height: 8,
  },
  widthHeight70: {
    width: 70,
    height: 70,
  },

  widthHeight10: {
    width: 10,
    height: 10,
  },
  widthHeight12: {
    width: 12,
    height: 12,
  },
  widthHeight14: {
    width: 14,
    height: 14,
  },
  widthHeight16: {
    width: 16,
    height: 16,
  },
  widthHeight18: {
    width: 18,
    height: 18,
  },
  widthHeight20: {
    width: 20,
    height: 20,
  },
  width24Height28: {
    width: 24,
    height: 28,
  },
  widthHeight24: {
    width: 24,
    height: 24,
  },
  widthHeight32: {
    width: 32,
    height: 32,
  },
  widthHeight41: {
    width: 41,
    height: 41,
  },
  widthHeight48: {
    width: 48,
    height: 48,
  },
  widthHeight60: {
    width: 60,
    height: 60,
  },
});

export default styles;
