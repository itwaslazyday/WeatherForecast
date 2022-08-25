export default function Sort(): JSX.Element {

  return (
    <div className="sort">
      <h2 className="visually-hidden">Сортировка</h2>
      <div className="sort__input-wrapper input-wrapper input-wrapper--radio">
        <input id="alphabet-sort" type="checkbox" name="alphabet-sort" value="alphabet-sort" />
        <label htmlFor="alphabet-sort" aria-label="Сортировка по алфавиту">
          <span className="icon icon--arrow-down"></span>
        </label>
      </div>
    </div>
  );
}
