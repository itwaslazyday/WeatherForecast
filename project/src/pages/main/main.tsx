import BigCard from 'components/big-card/big-card';
import Map from 'components/map/map';
import Sort from 'components/sort/sort';
import {makeFakeWeatherCard, FakeCityType, getFutureDaysTemps} from 'utils/mocks';

export default function Main(): JSX.Element {
  const weatherCard = makeFakeWeatherCard(FakeCityType[1]);
  console.log('weatherCard', weatherCard);
  const futureDaysTemps = getFutureDaysTemps(weatherCard);
  console.log('getFutureDaysTemps', futureDaysTemps);

  return (
    <main>
      <section className="weather-app">
        <h1 className="visually-hidden">Прогноз погоды</h1>
        <div className="weather-app__content weather-content">
          <section className="sort-search">
            <div className="sort-search__wrapper">
              <Sort />
            </div>
          </section>
          <section className="weather-content__result">
            <h2 className="visually-hidden">Результаты сортировки</h2>
            <div className="weather-content__big-cards">

              {
                [weatherCard].length !== 0 ?
                  [weatherCard].map((card) => <BigCard key={card.city.id} weatherCard={card} futureDaysTemps={futureDaysTemps}/>) :
                  <div className="weather-content__help">Выберите город, погода в котором вам интересна</div>
              }
            </div>
          </section>
        </div>
        <Map />
      </section>
    </main>
  );
}
