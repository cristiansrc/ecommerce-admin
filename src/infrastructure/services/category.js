import { categoryActions } from "application/actions/category";
import mscategory from "infrastructure/agent/mscategory";

import { put, spawn, takeLatest } from 'redux-saga/effects';

function* getCategories() {
    yield put(categoryActions.getCategoriesPending());
    const { data, error } = yield mscategory.get('/');
    if (error.code !== 200) {
        yield put(categoryActions.getCategoriesError(error));
    } else {
        yield put(categoryActions.getCategoriesSuccess(data));
    }
}

function* getCategory( { payload } ) {
    yield put(categoryActions.getCategoryPending());
    const { data, error } = yield mscategory.get(`/${payload}`);
    if (error.code !== 200) {
        yield put(categoryActions.getCategoryError(error));
    } else {
        yield put(categoryActions.getCategorySuccess(data));
    }
}

function* createCategory({ payload }) {
    yield put(categoryActions.createCategoryPending());
    const { data, error } = yield mscategory.post('/', payload);
    if (error.code !== 200) {
        yield put(categoryActions.createCategoryError(error));
    } else {
        yield put(categoryActions.createCategorySuccess(data));
    }
}

function* updateCategory({ payload }) {
    yield put(categoryActions.updateCategoryPending());
    const { error } = yield mscategory.put(`/`, payload);
    if (error.code !== 200) {
        yield put(categoryActions.updateCategoryError(error));
    } else {
        yield put(categoryActions.updateCategorySuccess());
    }
}

function* deleteCategory({ payload }) {
    yield put(categoryActions.deleteCategoryPending());
    const { error } = yield mscategory.delete(`/${payload}`);
    if (error.code !== 200) {
        yield put(categoryActions.deleteCategoryError(error));
    } else {
        yield put(categoryActions.deleteCategorySuccess());
    }
}

function* watchGetCategories() {
    yield takeLatest(categoryActions.getCategories.type, getCategories);
}

function* watchGetCategory() {
    yield takeLatest(categoryActions.getCategory.type, getCategory);
}

function* watchCreateCategory() {
    yield takeLatest(categoryActions.createCategory.type, createCategory);
}

function* watchUpdateCategory() {
    yield takeLatest(categoryActions.updateCategory.type, updateCategory);
}

function* watchDeleteCategory() {
    yield takeLatest(categoryActions.deleteCategory.type, deleteCategory);
}

export default function* rootSaga() {
    yield spawn(watchGetCategories);
    yield spawn(watchGetCategory);
    yield spawn(watchCreateCategory);
    yield spawn(watchUpdateCategory);
    yield spawn(watchDeleteCategory);
}