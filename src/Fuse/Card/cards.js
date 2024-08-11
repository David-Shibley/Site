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
            color: COLORS_ENUM.BLACK,
        },
        {
            value: 5,
            color: COLORS_ENUM.BLACK,
        },
        {
            value: 4,
            color: COLORS_ENUM.BLACK,
        },
        {
            value: 3,
            color: COLORS_ENUM.BLACK,
        }
    ],
    comparator: COMPARATORS_ENUM.NONE,
    point: 3,
    hash: Math.random(),
  },{
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
        }
    ],
    comparator: COMPARATORS_ENUM.STACK,
    point: 2,
    hash: Math.random(),
    requiredOrder: [COLORS_ENUM.BLUE, COLORS_ENUM.YELLOW, COLORS_ENUM.BLACK]
  }
];
