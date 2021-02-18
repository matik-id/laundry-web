import React, { useState } from "react";
import moment from "moment";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CAlert,
} from "@coreui/react";
import idLocale from "moment/locale/id";
moment.locale("id", idLocale);
const Subscribe = (props) => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [link, setLink] = useState("");

  const handleSave = async () => {
    if (!dateStart) return alert("Tanggal mulai wajib diisi!");
    if (!dateEnd) return alert("Tanggal akhir wajib diisi!");

    setLink(
      "https://api.laundry.matik.id/subscribe/recap?start_date=" +
        dateStart +
        "&end_date=" +
        dateEnd
    );
  };
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <h5>Rekapitulasi Pelanggan Berdasarkan Tanggal</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Tanggal Mulai"
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                  </div>
                </CCol>
                <CCol>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Tanggal Akhir"
                      onChange={(e) => setDateEnd(e.target.value)}
                    />
                  </div>
                </CCol>
                <CCol>
                  <CButton color="success" block onClick={handleSave}>
                    Rekap
                  </CButton>
                </CCol>
              </CRow>
              {link && (
                <CRow>
                  <CCol>
                    <CAlert color="success">
                      <center>
                        Silakan copy-paster link di bawah ini
                        <h5>
                          {link}
                        </h5>
                      </center>
                    </CAlert>
                  </CCol>
                </CRow>
              )}
              <CRow>
                <CCol>
                  <iframe
                    src="https://json-csv.com/"
                    title="CSV"
                    height="500"
                    width="100%"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Subscribe;
