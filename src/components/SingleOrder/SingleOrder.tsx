import singleOrderStyles from './SingleOrder.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { getAllIngredients, statusName, colorStatus, getOrderState } from '../../utils/Data';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSingleOrderDetails } from '../../services/actions/order';


const SingleOrder = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(getAllIngredients);
  const { singleOrderDetails } = useSelector(getOrderState);
  const { feedId = '' } = useParams<{feedId?: string}>();

  useEffect(() => {
    dispatch(getSingleOrderDetails(feedId));
  }, [dispatch, feedId])
  if (!singleOrderDetails) {
    return null;
  }
  const { number, createdAt, status, name } = singleOrderDetails;

  const ingredientsInOrder = singleOrderDetails.ingredients;
  const uniqIngredientObj: {[key: string]: number} = ingredientsInOrder.reduce((acc: {[key: string]: number}, item: string) => {
    if (!acc[item]) {
      acc[item] = 1;
    } else {
      acc[item] += 1;
    }
    return acc;
  }, {});

  let totalPrice = 0;
  const ingredientList = Object.entries(uniqIngredientObj).map((item, i) => {
    const key = item[0];
    const value = item[1];
    const ingredientObj = items.find(item => {
      return item._id === key;
    });
    totalPrice += (ingredientObj!.price * value);
    return (
      <div className={singleOrderStyles.ingredient} key={i}>
        <div className={singleOrderStyles.image_border}>
          <img className={singleOrderStyles.image_icon} src={ingredientObj?.image} alt={ingredientObj?.name} />
        </div>
        <p className={`${singleOrderStyles.ingredient_name} text text_type_main-default`}>{ingredientObj?.name}</p>
        <div className={singleOrderStyles.price}>
          <p className="text text_type_digits-default ">{value} x {ingredientObj?.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    )
  })

  return (
    items.length && Boolean(singleOrderDetails) &&
    <div className={`${singleOrderStyles.container} mb-15`}>
      <p className={`${singleOrderStyles.order_number} text text_type_digits-default mb-10`}>#{number}</p>
      <p className="text text_type_main-medium mb-3">{name}</p>
      <p className='text text_type_main-default mb-15' style={{ color: colorStatus(status) }}>{statusName(status)}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${singleOrderStyles.order_list} custom-scroll mb-10 pr-8`}>
        {ingredientList}
      </div>
      <div className={singleOrderStyles.time_price}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
        <div className={singleOrderStyles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default SingleOrder;
