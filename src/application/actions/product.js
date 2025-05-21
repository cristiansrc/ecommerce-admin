import { createAction, createSlice } from '@reduxjs/toolkit';
import initialState from 'domain/entities/product';

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductsPending: (state) => {
            state.isFetchingGetProducts = true;
            state.isSuccessGetProducts = false;
            state.isErrorGetProducts = false;
        },
        getProductsSuccess: (state, { payload }) => {
            state.isFetchingGetProducts = false;
            state.isSuccessGetProducts = true;
            state.isErrorGetProducts = false;
            state.products = payload;
        },
        getProductsError: (state) => {
            state.isFetchingGetProducts = false;
            state.isSuccessGetProducts = false;
            state.isErrorGetProducts = true;
        },
        getProductPending: (state) => {
            state.isFetchingGetProduct = true;
            state.isSuccessGetProducts = false;
            state.isErrorGetProducts = false;
        },
        getProductSuccess: (state, { payload }) => {
            state.isFetchingGetProduct = false;
            state.isSuccessGetProduct = true;
            state.isErrorGetProduct = false;
            state.product = payload;
        },
        getProductError: (state) => {
            state.isFetchingGetProduct = false;
            state.isSuccessGetProduct = false;
            state.isErrorGetProduct = true;
        },
        createProductPending: (state) => {
            state.isFetchingCreateProduct = true;
            state.isSuccessCreateProduct = false;
            state.isErrorCreateProduct = false;
        },
        createProductSuccess: (state, { payload }) => {
            state.isFetchingCreateProduct = false;
            state.isSuccessCreateProduct = true;
            state.isErrorCreateProduct = false;
            state.idProduct = payload;
        },
        createProductError: (state) => {
            state.isFetchingCreateProduct = false;
            state.isSuccessCreateProduct = false;
            state.isErrorCreateProduct = true;
        },
        updateProductPending: (state) => {
            state.isFetchingCreateProduct = true;
            state.isSuccessCreateProduct = false;
            state.isErrorCreateProduct = false;
        },
        updateProductSuccess: (state) => {
            state.isFetchingCreateProduct = false;
            state.isSuccessCreateProduct = true;
            state.isErrorCreateProduct = false;
        },
        updateProductError: (state) => {
            state.isFetchingCreateProduct = false;
            state.isSuccessCreateProduct = false;
            state.isErrorCreateProduct = true;
        },
        deleteProductPending: (state) => {
            state.isFetchingDeleteProduct = true;
            state.isSuccessDeleteProduct = false;
            state.isErrorDeleteProduct = false;
        },
        deleteProductSuccess: (state) => {
            state.isFetchingDeleteProduct = false;
            state.isSuccessDeleteProduct = true;
            state.isErrorDeleteProduct = false;
        },
        deleteProductError: (state) => {
            state.isFetchingDeleteProduct = false;
            state.isSuccessDeleteProduct = false;
            state.isErrorDeleteProduct = true;
        },
        reset: (state) => {
            state.product = {
                id: 0,
                name: '',
                description: '',
                gender: '',
                categoryId: 0
            }
            state.products = [];
            // data fetching state
            state.idProduct = 0;
            state.isSuccessGetProducts = false;
            state.isFetchingGetProducts = false;
            state.isErrorGetProducts = false;
            state.isFetchingGetProduct = false;
            state.isSuccessGetProduct = false;
            state.isErrorGetProduct = false;
            state.isFetchingCreateProduct = false;
            state.isSuccessCreateProduct = false;
            state.isErrorCreateProduct = false;
            state.isFetchingUpdateProduct = false;
            state.isSuccessUpdateProduct = false;
            state.isErrorUpdateProduct = false;
            state.isFetchingDeleteProduct = false;
            state.isSuccessDeleteProduct = false;
            state.isErrorDeleteProduct = false;
        },
    },
});

export default productSlice.reducer;
export const productActions = {
    ...productSlice.actions,
    getProducts: createAction('product/getProducts'),
    getProduct: createAction('product/getProduct'),
    createProduct: createAction('product/createProduct'),
    updateProduct: createAction('product/updateProduct'),
    deleteProduct: createAction('product/deleteProduct'),

}