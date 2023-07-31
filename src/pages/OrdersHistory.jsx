import { useEffect } from 'react';
import orderHistoryStyles from './OrderHistory.module.css';
import Navigation from '../components/Navigation/Navigation';
import OrderCard from '../components/OrderCard/OrderCard';
import { useSelector, useDispatch } from 'react-redux';
import { getWsOrders } from '../utils/Data';
import { v4 as uuidv4 } from 'uuid';
import { privateOrdersUrl, WebsocketStatus, statusName} from '../utils/Data';
import {connect, disconnect} from '../services/actions/wsOrders';
import { Loader } from '../components/Loader/Loader';

export const OrderHistoryPage = () => {
  const  data = useSelector(getWsOrders);
  const { wsOrders } = data;
  const { orders } = wsOrders;

  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken').split('Bearer ')[1];

  useEffect(()=> {
    dispatch(connect(`${privateOrdersUrl}?token=${token}`));
    return () => {
        dispatch(disconnect());
    }
  }, [dispatch, token])

  if(!data || data.status !== WebsocketStatus.ONLINE) {
    return (<Loader />)}

  return (
    Boolean(orders) &&
    <div className={`${orderHistoryStyles.main} mt-10`}>
      <div className="mt-20"><Navigation description='В этом разделе вы можете просмотреть свою историю заказов' /></div>
      <div className={`${orderHistoryStyles.list} custom-scroll`}>
        {orders.map(item => (
          <OrderCard currentStatus={statusName(item.status)} currentOrder={item} key={uuidv4()}/>
        ))}
      </div>
    </div>
  )
}

