import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorIngredientStyles from './BurgerConstructorIngredient.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/PropTypes';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { DECREASE_INGREDIENT, MOVE_ITEMS } from '../../services/actions/selectedIngredients';

const BurgerConstructorIngredient = ({ ingredient, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, dropSort] = useDrop({
    accept: 'ingredientSort',
    hover(item, monitor) {
      //dragIndex - what comes from Drag: index of the dragging item (46 line)
      const dragIndex = item.index;
      //hoverIndex - comes from props - index of hovered item (dispatch called on it)
      const hoverIndex = index;

      if (!ref.current) { return }
      // Don't replace items with themselves
      if (item.index === index) { return }

      // Determine rectangle on screen(определяем размер div с ref)
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle(разница м/ду нижней и верхней границами карточки - координата середины hovered карточки)
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position(возвращает координаты мышки относительно текущего контейнера)
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top(координата по у мышки минус верхняя граница hovered элемента - т.е расстояние от курсора до верхней границы hovered элемента)
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: MOVE_ITEMS,
        dragIndex: item.index,
        hoverIndex: index
      })
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, dragSort] = useDrag({
    type: 'ingredientSort',
    item: {
      id: ingredient._id,
      index: index
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1;
  dragSort(dropSort(ref));

  const deleteIngredeint = () => {
    dispatch({
      type: DECREASE_INGREDIENT,
      ingredient: ingredient
    })
  }

  return (
    <div className={constructorIngredientStyles.not__buns} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteIngredeint}
      />
    </div>
  )
}

BurgerConstructorIngredient.propTypes = {
  ingredient: ingredientPropType,
  index: PropTypes.number
}

export default BurgerConstructorIngredient;
