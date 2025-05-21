import { createAction, createSlice } from '@reduxjs/toolkit';
import initialState from 'domain/entities/productImage'

const productImageSlice = createSlice({
    name: 'productImage',
    initialState,
    reducers: {
        getProductImagesPending: (state) => {
            state.isFetchingGetProductImages = true;
            state.isSuccessGetProductImages = false;
            state.isErrorGetProductImages = false;
        },
        getProductImagesSuccess: (state, { payload }) => {
            state.isFetchingGetProductImages = false;
            state.isSuccessGetProductImages = true;
            state.isErrorGetProductImages = false;
            state.productImages = payload;
        },
        getProductImagesError: (state) => {
            state.isFetchingGetProductImages = false;
            state.isSuccessGetProductImages = false;
            state.isErrorGetProductImages = true;
        },
        getProductImagePending: (state) => {
            state.isFetchingGetProductImage = true;
            state.isSuccessGetProductImage = false;
            state.isErrorGetProductImage = false;
        },
        getProductImageSuccess: (state, { payload }) => {
            state.isFetchingGetProductImage = false;
            state.isSuccessGetProductImage = true;
            state.isErrorGetProductImage = false;
            state.productImage = payload;
        },
        getProductImageError: (state) => {
            state.isFetchingGetProductImage = false;
            state.isSuccessGetProductImage = false;
            state.isErrorGetProductImage = true;
        },
        createProductImagePending: (state) => {
            state.isFetchingCreateProductImage = true;
            state.isSuccessCreateProductImage = false;
            state.isErrorCreateProductImage = false;
        },
        createProductImageSuccess: (state,) => {
            state.isFetchingCreateProductImage = false;
            state.isSuccessCreateProductImage = true;
            state.isErrorCreateProductImage = false;
        },
        createProductImageError: (state) => {
            state.isFetchingCreateProductImage = false;
            state.isSuccessCreateProductImage = false;
            state.isErrorCreateProductImage = true;
        },
        deleteProductImagePending: (state) => {
            state.isFetchingDeleteProductImage = true;
            state.isSuccessDeleteProductImage = false;
            state.isErrorDeleteProductImage = false;
        },
        deleteProductImageSuccess: (state,) => {
            state.isFetchingDeleteProductImage = false;
            state.isSuccessDeleteProductImage = true;
            state.isErrorDeleteProductImage = false;
        },
        deleteProductImageError: (state) => {
            state.isFetchingDeleteProductImage = false;
            state.isSuccessDeleteProductImage = false;
            state.isErrorDeleteProductImage = true;
        },
        reset: (state) => {
            state.productImage = {
                id: 0,
                name: '',
                image: '',
                productId: 0
            };
            state.productImages = [];
            state.idProductImage = 0;
            // data fetching state
            state.isFetchingGetProductImages = false;
            state.isSuccessGetProductImages = false;
            state.isErrorGetProductImages = false;
            state.isFetchingGetProductImage = false;
            state.isSuccessGetProductImage = false;
            state.isErrorGetProductImage = false;
            state.isFetchingCreateProductImage = false;
            state.isSuccessCreateProductImage = false;
            state.isErrorCreateProductImage = false;
            state.isFetchingDeleteProductImage = false;
            state.isSuccessDeleteProductImage = false;
            state.isErrorDeleteProductImage = false;
        },
    },
});

export default productImageSlice.reducer;
export const producImagestActions = {
    ...productImageSlice.actions,
    getProductImages: createAction('productImages/getProductImages'),
    getProductImage: createAction('productImages/getProductImage'),
    createProductImage: createAction('productImages/createProductImage'),
    deleteProductImage: createAction('productImages/deleteProductImage'),
}