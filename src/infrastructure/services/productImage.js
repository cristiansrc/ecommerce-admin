import { producImagestActions } from 'application/actions/productImage'; 
import { put, spawn, takeLatest } from 'redux-saga/effects';
import msproductimage from "infrastructure/agent/msproductimage";

function* getProductImages({ payload }){
    yield put(producImagestActions.getProductImagesPending());
    const { data, error } = yield msproductimage.get(`/product/${payload}`);
    if (error.code !== 200) {
        yield put(producImagestActions.getProductImagesError());
    } else {
        yield put(producImagestActions.getProductImagesSuccess(data));
    }   
}

function* getProductImage({ payload }){
    yield put(producImagestActions.getProductImagePending());
    const { data, error } = yield msproductimage.get(`/${payload}`);
    if (error.code !== 200) {
        yield put(producImagestActions.getProductImageError());
    } else {
        yield put(producImagestActions.getProductImageSuccess(data));
    }   
}

function* createProductImage({ payload }){
    yield put(producImagestActions.createProductImagePending());
    const { error } = yield msproductimage.post('/', payload);
    if (error.code !== 200) {
        yield put(producImagestActions.createProductImageError());
    } else {
        yield put(producImagestActions.createProductImageSuccess());
    }   
}

function* deleteProductImage({ payload }){
    yield put(producImagestActions.deleteProductImagePending());
    const { error } = yield msproductimage.delete(`/${payload}`);
    if (error.code !== 200) {
        yield put(producImagestActions.deleteProductImageError());
    } else {
        yield put(producImagestActions.deleteProductImageSuccess());
    }   
}

function* watchGetProductImages() {
    yield takeLatest(producImagestActions.getProductImages.type, getProductImages);
}

function* watchGetProductImage() {
    yield takeLatest(producImagestActions.getProductImage.type, getProductImage);
}

function* watchCreateProductImage() {
    yield takeLatest(producImagestActions.createProductImage.type, createProductImage);
}

function* watchDeleteProductImage() {
    yield takeLatest(producImagestActions.deleteProductImage.type, deleteProductImage);
}

export default function* rootSaga() {
    yield spawn(watchGetProductImages);
    yield spawn(watchGetProductImage);
    yield spawn(watchCreateProductImage);
    yield spawn(watchDeleteProductImage);
}