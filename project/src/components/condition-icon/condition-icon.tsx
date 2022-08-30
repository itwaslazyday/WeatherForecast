type ConditionIconProps = {
  iconName: string
}

export default function ConditionIcon({ iconName }: ConditionIconProps): JSX.Element {

  return (
    <img src={`http://openweathermap.org/img/wn/${iconName}@2x.png`} width='70' height='70' alt="Иконка текущей погоды" />
  );
}
