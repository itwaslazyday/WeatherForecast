import { useAppSelector } from 'hooks/index';
import { useEffect, useState } from 'react';
import CardList from 'components/card-list/card-list';
import Map from 'components/map/map';
import Sort from 'components/sort/sort';
import { getCityRepeatId, getWeatherCards } from 'store/data-process/selector';

export default function Main(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [fullCard, setFullCard] = useState<number | null>(null);
  const [scrollCard, setScrollCard] = useState<number | null>(null);
  const weatherCards = useAppSelector(getWeatherCards);
  const existingCardId = useAppSelector(getCityRepeatId);

  useEffect(() => {
    existingCardId ?
      setScrollCard(existingCardId) :
      setScrollCard(weatherCards[weatherCards.length - 1]?.city.id);
  }, [existingCardId, weatherCards]);

  return (
    <main>
      <section className="weather-app">
        <h1 className="visually-hidden">Прогноз погоды</h1>
        <div className="weather-app__content weather-content">
          <section className="sort-search">
            <div className="sort-search__wrapper">
              <Sort setFullCard={setFullCard}/>
            </div>
          </section>
          <section className="weather-content__result">
            <h2 className="visually-hidden">Результаты сортировки</h2>
            <CardList
              weatherCards={weatherCards}
              existingCardId={existingCardId}
              activeCard={activeCard}
              fullCard={fullCard}
              scrollCard={scrollCard}
              setActiveCard={setActiveCard}
              setFullCard={setFullCard}
            />
          </section>
        </div>
        <Map cards={weatherCards} activeCard={activeCard} fullCard={fullCard} setActiveCard={setActiveCard} setFullCard={setFullCard} setScrollCard={setScrollCard} />
      </section>
    </main>
  );
}
