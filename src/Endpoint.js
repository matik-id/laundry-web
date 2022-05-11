const URL = process.env.REACT_APP_API_URL

export const login = URL + '/admin/login'
export const check = URL + '/admin/check'
export const Stores = URL + '/admin/stores'
export const topupUrl = URL + '/admin/deposit'
export const userUrl = URL + '/admin/users'
export const userStoreUrl = URL + '/admin/user/stores'
export const subscribeUrl = URL + '/admin/subscribe'
export const reportSubscribe = URL + '/admin/subscribe/report'
export const expiredAddUrl = URL + '/admin/expired/add'