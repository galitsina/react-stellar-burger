import React from 'react';
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
// import Modal from '../Modal/Modal';
// import OrderDetails from '../OrderDetails/OrderDetails';

const url = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [state, setState] = React.useState([])

  React.useEffect( () => {
    const getData = () => {
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => {
          setState(res.data)
        })
        .catch((err) => {console.log(`Произошла ошибка: ${err}`)})
    }
    getData()
  }, [])
  //console.log(state)
  return (
    <div className={styles.app}>
      <AppHeader />
      {state.length &&
      <main className={styles.main}>
        <BurgerIngredients data={state} />
        <BurgerConstructor data={state} />
      </main>}
    </div>
  );
}

export default App;
