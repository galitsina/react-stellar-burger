import React, { useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/allIngredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const { items, itemsRequest } = useSelector(state => state.allIngredients);
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          {itemsRequest ? (<Loader />) : (<BurgerIngredients data={items} />)}
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;

