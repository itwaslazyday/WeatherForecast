const CELVIN_DIFFERENCE = 273.15;

const WIND_DEGREES = {
  default: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
  NORTH: 360,
};

const convertToCelsius = (value: number): string => {
  const celsius = Math.round(value - CELVIN_DIFFERENCE);

  if (celsius <= 0) {
    return `${celsius}°`;
  } else {
    return `+${celsius}°`;
  }
};

const getWindDirection = (degrees: number) => {
  switch (degrees) {
    case WIND_DEGREES.EAST:
      return 'Восточный';
      break;
    case WIND_DEGREES.SOUTH:
      return 'Южный';
      break;
    case WIND_DEGREES.WEST:
      return 'Западный';
      break;
    case WIND_DEGREES.NORTH:
      return 'Северный';
      break;
    case degrees > WIND_DEGREES.default && degrees < WIND_DEGREES.EAST ? true : degrees:
      return 'СВ';
      break;
    case degrees > WIND_DEGREES.EAST && degrees < WIND_DEGREES.SOUTH ? true : degrees:
      return 'ЮВ';
      break;
    case degrees > WIND_DEGREES.SOUTH && degrees < WIND_DEGREES.WEST ? true : degrees:
      return 'ЮЗ';
      break;
    case degrees > WIND_DEGREES.WEST && degrees < WIND_DEGREES.NORTH ? true : degrees:
      return 'СЗ';
      break;
  }
};

export { convertToCelsius, getWindDirection };
