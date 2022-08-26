export default function BigCard(): JSX.Element {

  return (
    <div className="big-card">
      <div className="big-card__header">
        <span className="icon icon--strips-big"></span>
        <span className="big-card__city">Великий Новгород</span>
        <span className="big-card__time">22:40</span>
      </div>
      <div className="big-card__content">
        <div className="big-card__content-wrapper">
          <div className="big-card__weather-conditions">
            <span className="icon icon--rainy"></span>
            <span className="icon icon--meteor-shower"></span>
            <span className="icon icon--tornado"></span>
          </div>
          <div className="big-card__wind">
            <span className="icon icon--wind"></span>
            <span className="big-card__wind-info">Ветер ЮВ, 0-1 м/с</span>
          </div>
        </div>
        <span className="big-card__temperature">+12°</span>
      </div>
    </div>
  );
}
