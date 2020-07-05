import React, { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import { Stores } from '../../Endpoint'
import moment from 'moment'
import {
    CSpinner,
    CCard,
    CCardBody,
    CCardHeader,
    CCol, CButton,
    CRow, CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'
import { numberFormat } from '../../helpers'
import { fetchGet } from '../../helpers/myFetch'
import { debounce } from 'lodash'
var idLocale = require('moment/locale/id');
moment.locale('id', idLocale);  
const Store = (props) => {


    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [totalPage, setTotalPage] = useState(0)
    const [q, setQ] = useState('')
    const [modal, setModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [obj, setObj] = useState({})

    const toggle = (obj) => {
        if (!modal) {
            setModal(true)
            setObj(obj)
        } else {
            setModal(false)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const hit = await fetchGet(`${Stores}?page=${page}&q=${q}`)
            if (hit.status) {
                setData(hit.data.data)
                setPage(page)
                setPerPage(hit.data.pagination.perPage)
                setTotalPage(hit.data.pagination.totalPages * hit.data.pagination.perPage)
            } else {
                alert(hit.message)
            }
            setLoading(false)
        }
        fetch()
    }, [page, q, props])

    const handleSearch = debounce((val) => {
        setQ(val)
    }, 500)
    let no = (page - 1) * perPage + 1

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            <h5>Daftar Outlet</h5>
                        </CCardHeader>
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Cari berdasarkan nama outlet..." onChange={(e) => handleSearch(e.target.value)} />
                            </div>
                            <table className="table table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Outlet</th>
                                        <th>Nama Owner</th>
                                        <th>Telepon</th>
                                        <th>Email</th>
                                        <th>Masa Aktif</th>
                                        <th>Saldo</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el, i) => {
                                        let handphone = el.phone
                                        return (
                                            <tr key={i}>
                                                <td>{no++}</td>
                                                <td>{el.name}</td>
                                                <td>{el.userId.fullname}</td>
                                                <td>{el.phone}</td>
                                                <td>{el.userId.email}</td>
                                                <td>{
                                                    el.expired ? 'HABIS' : moment(el.dueDate).format('DD MMMM YYYY')
                                                }</td>
                                                <td>{numberFormat(el.userId.saldo)}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-success" onClick={() => toggle(el)}>Detail</button> 
                                                    <a href={'https://wa.me/62'+handphone.substr(1)} className="btn btn-sm btn-success">Whatsapp</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={page}
                        itemsCountPerPage={perPage}
                        totalItemsCount={totalPage}
                        pageRangeDisplayed={5}
                        onChange={(page) => setPage(page)}
                    />
                </CCol>
            </CRow>
            <CModal show={modal} onClose={toggle} size="lg">
                <CModalHeader closeButton>Detail Outlet</CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol md="4">
                            <img src={obj.logo} alt="" />
                        </CCol>
                        <CCol md="8">
                            <table className="table table-sm table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td>Nama Outlet</td>
                                        <td>:</td>
                                        <td>{obj.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Alamat</td>
                                        <td>:</td>
                                        <td>{obj.address}</td>
                                    </tr>
                                    <tr>
                                        <td>No Telepon</td>
                                        <td>:</td>
                                        <td>{obj.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal Daftar</td>
                                        <td>:</td>
                                        <td>{moment(obj.createdAt).format('LLLL')}</td>
                                    </tr>
                                    <tr>
                                        <td>Masa Aktif</td>
                                        <td>:</td>
                                        <td>{moment(obj.dueDate).format('LLLL')}</td>
                                    </tr>
                                    <tr>
                                        <td>Expired</td>
                                        <td>:</td>
                                        <td>{(obj.expired) ? 'Ya' : 'Tidak'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={toggle}>Tutup</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Store

