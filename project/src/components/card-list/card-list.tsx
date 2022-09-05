import Card from 'components/card/card';
import {updateWeatherCards} from 'store/data-process/data-process';
import {useEffect, useState } from 'react';
import { WeatherCard } from 'types/card';
import { useAppDispatch } from 'hooks';


type BigCardListProps = {
  weatherCards: WeatherCard[];
  activeCard: number | null
  fullCard: number | null
  scrollCard: number | null
  setActiveCard: (id: number | null) => void
  setFullCard: (id: number | null) => void
};

export default function BigCardList({weatherCards, activeCard, fullCard, scrollCard, setActiveCard, setFullCard}: BigCardListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [cardList, setCardList] = useState<WeatherCard[]>([]);
  const [currentCard, setCurrentCard] = useState<null | WeatherCard>(null);

  useEffect(() => {
    setCardList(weatherCards.map((item) => (item)));
  }, [weatherCards]);

  const handleDragStart = (card: WeatherCard) => {
    setCurrentCard(card);
  };

  const handleDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  const handleDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  const handleDragLeave = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  const handleDrop = (evt: React.DragEvent<HTMLDivElement>, card: WeatherCard) => {
    evt.preventDefault();
    dispatch(updateWeatherCards(cardList.map((item) => {
      if (item.city.id === card.city.id) {
        return ({...item, order: currentCard?.order});
      }
      if (item.city.id === currentCard?.city.id) {
        return ({...item, order: card.order});
      }
      return item;
    })));
  };

  const sortCards = (a: WeatherCard, b: WeatherCard) => (a.order - b.order);

  return (
    <div className="weather-content__big-cards">
      {
        weatherCards.length !== 0 ?
          weatherCards.slice().sort(sortCards).map((card) => (
            <Card
              key={card.city.id}
              weatherCard={card}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              activeCard={activeCard}
              fullCard={fullCard}
              scrollCard={scrollCard}
              setActiveCard={setActiveCard}
              setFullCard={setFullCard}
            />)) :
          <div className="weather-content__help">Выберите город, погода в котором вам интересна</div>
      }
    </div>
  );
}
