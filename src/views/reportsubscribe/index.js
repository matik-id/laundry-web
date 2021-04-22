import React, { useState, useEffect } from 'react'
import { fetchGet } from '../../helpers/myFetch'
import { numberFormat } from '../../helpers'
import { reportSubscribe } from '../../Endpoint'
import moment from 'moment'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormGroup,
    CLabel,
    CInput, CButton, CSpinner
} from '@coreui/react'
import FileDownload from 'js-file-download'
const start = moment().format('YYYY-MM-01')
const now = moment().format('YYYY-MM-DD')

const ReportSubscription = (props) => {

    const [data, setData] = useState([])
    const [dateStart, setDateStart] = useState(start)
    const [dateEnd, setDateEnd] = useState(now)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const hit = await Promise.all([
                fetchGet(`${reportSubscribe}?date_start=${dateStart}&date_end=${dateEnd}`),
            ])
            setData(hit[0].data)
            setLoading(false)
        }
        fetch()
    }, [dateStart, dateEnd, props])

    let grand_total = 0
    for (const i of data) {
        grand_total += parseInt(i.grandTotal - i.admin)
    }

    const handleDownload = async () => {
        try {
            setLoading(true)
            const res = await fetchGet(`${reportSubscribe}?date_start=${dateStart}&date_end=${dateEnd}&print=OK`, 'blob')
            FileDownload(res, `Laporan_Subscription_${new Date().getTime()}.xlsx`)
            setLoading(false)
        } catch (error) {
            alert('Server timeout')
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            <h5>Report Subscription Matik Laundry</h5>
                        </CCardHeader>
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CFormGroup>
                                        <CLabel>Start Date</CLabel>
                                        <CInput type="date" placeholder="Start Date" required onChange={e => setDateStart(e.target.value)} />
                                    </CFormGroup>
                                </CCol>
                                <CCol>
                                    <CFormGroup>
                                        <CLabel>End Date</CLabel>
                                        <CInput type="date" placeholder="End Date" required onChange={e => setDateEnd(e.target.value)} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <div className="table-responsive">
                                <table className="table table-sm table-hover table-bordered" id="report">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>NO</th>
                                            <th>DATE</th>
                                            <th>OUTLET</th>
                                            <th>BANK</th>
                                            <th>AMOUNT</th>
                                            <th>QTY MONTH</th>
                                            <th>DISCOUNT</th>
                                            <th>ADMIN</th>
                                            <th>GROSS</th>
                                            <th>NETTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{moment(el.createdAt).format('DD MMM YYYY')}</td>
                                                <td>{el.store.name}</td>
                                                <td>{el.bankName}</td>
                                                <td align="right">{numberFormat(parseInt(el.charge))}</td>
                                                <td align="right">{numberFormat(parseInt(el.qtyMonth))}</td>
                                                <td align="right">{numberFormat(parseInt(el.disc))}</td>
                                                <td align="right">{numberFormat(parseInt(el.admin))}</td>
                                                <td align="right">{numberFormat(parseInt(el.grandTotal))}</td>
                                                <td align="right">{numberFormat(parseInt(el.grandTotal - el.admin))}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-info text-white font-weight-bold">
                                            <td colSpan="9" className="text-center">GRAND TOTAL</td>
                                            <td align="right">{numberFormat(grand_total)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <CButton className="float-right" color="success" disabled={isLoading} onClick={handleDownload}>Download Excel</CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default ReportSubscription
