export default {
    product: {
        id: 0,
        name: '',
        description: '',
        gender: '',
        categoryId: 0,
        price: 0
    },
    products: [],
    idProduct: 0,
    // data fetching state
    isFetchingGetProducts: false,
    isSuccessGetProducts: false,
    isErrorGetProducts: false,
    isFetchingGetProduct: false,
    isSuccessGetProduct: false,
    isErrorGetProduct: false,
    isFetchingCreateProduct: false,
    isSuccessCreateProduct: false,
    isErrorCreateProduct: false,
    isFetchingUpdateProduct: false,
    isSuccessUpdateProduct: false,
    isErrorUpdateProduct: false,
    isFetchingDeleteProduct: false,
    isSuccessDeleteProduct: false,
    isErrorDeleteProduct: false,
}
