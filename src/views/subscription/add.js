import React, { useState, useEffect } from 'react'
import { fetchPost, fetchGet } from '../../helpers/myFetch'
import { subscribeUrl, userUrl, userStoreUrl } from '../../Endpoint'
import NumberFormat from 'react-number-format';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CLabel,
    CRow,
    CLink,
    CSelect
} from '@coreui/react'

const SubscriptionAdd = (props) => {

    const [userId, setUserId] = useState('')
    const [storeId, setStoreId] = useState('')
    const [qtyMonth, setQtyMonth] = useState(0)
    const [allUser, setAllUser] = useState([])
    const [store, setStore] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const hit = await fetchGet(`${userUrl}`)
            setAllUser(hit.data)
        }
        fetch()
    }, [])

    const handleChange = async (val) => {
        setUserId(val)
        const hit = await fetchGet(`${userStoreUrl}?userId=${val}`)
        setStore(hit.data)
    }

    const handleSave = async () => {
        if (!userId) return alert('Owner wajib diisi!')
        if (!storeId) return alert('Store wajib diisi!')
        const body = {
            userId, storeId, qtyMonth, 
            review: 'SUBMIT'
        }
        const res = await fetchPost(subscribeUrl, body)
        if (res.status) {
            alert('Data berhasil ditambahkan')
            props.history.push('/subscription')
        } else {
            alert(res.message)
            props.history.push('/subscription')
        }
    }


    return (
        <>
            <CRow>
                <CCol xs="12" sm="9">
                    <CCard>
                        <CCardHeader>
                            Tambah Subscription
                            <small> Form</small>
                        </CCardHeader>
                        <CCardBody>
                            <CFormGroup>
                                <CLabel>Owner</CLabel>
                                <CSelect custom required onChange={e => handleChange(e.target.value)}>
                                    <option value="">---Plih Owner---</option>
                                    {allUser.map((el, i) => (
                                        <option key={i} value={el.id}>{el.fullname} - ID {el.id}</option>
                                    ))}
                                </CSelect>
                            </CFormGroup>
                            {store.length > 0 ? <CFormGroup>
                                <CLabel>Store</CLabel>
                                <CSelect custom required onChange={e => setStoreId(e.target.value)}>
                                    <option value="">---Plih Store---</option>
                                    {store.map((el, i) => (
                                        <option key={i} value={el.id}>{el.name} - Code {el.code}</option>
                                    ))}
                                </CSelect>
                            </CFormGroup> : ''}
                            <CFormGroup>
                                <CLabel>Jumlah Bulan</CLabel>
                                <NumberFormat className="form-control" onChange={e => setQtyMonth(e.target.value)} thousandSeparator={true} />
                            </CFormGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="3">
                    <CButton color="success" block onClick={handleSave}>Simpan</CButton>
                    <CLink className="btn btn-secondary btn-block" to="/subscription">Batal</CLink>
                </CCol>
            </CRow>
        </>
    )
}

export default SubscriptionAdd
