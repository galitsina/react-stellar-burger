import React from 'react';
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader"
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import {getIngredients} from "../../utils/BurgerApi";

const App = () => {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data:[]
  })
  const {isLoading, hasError, data} = state

  React.useEffect( () => {
    const getData = () => {
      setState({...state, hasError: false, isLoading: true})
      getIngredients()
        .then((res) => {
          setState({...state, isLoading: false, data:res.data})
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
          setState({...state, hasError: true, isLoading: false})
        })
    }
    getData()
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {!isLoading && !hasError && Boolean(data.length) &&
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>}
    </div>
  );
}

export default App;
