import React, { useState, useCallback, useEffect } from 'react';
import { Paper, Grid, Avatar, Typography } from '@material-ui/core';
import { ProductCard } from './ProductCard';
import update from 'immutability-helper';
import SkeletonComponent from '../../../../Global/SkeletonComponent';
import { fetchProducts } from '../../../../../firebase/db/product';

export const DragableList = ({ setVisibleProducts, subCategories, visibleProducts }) => {
  {
    const [productsSelected, setProductsSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    //console.log(subCategories);
    //console.log(visibleProducts, 'visibleProducts');
    useEffect(() => {
      const fetchProductsFromDB = () => {
        const user = JSON.parse(localStorage?.getItem('user'));

        fetchProducts()
          .then((snapshot) => {
            let items = snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            const pr = items.filter((x) => x.user === user.email);

            const productWithCategory = pr.filter(
              (product) => product.categoryId === subCategories.id,
            );

            setProductsSelected(productWithCategory);
            //if (!includeId[0]) {
            setVisibleProducts(productWithCategory);

            setLoading(false);
          })
          .catch((er) => {
            console.log('error');
            console.log(er);
            setLoading(false);
          });
      };
      fetchProductsFromDB();
    }, [subCategories]);

    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = visibleProducts[dragIndex];
        setVisibleProducts(
          update(visibleProducts, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        );
      },
      [visibleProducts],
    );

    const renderCard = (card, index) => {
      return (
        <ProductCard
          key={index}
          index={index}
          id={index}
          card={card}
          moveCard={moveCard}
          subCategories={subCategories}
          productsSelected={productsSelected}
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
            {visibleProducts.length ? (
              visibleProducts.map((card, i) => renderCard(card, i))
            ) : (
              <Typography>No products</Typography>
            )}
          </div>
        )}
      </>
    );
  }
};
