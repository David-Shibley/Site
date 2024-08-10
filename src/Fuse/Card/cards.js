const VALUES_ENUM = {
  ANY_COLOR: "any color",
  ANY_NUMBER: "any number",
  ANY_COLOR_OR_NUMBER: "any color or number",
  COLOR_AND_NUMBER: "color and number",
};

const COMPARATORS_ENUM = {
  EQUAL: "equal",
  GREATER_THAN: "greater than",
  LESS_THAN: "less than",
  GREATER_THAN_OR_EQUAL: "greater than or equal",
  LESS_THAN_OR_EQUAL: "less than or equal",
  NOT_EQUAL: "not equal",
  NONE: "none",
  STACK: "stack",
};

const COLORS_ENUM = {
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
    YELLOW: "yellow",
    PURPLE: "purple",
    ORANGE: "orange",
    BLACK: "black",
    WHITE: "white",
};

export const CardsList = [
  {
    dice: [
      {
        value: VALUES_ENUM.COLOR_AND_NUMBER,
        chosenColor: COLORS_ENUM.WHITE,
      },
      {
        value: VALUES_ENUM.COLOR_AND_NUMBER,
        chosenColor: COLORS_ENUM.WHITE,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 4,
    hash: Math.random(),
  },
  {
    dice: [
        {
            value: 3,
            chosenColor: COLORS_ENUM.BLACK,
        },
        {
            value: 5,
            chosenColor: COLORS_ENUM.BLACK,
        },
        {
            value: 4,
            chosenColor: COLORS_ENUM.BLACK,
        },
        {
            value: 3,
            chosenColor: COLORS_ENUM.BLACK,
        }
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 3,
    hash: Math.random(),
  },{
    dice: [
        {
            value: COLORS_ENUM.BLUE,
            chosenColor: COLORS_ENUM.BLUE,
        },
        {
            value: COLORS_ENUM.YELLOW,
            chosenColor: COLORS_ENUM.YELLOW,
        },
        {
            value: COLORS_ENUM.BLACK,
            chosenColor: COLORS_ENUM.BLACK,
        }
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 2,
    hash: Math.random(),
  }
];
