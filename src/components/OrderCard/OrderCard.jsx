import orderCardStyles from './OrderCard.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getAllIngredients, colorStatus } from '../../utils/Data';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { findItemsInOrder } from '../../utils/IngredientsUtils';

const OrderCard = ({ currentStatus, currentOrder }) => {
  const { items } = useSelector(getAllIngredients);
  const { ingredients, name, number, createdAt, status } = currentOrder;
  const location = useLocation();
  const maxImagesAmount = 5;

  const necessaryIngredients = findItemsInOrder(ingredients, items);
  const iconList = necessaryIngredients.slice(0, maxImagesAmount);
  const leftIngredientsAmount = necessaryIngredients.length - maxImagesAmount;
  const ingrPrice = necessaryIngredients.reduce((acc, item) => acc + item?.price, 0);

  return (
    items.length && Boolean(currentOrder) &&
    <Link
      key={number}
      to={`${location.pathname}/${number}`}
      state={{ background: location }}
      className={orderCardStyles.link}
    >
      <div className={`${orderCardStyles.card} p-6 mr-2`}>
        <div className={orderCardStyles.details}>
          <p className="text text_type_digits-default">#{number}</p>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </span>
        </div>
        <div>
          <p className={`${orderCardStyles.burger_name} text text_type_main-medium`}>{name}</p>
          <p className='text text_type_main-default mt-2' style={{color: colorStatus(status)}}>{currentStatus}</p>
        </div>
        <div className={orderCardStyles.details}>
          <div className={orderCardStyles.ingredients}>
            {iconList.map((item, i) => (
              <div className={orderCardStyles.image_border} key={i}>
                <img className={orderCardStyles.image_icon} src={item?.image} alt={item?.name} />
              </div>
            ))
            }
            {necessaryIngredients.length > maxImagesAmount ?
              (<div className={orderCardStyles.image_border}>
                <img className={orderCardStyles.image_icon} src={necessaryIngredients[maxImagesAmount].image} alt='Other ingredients' />
                <p className={`${orderCardStyles.counter} text text_type_main-default`} >+{leftIngredientsAmount}</p>
              </div>) : null
            }
          </div>
          <div className={orderCardStyles.price}>
            <p className="text text_type_digits-default">{ingrPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link >
  )
}

OrderCard.propTypes = {
  currentStatus: PropTypes.string,
  currenOrder: PropTypes.object
};

export default OrderCard;


