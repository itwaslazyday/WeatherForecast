export default function SearchForm(): JSX.Element {

  return (
    <div className="search-form">
      <h2 className="visually-hidden">Форма поиска</h2>
      <form action="#" method="GET">
        <div className="search-form__input-wrapper input-wrapper input-wrapper--search">
          <input id="search" type="search" name="city-search" placeholder="Название города" />
          <label htmlFor="search" aria-label="Поиск городов"></label>
        </div>
      </form>
    </div>
  );
}
