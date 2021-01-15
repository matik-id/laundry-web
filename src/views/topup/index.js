import React, { useState, useEffect } from 'react'
import { fetchGet } from '../../helpers/myFetch'
import { numberFormat } from '../../helpers'
import Pagination from 'react-js-pagination'
import { topupUrl } from '../../Endpoint'
import moment from 'moment'
import { debounce } from 'lodash'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol, CLink,
    CRow
} from '@coreui/react'

const Topup = (props) => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [q, setQ] = useState('')

    useEffect(() => {
        const fetch = async () => {
            const hit = await fetchGet(`${topupUrl}?page=${page}&q=${q}`)
            if (hit.status) {
                setData(hit.data.docs)
                setPage(page)
                setTotalPage(hit.data.total)
            } else {
                alert(hit.message)
            }
        }
        fetch()
    }, [page, q, props])

    const handleSearch = debounce((val) => {
        setQ(val)
    }, 1000)

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            <h5>Daftar Topup Client
                                <CLink className="btn btn-danger btn-sm float-right" to="/topup/add">Tambah</CLink>
                            </h5>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Pencarian..." onChange={(e) => handleSearch(e.target.value)} />
                                </div>
                                <table className="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>No Transaksi</th>
                                            <th>Nominal</th>
                                            <th>Nama Client</th>
                                            <th>User Input</th>
                                            <th>Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => (
                                            <tr key={el.id}>
                                                <td>{i + 1}</td>
                                                <td>{el.noTrans}</td>
                                                <td>{numberFormat(el.amount)}</td>
                                                <td>{el.user.fullname}</td>
                                                <td>{el.fullname}</td>
                                                <td>{moment(el.createdAt).format('LL')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CCardBody>
                    </CCard>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={totalPage}
                        pageRangeDisplayed={5}
                        onChange={(page) => setPage(page)}
                    />
                </CCol>
            </CRow>
        </>
    )
}
export default Topup
