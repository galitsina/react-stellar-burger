import orderFeedStyles from './OrderFeed.module.css';
import OrderCard from '../OrderCard/OrderCard';

const OrderFeed = () => {
  return (
    <section className={orderFeedStyles.section}>
      <div className={`${orderFeedStyles.cards} custom-scroll`}>
        <OrderCard status=''/>
      </div>
    </section>
  )
}

export default OrderFeed;
