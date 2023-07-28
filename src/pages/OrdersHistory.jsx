import orderHistoryStyles from './OrderHistory.module.css';
import Navigation from '../components/Navigation/Navigation';
import OrderCard from '../components/OrderCard/OrderCard';
import { useSelector } from 'react-redux';
import { getWsOrders } from '../utils/Data';
import { v4 as uuidv4 } from 'uuid';

export const OrderHistoryPage = () => {
  const { orders } = useSelector(getWsOrders);

  return (
    <div className={`${orderHistoryStyles.main} mt-10`}>
      <div className="mt-20"><Navigation description='В этом разделе вы можете просмотреть свою историю заказов' /></div>
      <div className={`${orderHistoryStyles.list} custom-scroll`}>
        {orders.map(item => (
          <OrderCard currentStatus='current-status' currentOrder={item} key={uuidv4()}/>
        ))}
      </div>
    </div>
  )
}

