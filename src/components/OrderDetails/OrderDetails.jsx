import OrderDetailsStyles from './OrderDetails.module.css';
import acceptedIcon from '../../images/order-accpeted.svg';
import PropTypes from "prop-types";

const OrderDetails = ({ orderId }) => {
  return (
    <div className={`${OrderDetailsStyles.container} mt-4 mb-30`}>
      <p className={`${OrderDetailsStyles.order__number} text text_type_digits-large`}>{orderId}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className={`${OrderDetailsStyles.accepted__icon} mt-15`} src={acceptedIcon} alt="Accepted Icon" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired
};

export default OrderDetails;
