import orderCardStyles from './OrderCard.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../utils/Data';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { findItemsInOrder } from '../../utils/IngredientsUtils';

const OrderCard = ({ currentStatus, currentOrder }) => {
  const location = useLocation();
  const maxImagesAmount = 5;
  const today = new Date();
  const { items } = useSelector(getAllIngredients);

  const { ingredients, status, number } = currentOrder;

  const necessaryIngredients = findItemsInOrder(ingredients, items)
  const iconList = necessaryIngredients.slice(0, maxImagesAmount);
  const leftIngredientsAmount = necessaryIngredients.length - maxImagesAmount;

  return (
    items.length &&
    <Link
      key={number}
      to={`/feed/${number}`}
      state={{ background: location }}
      className={orderCardStyles.link}
    >
      <div className={`${orderCardStyles.card} p-6 mr-2`}>
        <div className={orderCardStyles.details}>
          <p className="text text_type_digits-default">#034535</p>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(today.getDate())} />
          </span>
        </div>
        <div>
          <p className={`${orderCardStyles.burger_name} text text_type_main-medium`}>Burger's name</p>
          <p className='text text_type_main-default mt-2'>{currentStatus}</p>
        </div>
        <div className={orderCardStyles.details}>
          <div className={orderCardStyles.ingredients}>
            {iconList.map(item => (
              <div className={orderCardStyles.image_border} key={uuidv4()}>
                <img className={orderCardStyles.image_icon} src={item.image} alt={item.name} />
              </div>
            ))
            }
            { necessaryIngredients.length >  maxImagesAmount ?
               ( <div className={orderCardStyles.image_border}>
                <img className={orderCardStyles.image_icon} src={necessaryIngredients[maxImagesAmount].image} alt='ALT.TO DO: FIX' />
                <p className={`${orderCardStyles.counter} text text_type_main-default`} >+{leftIngredientsAmount}</p>
              </div>) : null
            }
          </div>
          <div className={orderCardStyles.price}>
            <p className="text text_type_digits-default">680</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link >
  )
}

OrderCard.propTypes = {
  status: PropTypes.string,
  currenOrder: PropTypes.object
};

export default OrderCard;


