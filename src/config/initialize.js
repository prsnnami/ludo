export const init = { 
  red_home_squares: [
    "a00", "b00", "c00", "d00", "e00", "f00",
    "a01", /*"b01",*/ "c01", "d01", /*"e01",*/ "f01",
    "a02", "b02", "c02", "d02", "e02", "f02",
    "a03", "b03", "c03", "d03", "e03", "f03",
    "a04", /*"b04",*/ "c04", "d04", /*"e04",*/ "f04",
    "a05", "b05", "c05", "d05", "e05", "f05"
  ],
  blue_home_squares: [
    "j00", "k00", "l00", "m00", "n00", "o00",
    "j01", /*"k01",*/ "l01", "m01", /*"n01",*/ "o01",
    "j02", "k02", "l02", "m02", "n02", "o02",
    "j03", "k03", "l03", "m03", "n03", "o03",
    "j04", /*"k04",*/ "l04", "m04", /*"n04",*/ "o04",
    "j05", "k05", "l05", "m05", "n05", "o05",
  ],
  yellow_home_squares: [
    "j09", "k09", "l09", "m09", "n09", "o09",
    "j10", /*"k10",*/ "l10", "m10", /*"n10",*/ "o10",
    "j11", "k11", "l11", "m11", "n11", "o11",
    "j12", "k12", "l12", "m12", "n12", "o12",
    "j13", /*"k13",*/ "l13", "m13", /*"n13",*/ "o13",
    "j14", "k14", "l14", "m14", "n14", "o14",
  ],
  green_home_squares: [
    "a09", "b09", "c09", "d09", "e09", "f09",
    "a10", /*"b10",*/ "c10", "d10", /*"e10",*/ "f10",
    "a11", "b11", "c11", "d11", "e11", "f11",
    "a12", "b12", "c12", "d12", "e12", "f12",
    "a13", /*"b13",*/ "c13", "d13", /*"e13",*/ "f13",
    "a14", "b14", "c14", "d14", "e14", "f14",
  ],
  red_path_squares: [
    "b07", "c07", "d07", "e07", "f07", "g07"
  ],
  blue_path_squares: [
    "h01", "h02", "h03", "h04", "h05", "h06" 
  ],
  yellow_path_squares: [
    "i07", "j07", "k07", "l07", "m07", "n07" 
  ],
  green_path_squares: [
    "h08", "h09", "h10", "h11", "h12", "h13" 
  ],
  dead_states: [
    "g06", "g08", "i06", "i08", "h07"
  ],
  red_start_square: "b06",
  blue_start_square: "i01",
  yellow_start_square: "n08",
  green_start_square: "g13",
  safe_states: [
    "g02", "m06", "c08", "i12" 
  ],
  end_states: [
    "g07", "h06", "h08", "i07"
  ]
}