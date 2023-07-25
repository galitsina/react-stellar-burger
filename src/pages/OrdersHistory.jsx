import orderHistoryStyles from './OrderHistory.module.css';
import Navigation from '../components/Navigation/Navigation';
import OrderCard from '../components/OrderCard/OrderCard';

export const OrderHistoryPage = () => {
  return (
    <div className={`${orderHistoryStyles.main} mt-10`}>
      <div className="mt-20"><Navigation description='В этом разделе вы можете просмотреть свою историю заказов'/></div>
      <div className={`${orderHistoryStyles.list} custom-scroll`}>
        <OrderCard status='current-status'/>
      </div>
    </div>
  )
}

