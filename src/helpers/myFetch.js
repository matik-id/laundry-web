import axios from 'axios'

export const fetchGet = async (url) => {
    try {
        const hit = await axios.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authJwt') } })
        return hit.data
    } catch (error) {
        console.log(error)
        alert('server timeout!')
    }
}

export const fetchPost = async (url, body) => {
    try {
        const hit = await axios.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authJwt') } })
        return hit.data
    } catch (error) {
        console.log(error)
        alert('server timeout!')
    }
}

export const fetchPut = async (url, body) => {
    try {
        const hit = await axios.put(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authJwt') } })
        return hit.data
    } catch (error) {
        console.log(error)
        alert('server timeout!')
    }
}