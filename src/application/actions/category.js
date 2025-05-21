import { createAction, createSlice } from '@reduxjs/toolkit';
import initialState from 'domain/entities/category';


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategoriesPending: (state) => {
            state.isFetchingGetCategories = true;
            state.isSuccessGetCategories = false;
            state.isErrorGetCategories = false;
        },
        getCategoriesSuccess: (state, { payload }) => {
            state.isFetchingGetCategories = false;
            state.isSuccessGetCategories = true;
            state.isErrorGetCategories = false;
            state.categories = payload;
        },
        getCategoriesError: (state) => {
            state.isFetchingGetCategories = false;
            state.isSuccessGetCategories = false;
            state.isErrorGetCategories = true;
        },
        getCategoryPending: (state) => {
            state.isFetchingGetCategory = true;
            state.isSuccessGetCategory = false;
            state.isErrorGetCategory = false;
        },
        getCategorySuccess: (state, { payload }) => {
            state.isFetchingGetCategory = false;
            state.isSuccessGetCategory = true;
            state.isErrorGetCategory = false;
            state.category = payload;
        },
        getCategoryError: (state) => {
            state.isFetchingGetCategory = false;
            state.isSuccessGetCategory = false;
            state.isErrorGetCategory = true;
        },
        createCategoryPending: (state) => {
            state.isFetchingCreateCategory = true;
            state.isSuccessCreateCategory = false;
            state.isErrorCreateCategory = false;
        },
        createCategorySuccess: (state, { payload }) => {
            state.isFetchingCreateCategory = false;
            state.isSuccessCreateCategory = true;
            state.isErrorCreateCategory = false;
            state.idCategory = payload;
        },
        createCategoryError: (state) => {
            state.isFetchingCreateCategory = false;
            state.isSuccessCreateCategory = false;
            state.isErrorCreateCategory = true;
        },
        updateCategoryPending: (state) => {
            state.isFetchingUpdateCategory = true;
            state.isSuccessUpdateCategory = false;
            state.isErrorUpdateCategory = false;
        },
        updateCategorySuccess: (state) => {
            state.isFetchingUpdateCategory = false;
            state.isSuccessUpdateCategory = true;
            state.isErrorUpdateCategory = false;
        },
        updateCategoryError: (state) => {
            state.isFetchingUpdateCategory = false;
            state.isSuccessUpdateCategory = false;
            state.isErrorUpdateCategory = true;
        },
        deleteCategoryPending: (state) => {
            state.isFetchingDeleteCategory = true;
            state.isSuccessDeleteCategory = false;
            state.isErrorDeleteCategory = false;
        },
        deleteCategorySuccess: (state) => {
            state.isFetchingDeleteCategory = false;
            state.isSuccessDeleteCategory = true;
            state.isErrorDeleteCategory = false;
        },
        deleteCategoryError: (state) => {
            state.isFetchingDeleteCategory = false;
            state.isSuccessDeleteCategory = false;
            state.isErrorDeleteCategory = true;
        },
        reset: (state) => {
            state.category = {
                id: 0,
                name: '',
                description: '',
                icon: '',
            }
            state.categories = [];
            state.idCategory = 0;
            state.isFetchingGetCategories = false;
            state.isSuccessGetCategories = false;
            state.isErrorGetCategories = false;
            state.isFetchingGetCategory = false;
            state.isSuccessGetCategory = false;
            state.isErrorGetCategory = false;
            state.isFetchingCreateCategory = false;
            state.isSuccessCreateCategory = false;
            state.isErrorCreateCategory = false;
            state.isFetchingUpdateCategory = false;
            state.isSuccessUpdateCategory = false;
            state.isErrorUpdateCategory = false;
            state.isFetchingDeleteCategory = false;
            state.isSuccessDeleteCategory = false;
            state.isErrorDeleteCategory = false;
        },
    },
});

export default categorySlice.reducer;
export const categoryActions = {
    ...categorySlice.actions,
    getCategories: createAction('category/getCategories'),
    getCategory: createAction('category/getCategory'),
    createCategory: createAction('category/createCategory'),
    updateCategory: createAction('category/updateCategory'),
    deleteCategory: createAction('category/deleteCategory'),
};