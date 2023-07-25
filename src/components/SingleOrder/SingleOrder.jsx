import singleOrderStyles from './SingleOrder.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../utils/Data';

const SingleOrder = () => {
  const today = new Date();
  const { items } = useSelector(getAllIngredients);

  return (
    <div className={`${singleOrderStyles.container} mb-15`}>
      <p className={`${singleOrderStyles.order_number} text text_type_digits-default mb-10`}>#034535</p>
      <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
      <p className={`${singleOrderStyles.ready_color} text text_type_main-default mb-15`}>Выполнен</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${singleOrderStyles.order_list} custom-scroll mb-10 pr-8`}>
        <div className={singleOrderStyles.ingredient}>
          <div className={singleOrderStyles.image_border}>
            <img className={singleOrderStyles.image_icon} src={items[10].image} alt='ALT.TO DO: FIX' />
          </div>
          <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
          <div className={singleOrderStyles.price}>
            <p className="text text_type_digits-default">2 x 20</p>
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
