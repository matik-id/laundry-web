import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { subscribeUrl } from "../../Endpoint";
import moment from "moment";
import {
    CSpinner,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CBadge,
    CLink
} from "@coreui/react";
import { numberFormat } from "../../helpers";
import { fetchGet } from "../../helpers/myFetch";
import idLocale from "moment/locale/id";
moment.updateLocale("id", idLocale);
const Subscription = (props) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const hit = await fetchGet(`${subscribeUrl}?page=${page}`);
            if (hit.status) {
                setData(hit.data.docs);
                setPage(page);
                setPerPage(10);
                setTotalPage(hit.data.total);
            } else {
                alert(hit.message);
            }
            setLoading(false);
        };
        fetch();
    }, [page, props]);

    let no = (page - 1) * perPage + 1;

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            <h5>Daftar Subscription
                                <CLink className="btn btn-danger btn-sm float-right" to="/subscription/add">Tambah</CLink>
                            </h5>
                        </CCardHeader>
                        {isLoading && (
                            <div className="text-center">
                                <CSpinner color="info" />
                            </div>
                        )}
                        <CCardBody>
                            <div className="table-responsive">
                                <table className="table table-sm table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal</th>
                                            <th>No Trans</th>
                                            <th>Outlet</th>
                                            {/* <th>Owner</th> */}
                                            <th>Charge</th>
                                            <th>Jml Bulan</th>
                                            <th>Diskon</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{no++}</td>
                                                    <td>{moment(el.createdAt).format("DD MMMM YYYY")}</td>
                                                    <td>{el.noTrans}</td>
                                                    <td>{el.store.name}</td>
                                                    {/* <td>{el.user.fullname}</td> */}
                                                    <td>{numberFormat(el.charge)}</td>
                                                    <td>{numberFormat(el.qtyMonth)}</td>
                                                    <td>{numberFormat(el.disc)}</td>
                                                    <td>{numberFormat(el.grandTotal - el.admin)}</td>
                                                    <td>
                                                        {el.status ? (
                                                            <CBadge color="success">Paid</CBadge>
                                                        ) : (
                                                            <CBadge color="warning">Not Paid</CBadge>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
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
        </>
    );
};

export default Subscription;
