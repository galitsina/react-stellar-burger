import React, { useState, useEffect, useReducer } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngredients } from '../../utils/BurgerApi';
import { ClickedIngredientsContext, CostContext } from '../../services/apiContext';

//created reducer for cost calculation:
const costInitialState = { count: 0 };
function reducer(state = costInitialState, action) {
  switch (action.type) {
    case 'INCREASE_COST':
      return { count: state.count + action.payload };
    case 'DECREASE_COST':
      return { count: state.count - action.payload };
    default:
      return state;
  }
}

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  })
  const { isLoading, hasError, data } = state;

  const [clickedIngredients, setClickedIngredients] = useState([]);

  //created costState by useREducer:
  const [costState, costDispatcher] = useReducer(reducer, costInitialState, undefined);

  useEffect(() => {
    const getData = () => {
      setState({ ...state, hasError: false, isLoading: true })
      getIngredients()
        .then((res) => {
          setState({ ...state, isLoading: false, data: res.data })
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
          setState({ ...state, hasError: true, isLoading: false })
        })
    }
    getData()
  }, [])

  return (
    <div className={styles.app}>
      <ClickedIngredientsContext.Provider value={{ clickedIngredients, setClickedIngredients }}>
        <CostContext.Provider value={{ costState, costDispatcher }}>
          <AppHeader />
          {!isLoading && !hasError && Boolean(data.length) &&
            <main className={styles.main}>
              <BurgerIngredients data={data} />
              <BurgerConstructor />
            </main>}
        </CostContext.Provider>
      </ClickedIngredientsContext.Provider>
    </div>
  );
}

export default App;
