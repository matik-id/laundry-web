import React, { useState, useEffect } from 'react'
import { fetchPost, fetchGet } from '../../helpers/myFetch'
import { cleanSeparator } from '../../helpers'
import { topupUrl, userUrl } from '../../Endpoint'
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

const TopupAdd = (props) => {

    const [userId, setUserId] = useState('')
    const [amount, setAmount] = useState('')
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const hit = await fetchGet(`${userUrl}`)
            setAllUser(hit.data)
        }
        fetch()
    }, [])

    const handleSave = async () => {
        if (!userId) return alert('User wajib diisi!')
        const body = {
            userId, amount
        }
        const res = await fetchPost(topupUrl, body)
        if (res.status) {
            alert('Data berhasil ditambahkan')
            props.history.push('/topup')
        } else {
            alert(res.message)
            props.history.push('/topup')
        }
    }


    return (
        <>
            <CRow>
                <CCol xs="12" sm="9">
                    <CCard>
                        <CCardHeader>
                            Tambah Topup
                            <small> Form</small>
                        </CCardHeader>
                        <CCardBody>
                            <CFormGroup>
                                <CLabel>User</CLabel>
                                <CSelect custom required onChange={e => setUserId(e.target.value)}>
                                    <option value="">---Plih User---</option>
                                    {allUser.map((el, i) => (
                                        <option key={i} value={el.id}>ID {el.id} - {el.fullname}</option>
                                    ))}
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Nominal</CLabel>
                                <NumberFormat className="form-control" onChange={e => setAmount(cleanSeparator(e.target.value))} thousandSeparator={true} prefix={'Rp. '} />
                            </CFormGroup>

                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="3">
                    <CButton color="success" block onClick={handleSave}>Simpan</CButton>
                    <CLink className="btn btn-secondary btn-block" to="/topup/dc">Batal</CLink>
                </CCol>
            </CRow>
        </>
    )
}

export default TopupAdd
