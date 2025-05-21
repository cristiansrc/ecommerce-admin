import authSaga from 'infrastructure/services/auth';
import categorySaga from 'infrastructure/services/category';
import productSaga from 'infrastructure/services/product';
import productImageSaga from 'infrastructure/services/productImage'
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(authSaga);
    yield fork(categorySaga);
    yield fork(productSaga);
    yield fork(productImageSaga);
}