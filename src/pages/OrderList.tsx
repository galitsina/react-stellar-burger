import { useEffect, FC } from 'react';
import styles from './OrderList.module.css';
import OrderFeed from '../components/OrderFeed/OrderFeed';
import AllOrders from '../components/AllOrders/AllOrders';
import { Loader } from '../components/Loader/Loader';
import { useSelector, useDispatch} from 'react-redux';
import { WebsocketStatus, getWsOrders, allOrdersUrl} from '../utils/Data';
import {connect, disconnect} from '../services/actions/wsOrders';

export const OrderListPage: FC = () => {
  const dispatch = useDispatch();
  const  data = useSelector(getWsOrders);
  useEffect(()=> {
    dispatch(connect(allOrdersUrl));
    return () => {
        dispatch(disconnect());
    }
  }, [dispatch])
  if(!data || data.status !== WebsocketStatus.ONLINE) {
    return (<Loader />)}

  return (
    <main>
      <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>Лента заказов</h1>
      <div className={styles.main}>
        <OrderFeed />
        <AllOrders />
      </div>
    </main>
  )
}
