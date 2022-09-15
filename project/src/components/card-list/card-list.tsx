import Card from 'components/card/card';
import { useAppDispatch} from 'hooks';
import {useEffect, useState} from 'react';
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

  // console.log('weatherCards', weatherCards); // Выводит актуальный стор списка карточек до вызова обработчика.

  const handleCardMove = (dragIndex: number, hoverIndex: number) => {
  //   console.log('dragIndex, hoverIndex', dragIndex, hoverIndex);
  //   console.log('weatherCards', weatherCards); // Стор фактически не меняется, но консоль выводит неверные данные. Зависит от наведения на карточку.
  //   const draggedCardList = [...weatherCards];
  //   const draggedCard = draggedCardList[dragIndex];
  //   draggedCardList.splice(dragIndex, 1);
  //   draggedCardList.splice(hoverIndex, 0, draggedCard);s
  //   dispatch(updateWeatherCards(draggedCardList));
  };
  const sortCards = (a: WeatherCard, b: WeatherCard) => (a.order - b.order);

  return (
    <div className="weather-content__cards">
      {
        weatherCards.length !== 0 ?
          [...weatherCards].sort(sortCards).map((card) => (
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

