import React, { useState, useCallback, useEffect } from 'react';
import { Paper, Grid, Avatar } from '@material-ui/core';
import { CategoryCard } from './CategoryCard';
import update from 'immutability-helper';
import { fetchCategories } from '../../../../../firebase/db/category';
import SkeletonComponent from '../../../../Global/SkeletonComponent';
import _ from 'lodash';

export const DragableList = ({ setVisibleCategories, setSubCategories, visibleCategories }) => {
  {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        await fetchCategories()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              categories.push({
                ...doc.data(),
                id: doc.id,
                docRef: doc.ref,
              });
            });
            const user = JSON.parse(localStorage?.getItem('user'));

            if (categories.length) {
              setCategories(categories.filter((x) => x.user === user.email));
              const visiblesCat = categories.filter((cat) => cat.isVisibleOnMenu === true);
              if (categories.length && visiblesCat.length && visibleCategories.length) {
                if (visiblesCat.length > visibleCategories.length) {
                  filterVisibleCat(
                    visiblesCat,
                    categories.filter((x) => x.user === user.email),
                  );
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              } else {
                setVisibleCategories(visiblesCat);
                setLoading(false);
              }
            }
          })
          .catch((er) => {
            console.log('error');
            console.log(er);
            setLoading(false);
          });
      };
      fetchData();
    }, []);

    const filterVisibleCat = (visiblesCat, categories) => {
      const result = _.intersectionWith(
        visiblesCat,
        categories,

        (o, num) => o.id === num.id && num.isVisibleOnMenu === true,
      );
      setVisibleCategories(result);

      setLoading(false);
    };

    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = visibleCategories[dragIndex];
        setVisibleCategories(
          update(visibleCategories, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        );
      },
      [visibleCategories],
    );
    //console.log(categories);
    const renderCard = (card, index) => {
      return (
        <CategoryCard
          key={card.id}
          index={index}
          id={card.id}
          card={card}
          moveCard={moveCard}
          setSubCategories={setSubCategories}
          categories={categories}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          visibleCategories={visibleCategories}
        />
      );
    };
    return (
      <>
        {loading ? (
          <Grid item sm={12} style={{ width: '100%', height: '100%' }}>
            {' '}
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </Grid>
        ) : (
          <div style={{ width: '100%' }}>
            {visibleCategories?.map((card, i) => renderCard(card, i))}
          </div>
        )}
      </>
    );
  }
};
