import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { check } from '../Endpoint'
import { fetchGet } from '../helpers/myFetch'
import { useSelector, useDispatch } from 'react-redux'

const PrivateRoute = (props) => {

    const isLogin = useSelector(state => state.isLogin)
    const dispatch = useDispatch()

    const checkAuth = async () => {
        const hit = await fetchGet(check)
        if (hit.status) {
            dispatch({ type: 'IS_LOGIN', isLogin: true })
            return isLogin
        } else {
            localStorage.removeItem('authJwt')
            dispatch({ type: 'IS_LOGIN', isLogin: false })
            return isLogin
        }
    }

    if (!localStorage.getItem('authJwt')) {
        return (<Redirect to="/login" />)
    } else {
        const isAuth = checkAuth()
        if (isAuth) {
            return (<Route {...props} />)
        } else {
            return (<Redirect to="/login" />)
        }
    }

}
export default PrivateRoute