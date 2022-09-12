import Card from 'components/card/card';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {updateWeatherCards} from 'store/data-process/data-process';
import { WeatherCard } from 'types/card';

type CardListProps = {
  weatherCards: WeatherCard[];
  activeCard: number | null;
  fullCard: number | null;
  scrollCard: number | null | undefined;
  setActiveCard: (id: number | null) => void;
  setFullCard: (id: number | null) => void;
  existingCardId: undefined | number;
};

export default function CardList ({weatherCards, activeCard, fullCard, scrollCard, setActiveCard, setFullCard, existingCardId}: CardListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [cardList, setCardList] = useState<WeatherCard[]>([]);

  useEffect(() => {
    setCardList(weatherCards.map((item) => (item)));
  }, [weatherCards]);

  console.log('cardList1', cardList); // Выводит актуальное состояние списка карточек до вызова обработчика.

  const sortCards = (a: WeatherCard, b: WeatherCard) => (a.order - b.order);


  const handleCardMove = (dragIndex: number, hoverIndex: number) => {
    console.log('dragIndex, hoverIndex', dragIndex, hoverIndex);
    console.log('cardList3', weatherCards); // Это данные из пропсов, они же - из глобального состояния.
    console.log('cardList2', cardList); // Обработчик вызван, но ыыводит какие-то чудеса и странности

    // const draggedCard = cardList[dragIndex];
    // cardList.splice(dragIndex, 1);
    // cardlist.splice(hoverIndex, 0, draggedCard);
    // dispatch(updateWeatherCards(cardlist);
  };

  return (
    <div className="weather-content__cards">
      {
        weatherCards.length !== 0 ?
          weatherCards.slice().sort(sortCards).map((card) => (
            <Card
              key={card.city.id}
              weatherCard={card}
              existingCardId={existingCardId}
              activeCard={activeCard}
              fullCard={fullCard}
              scrollCard={scrollCard}
              setActiveCard={setActiveCard}
              setFullCard={setFullCard}
              handleCardMove={handleCardMove}
            />)) :
          <div className="weather-content__help">
            Карточки с погодой можно менять местами, а также удалять, перетягивая на область карты.
          </div>
      }
    </div>
  );
}

