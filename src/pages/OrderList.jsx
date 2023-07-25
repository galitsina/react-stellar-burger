import styles from './OrderList.module.css';
import OrderFeed from '../components/OrderFeed/OrderFeed';
import AllOrders from '../components/AllOrders/AllOrders';

export const OrderListPage = () => {
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
