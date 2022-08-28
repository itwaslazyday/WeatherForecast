import FullInfo from 'components/full-info/full-info';
import { Card } from 'types/card';
import { makeFakeWeatherCards } from 'utils/mocks';

type BigCardFullProps = {
  weatherCard: Card
}

export default function BigCardFull({ weatherCard }: BigCardFullProps): JSX.Element {
  const extraConditions = makeFakeWeatherCards();

  return (
    <div className="big-card__full">
      <FullInfo weatherCard={weatherCard} />
      {/* Ниже контейнер для дополнительных дней */}
      <div className="big-card__extra">
        {
          extraConditions.map((card) => <FullInfo key={card.id} weatherCard={card} />)
        }
      </div>
    </div>
  );
}
