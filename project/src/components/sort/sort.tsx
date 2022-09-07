import { useAppDispatch } from 'hooks';
import { useAppSelector } from 'hooks/index';
import { getWeatherCards } from 'store/data-process/selector';
import {updateWeatherCards} from 'store/data-process/data-process';
import { WeatherCard } from 'types/card';

type SortProps ={
  setFullCard: (id: number | null) => void
};

const sortAlphabetOrder = (a: WeatherCard, b: WeatherCard): number => {
  if (a.city.name > b.city.name) {
    return 1; }
  if (a.city.name < b.city.name) {
    return -1; }
  return 0;
};

export default function Sort({setFullCard}: SortProps): JSX.Element {
  const dispatch = useAppDispatch();
  const weatherCards = useAppSelector(getWeatherCards);

  const handleSortButtonClick = (): void => {
    const sortedWeatherCards = weatherCards.slice().sort(sortAlphabetOrder);
    const orderedWeatherCards = sortedWeatherCards.map((card, idx) => ({...card, order: idx}));
    dispatch(updateWeatherCards(orderedWeatherCards));
    setFullCard(null);
  };

  return (
    <div className="sort">
      <h2 className="visually-hidden">Сортировка</h2>
      <div className="sort__button-wrapper">
        <button
          className="sort__button"
          name="alphabet-sort"
          tabIndex={1}
          onClick={handleSortButtonClick}
        >
          <span className="sort__button-icon icon icon--arrow-down"></span>
        </button>
      </div>
    </div>
  );
}
