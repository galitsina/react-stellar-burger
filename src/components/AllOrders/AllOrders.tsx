import allOrdersStyles from "./AllOrders.module.css";
import { useSelector } from "react-redux";
import { getWsOrders } from "../../utils/Data";
import { FC } from 'react';
import { IWSOrder } from '../../services/types/order';

const AllOrders: FC = () => {
  const { wsOrders } = useSelector(getWsOrders);
  const orders = wsOrders? wsOrders.orders : [];
  const maxOrdersAmount = 20;

  let readyOrders: IWSOrder[] = [];
  let pendingOrders: IWSOrder[] = [];

  if (Boolean(orders)) {
    readyOrders = orders
      .filter((item) => item.status === "done")
      .slice(0, maxOrdersAmount);
    pendingOrders = orders
      .filter((item) => item.status === "pending")
      .slice(0, maxOrdersAmount);
  }

  return (
    <>
      {Boolean(orders) && (
        <section className={allOrdersStyles.section}>
          <div className={allOrdersStyles.status}>
            <div className={allOrdersStyles.column}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <ul
                className={`${allOrdersStyles.column_grid} ${allOrdersStyles.ready_color}`}
              >
                {readyOrders.length
                  ? readyOrders.map((item) => (
                      <li
                        className="text text_type_digits-default"
                        key={item._id}
                      >
                        {item.number}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div className={allOrdersStyles.column}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul className={allOrdersStyles.column_grid}>
                {pendingOrders.length
                  ? pendingOrders.map((item) => (
                      <li
                        className="text text_type_digits-default"
                        key={item._id}
                      >
                        {item.number}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p
              className={`${allOrdersStyles.digits_shadow} text text_type_digits-large`}
            >
              {wsOrders ? wsOrders.total : null}
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p
              className={`${allOrdersStyles.digits_shadow} text text_type_digits-large`}
            >
              {wsOrders ? wsOrders.totalToday : null}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default AllOrders;
