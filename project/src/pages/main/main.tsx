import BigCard from 'components/big-card/big-card';
import Map from 'components/map/map';
import Sort from 'components/sort/sort';
import { useAppSelector } from 'hooks/index';
import { useState } from 'react';
import { getWeatherCards } from 'store/data-process/selector';

export default function Main(): JSX.Element {
  const [isActive, setActive] = useState<number | null>(null);
  const [isFull, setFull] = useState<number | null>(null);
  const weatherCards = useAppSelector(getWeatherCards);
  console.log(isFull);
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
                weatherCards.length !== 0 ?
                  weatherCards.map((card) => <BigCard key={card.city.id} weatherCard={card} isActive={isActive} isFull={isFull} setActive={setActive} setFull={setFull} />) :
                  <div className="weather-content__help">Выберите город, погода в котором вам интересна</div>
              }
            </div>
          </section>
        </div>
        <Map cards={weatherCards} isActive={isActive} isFull={isFull} setActive={setActive} setFull={setFull} />
      </section>
    </main>
  );
}
