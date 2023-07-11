import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>404</h1>
      <Link to='/' className={`${styles.text} text text_type_main-medium`}>Вернуться на главную</Link>
    </main>
  )
}
