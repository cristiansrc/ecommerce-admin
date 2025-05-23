export default {
    isAuthenticated: false,
    isWrongCredentials: false,
    name: '',
    lastName: '',
    email: '',
    authorization: '',
    // data fetching state
    isFetchingGetToken: false,
    isSuccessGetToken: false,
    isErrorGetToken: false,
    isFetchingRefreshToken: false,
    isSuccessRefreshToken: false,
    isErrorRefreshToken: false,
    isFetchingRevokeToken: false,
    isSuccessRevokeToken: false,
    isErrorRevokeToken: false,
}