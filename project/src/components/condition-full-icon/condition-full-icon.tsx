import ConditionIcon from 'components/condition-icon/condition-icon';
import { Weather } from 'types/card';
import { convertToUpperCase } from 'utils/common';

type ConditionFullIconProps = {
  weatherCondition: Weather
}

export default function ConditionFullIcon({ weatherCondition }: ConditionFullIconProps): JSX.Element {

  return (
    <div className="card__full-condition card__full-condition--position">
      <ConditionIcon key={weatherCondition.id} iconName={weatherCondition.icon} />
      <span>{convertToUpperCase(weatherCondition.description)}</span>
    </div>
  );
}
