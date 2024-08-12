import { COLORS_ENUM, VALUES_ENUM, COMPARATORS_ENUM } from '../constants';
export const CardsList = [
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.ANY,
        hash: `${COLORS_ENUM.ANY}_${VALUES_ENUM.ANY_NUMBER}`,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.ANY,
        hash: `${COLORS_ENUM.ANY}_${VALUES_ENUM.ANY_NUMBER}`,
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
        color: COLORS_ENUM.ANY,
      },
      {
        value: 5,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 4,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 3,
        color: COLORS_ENUM.ANY,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 3,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.BLUE,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.YELLOW,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.BLACK,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 2,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.BLUE, COLORS_ENUM.YELLOW, COLORS_ENUM.BLACK],
  },
  {
    dice: [
      {
        value: 1,
        color: COLORS_ENUM.RED,
      },
      {
        value: 6,
        color: COLORS_ENUM.RED,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 5,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: 2,
        color: COLORS_ENUM.GREEN,
      },
      {
        value: 4,
        color: COLORS_ENUM.GREEN,
      },
      {
        value: 6,
        color: COLORS_ENUM.GREEN,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 4,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.RED,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.GREEN,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.BLUE,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 3,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.RED, COLORS_ENUM.GREEN, COLORS_ENUM.BLUE],
  },
  {
    dice: [
      {
        value: 1,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 2,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 3,
        color: COLORS_ENUM.ANY,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 2,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: 6,
        color: COLORS_ENUM.BLUE,
      },
      {
        value: 6,
        color: COLORS_ENUM.BLUE,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 6,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.YELLOW,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.RED,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 4,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.YELLOW, COLORS_ENUM.RED],
  },
  {
    dice: [
      {
        value: 5,
        color: COLORS_ENUM.BLACK,
      },
      {
        value: 5,
        color: COLORS_ENUM.BLACK,
      },
      {
        value: 5,
        color: COLORS_ENUM.BLACK,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 7,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: 1,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 3,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 5,
        color: COLORS_ENUM.ANY,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 3,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.BLACK,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.RED,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.GREEN,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 5,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.BLACK, COLORS_ENUM.RED, COLORS_ENUM.GREEN],
  },
  {
    dice: [
      {
        value: 2,
        color: COLORS_ENUM.BLUE,
      },
      {
        value: 4,
        color: COLORS_ENUM.BLUE,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 4,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: 6,
        color: COLORS_ENUM.RED,
      },
      {
        value: 6,
        color: COLORS_ENUM.BLACK,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 3,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.GREEN,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.YELLOW,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 3,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.GREEN, COLORS_ENUM.YELLOW],
  },
  {
    dice: [
      {
        value: 4,
        color: COLORS_ENUM.BLUE,
      },
      {
        value: 4,
        color: COLORS_ENUM.YELLOW,
      },
      {
        value: 4,
        color: COLORS_ENUM.RED,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 6,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: 3,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 6,
        color: COLORS_ENUM.ANY,
      },
      {
        value: 1,
        color: COLORS_ENUM.ANY,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 2,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.BLACK,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.RED,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.YELLOW,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 4,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.BLACK, COLORS_ENUM.RED, COLORS_ENUM.YELLOW],
  },
  {
    dice: [
      {
        value: 5,
        color: COLORS_ENUM.RED,
      },
      {
        value: 5,
        color: COLORS_ENUM.YELLOW,
      },
    ],
    comparator: COMPARATORS_ENUM.EQUAL,
    point: 5,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: 2,
        color: COLORS_ENUM.GREEN,
      },
      {
        value: 3,
        color: COLORS_ENUM.GREEN,
      },
      {
        value: 4,
        color: COLORS_ENUM.GREEN,
      },
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 3,
    hash: Math.random(),
  },
  {
    dice: [
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.YELLOW,
      },
      {
        value: VALUES_ENUM.ANY,
        color: COLORS_ENUM.BLUE,
      },
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 3,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.YELLOW, COLORS_ENUM.BLUE],
  },
];
