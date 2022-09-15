import { Link } from 'react-router-dom';
import './not-found.css';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div className="not-found">
      <h1 className="not-found__header visually-hidden">404. Page not found</h1>
      <Link to="/" className="not-found__link">Вернуться на главную</Link>
    </div>
  );
}
