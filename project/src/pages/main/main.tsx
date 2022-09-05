import Card from 'components/card/card';
import Map from 'components/map/map';
import Sort from 'components/sort/sort';
import { useAppSelector } from 'hooks/index';
import { useState } from 'react';
import { getWeatherCards } from 'store/data-process/selector';

export default function Main(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [fullCard, setFullCard] = useState<number | null>(null);
  const [scrollCard, setScrollCard] = useState<number | null>(null);
  const weatherCards = useAppSelector(getWeatherCards);

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
            <div className="weather-content__cards">

              {
                weatherCards.length !== 0 ?
                  weatherCards.map((card) => (
                    <Card
                      key={card.city.id}
                      weatherCard={card}
                      activeCard={activeCard}
                      fullCard={fullCard}
                      scrollCard={scrollCard}
                      setActiveCard={setActiveCard}
                      setFullCard={setFullCard}
                    />)) :
                  <div className="weather-content__help">Выберите город, погода в котором вам интересна</div>
              }
            </div>
          </section>
        </div>
        <Map cards={weatherCards} activeCard={activeCard} fullCard={fullCard} setActiveCard={setActiveCard} setFullCard={setFullCard} setScrollCard={setScrollCard} />
      </section>
    </main>
  );
}
