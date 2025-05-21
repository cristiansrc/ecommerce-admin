import { combineReducers } from '@reduxjs/toolkit';
import auth from 'application/actions/auth';
import category from 'application/actions/category';
import product from 'application/actions/product'
import productImage	from 'application/actions/productImage';

export default {
  entities: combineReducers({
    auth,
    category,
    product,
    productImage,
  }),
};