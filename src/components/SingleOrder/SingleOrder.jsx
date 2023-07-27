import singleOrderStyles from './SingleOrder.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getWsOrders } from '../../utils/Data';
import { useParams } from 'react-router-dom';
import {useMemo} from 'react';

const SingleOrder = () => {
  const today = new Date();
  const { items } = useSelector(getWsOrders);
  const { orderId } = useParams();

  const currentOrder = useMemo(() => {
    return items.find(({_id}) => _id === orderId);
   }, [orderId, items]);

   if (!currentOrder) {
    return null;
  }
  const { image, name, calories, price} = currentOrder;
  console.log(currentOrder);
  return (
    items.length &&
    <div className={`${singleOrderStyles.container} mb-15`}>
      <p className={`${singleOrderStyles.order_number} text text_type_digits-default mb-10`}>#{calories}</p>
      <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
      <p className={`${singleOrderStyles.ready_color} text text_type_main-default mb-15`}>Выполнен</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${singleOrderStyles.order_list} custom-scroll mb-10 pr-8`}>
        <div className={singleOrderStyles.ingredient}>
          <div className={singleOrderStyles.image_border}>
            <img className={singleOrderStyles.image_icon} src={image} alt='ALT.TO DO: FIX' />
          </div>
          <p className="text text_type_main-default">{name}</p>
          <div className={singleOrderStyles.price}>
            <p className="text text_type_digits-default">2 x {price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </div>
      <div className={singleOrderStyles.time_price}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(today.getDate())} />
        </span>
        <div className={singleOrderStyles.price}>
          <p className="text text_type_digits-default">680</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default SingleOrder;
