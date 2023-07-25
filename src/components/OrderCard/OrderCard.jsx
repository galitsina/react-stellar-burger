import orderCardStyles from './OrderCard.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../utils/Data';
import PropTypes from 'prop-types';

const OrderCard = ({ status }) => {
  const today = new Date();
  const { items } = useSelector(getAllIngredients);
  //items[0].image

  return (
    items.length &&
    <div className={`${orderCardStyles.card} p-6 mr-2`}>
      <div className={orderCardStyles.details}>
        <p className="text text_type_digits-default">#034535</p>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(today.getDate())} />
        </span>
      </div>
      <div>
        <p className={`${orderCardStyles.burger_name} text text_type_main-medium`}>Burger's name</p>
        <p className='text text_type_main-default mt-2'>{status}</p>
      </div>
      <div className={orderCardStyles.details}>
        <div className={orderCardStyles.ingredients}>
          <div className={orderCardStyles.image_border}>
            <img className={orderCardStyles.image_icon} src={items[0].image_mobile} alt='ALT.TO DO: FIX' />
          </div>
          <div className={orderCardStyles.image_border}>
            <img className={orderCardStyles.image_icon} src={items[1].image} alt='ALT.TO DO: FIX' />
          </div>
          <div className={orderCardStyles.image_border}>
            <img className={orderCardStyles.image_icon} src={items[12].image} alt='ALT.TO DO: FIX' />
          </div>
          <div className={orderCardStyles.image_border}>
            <img className={orderCardStyles.image_icon} src={items[3].image} alt='ALT.TO DO: FIX' />
          </div>
          <div className={orderCardStyles.image_border}>
            <img className={orderCardStyles.image_icon} src={items[4].image} alt='ALT.TO DO: FIX' />
          </div>
          <div className={orderCardStyles.image_border}>
            <img className={orderCardStyles.image_icon} src={items[10].image} alt='ALT.TO DO: FIX' />
            <p className={`${orderCardStyles.counter} text text_type_main-default`} >+3</p>
          </div>

        </div>
        <div className={orderCardStyles.price}>
          <p className="text text_type_digits-default">680</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

OrderCard.propTypes = {
  status: PropTypes.string
};

export default OrderCard;


