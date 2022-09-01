import { ConditionServer } from 'types/card';

const adaptConditionToClient = (condition: ConditionServer) => {
  const adaptedCondition = {
    ...condition,
    main: {
      ...condition.main,
      feelsLike: condition.main.feels_like,
      tempMin: condition.main.temp_min,
      tempMax: condition.main.temp_max,
      seaLevel: condition.main.sea_level,
      grndLevel: condition.main.grnd_level,
      tempKf: condition.main.temp_kf
    },
    dtTxt: condition.dt_txt
  };

  delete adaptedCondition.main.feels_like;
  delete adaptedCondition.main.temp_min;
  delete adaptedCondition.main.temp_max;
  delete adaptedCondition.main.sea_level;
  delete adaptedCondition.main.grnd_level;
  delete adaptedCondition.main.temp_kf;
  delete adaptedCondition.dt_txt;
  console.log(adaptedCondition);

  return adaptedCondition;
};

export { adaptConditionToClient };
