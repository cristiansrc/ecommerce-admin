import { productActions } from "application/actions/product";
import msproduct from "infrastructure/agent/msproduct";
import { put, spawn, takeLatest } from 'redux-saga/effects';

function* getProducts() {
    yield put(productActions.getProductsPending());
    const { data, error } = yield msproduct.get('/');
    if (error.code !== 200) {
        yield put(productActions.getProductsError());
    } else {
        yield put(productActions.getProductsSuccess(data));
    }
}

function* getProduct({ payload }) {
    yield put(productActions.getProductPending());
    const { data, error } = yield msproduct.get(`/${payload}`);
    if (error.code !== 200) {
        yield put(productActions.getProductError());
    } else {
        yield put(productActions.getProductSuccess(data));
    }
}

function* createProduct({ payload }) {
    yield put(productActions.createProductPending());
    const { data, error } = yield msproduct.post('/', payload);
    if (error.code !== 200) {
        yield put(productActions.createProductError());
    } else {
        yield put(productActions.createProductSuccess(data));
    }
}

function* updateProduct({ payload }) {
    yield put(productActions.updateProductPending());
    const { error } = yield msproduct.put('/', payload);
    if (error.code !== 200) {
        yield put(productActions.updateProductError());
    } else {
        yield put(productActions.updateProductSuccess());
    }
}

function* deleteProduct({ payload }) {
    yield put(productActions.deleteProductPending());
    const { error } = yield msproduct.delete(`/${payload}`);
    if (error.code !== 200) {
        yield put(productActions.deleteProductError());
    } else {
        yield put(productActions.deleteProductSuccess());
    }
}

function* watchGetProducts() {
    yield takeLatest(productActions.getProducts.type, getProducts);
}

function* watchGetProduct() {
    yield takeLatest(productActions.getProduct.type, getProduct);
}

function* watchCreateProduct() {
    yield takeLatest(productActions.createProduct.type, createProduct);
}

function* watchUpdateProduct() {
    yield takeLatest(productActions.updateProduct.type, updateProduct);
}

function* watchDeleteProduct() {
    yield takeLatest(productActions.deleteProduct.type, deleteProduct);
}

export default function* rootSaga() {
    yield spawn(watchGetProducts);
    yield spawn(watchGetProduct);
    yield spawn(watchCreateProduct);
    yield spawn(watchUpdateProduct);
    yield spawn(watchDeleteProduct);
}
