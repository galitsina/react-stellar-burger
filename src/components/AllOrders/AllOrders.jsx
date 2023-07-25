import allOrdersStyles from './AllOrders.module.css';

const allOrders = () => {
  return (
    <section className={allOrdersStyles.section} >
      <div className={allOrdersStyles.status}>
        <div className={allOrdersStyles.column}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={`${allOrdersStyles.column_grid} ${allOrdersStyles.ready_color}`}>
              <li className="text text_type_digits-default">123456</li>
              <li className="text text_type_digits-default">982122</li>
              <li className="text text_type_digits-default">034354</li>
              <li className="text text_type_digits-default">034354</li>
          </ul>
        </div>
        <div className={allOrdersStyles.column}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={allOrdersStyles.column_grid}>
            <li className="text text_type_digits-default">034354</li>
            <li className="text text_type_digits-default">982122</li>
            <li className="text text_type_digits-default">982122</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${allOrdersStyles.digits_shadow} text text_type_digits-large`}>28752</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${allOrdersStyles.digits_shadow} text text_type_digits-large`}>281</p>
      </div>
    </section>
  )
}

export default allOrders;
