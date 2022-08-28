type BigCardIconProps = {
  iconName: string
}

export default function BigCardIcon({ iconName }: BigCardIconProps): JSX.Element {

  return (
    <img src={`http://openweathermap.org/img/wn/${iconName}@2x.png`} width='50' height='50' alt="" />
  );
}
