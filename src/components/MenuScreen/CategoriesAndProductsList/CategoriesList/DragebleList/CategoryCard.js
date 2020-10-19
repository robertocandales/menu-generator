import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Paper, Grid, Avatar, Button } from '@material-ui/core';
import { COLORS } from '../../../../../Utils/Colors/color';

export const CategoryCard = ({
  id,
  card,
  index,
  moveCard,
  setSubCategories,
  categories,
  categorySelected,
  setCategorySelected,
  visibleCategories,
}) => {
  React.useEffect(() => {
    const y = visibleCategories.filter((x) => x.isVisibleOnMenu === true);

    if (y) {
      setSubCategories(y[0]);
      setCategorySelected(y[0]);
    } else {
      setSubCategories([]);
    }
  }, []);
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const selectedCategory = (card) => {
    setSubCategories(card);
    setCategorySelected(card);
  };

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {card.isVisibleOnMenu ? (
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginTop: '5px',
            marginBottom: '5px',
          }}>
          <Button
            onClick={() => selectedCategory(card)}
            style={
              categorySelected?.id === card.id
                ? { width: '100%', backgroundColor: COLORS.PRIMARY }
                : { width: '100%' }
            }>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='center'
              item
              spacing={3}>
              <Grid item sm={3}>
                <Avatar alt={card.title} src={card.image} />{' '}
              </Grid>{' '}
              <Grid item sm={6}>
                {card.title}
              </Grid>
            </Grid>
          </Button>
        </Paper>
      ) : null}
    </div>
  );
};
