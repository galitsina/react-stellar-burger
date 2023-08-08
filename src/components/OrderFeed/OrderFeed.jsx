import orderFeedStyles from './OrderFeed.module.css';
import OrderCard from '../OrderCard/OrderCard';
import { useSelector } from 'react-redux';
import { getWsOrders } from '../../utils/Data';

const OrderFeed = () => {
  const { wsOrders } = useSelector(getWsOrders);
  const { orders } = wsOrders;

  return (
    Boolean(orders) &&
    <section className={orderFeedStyles.section}>
      <div className={`${orderFeedStyles.cards} custom-scroll`}>
        {orders.map(item => (
          <OrderCard currentStatus='' currentOrder={item} key={item._id}/>
        ))}
      </div>
    </section>
  )
}

export default OrderFeed;
