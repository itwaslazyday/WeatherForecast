import BigCard from 'components/big-card/big-card';
import Map from 'components/map/map';
import Sort from 'components/sort/sort';

export default function Main(): JSX.Element {

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
              <BigCard />
            </div>
          </section>
        </div>
        <Map />
      </section>
    </main>
  );
}
