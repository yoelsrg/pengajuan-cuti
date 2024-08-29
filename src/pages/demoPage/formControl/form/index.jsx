import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Card, Pagination } from 'react-bootstrap';

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [newRequest, setNewRequest] = useState({
    nip: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
    alasan_cuti: "",
    tipe_cuti: "",
    status_pengajuan: "Pending", // Default status
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust the number of items per page here

  const tipeCutiOptions = ["Cuti Tahunan", "Cuti Sakit", "Cuti Melahirkan", "Cuti Alasan Penting", "Cuti Lainnya"];

  useEffect(() => {
    const url = "https://edeb-36-94-179-67.ngrok-free.app/api/pengajuan-cuti";
    axios
      .get(url, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setLeaveRequests(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setError(new Error("Data format is incorrect"));
        }
      })
      .catch((error) => {
        console.error("Error fetching leave request data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://edeb-36-94-179-67.ngrok-free.app/api/pengajuan-cuti";

    axios.post(url, newRequest, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((response) => {
        setLeaveRequests([...leaveRequests, response.data]);
        alert("Leave request successfully added");
        setNewRequest({
          nip: "",
          tanggal_mulai: "",
          tanggal_berakhir: "",
          alasan_cuti: "",
          tipe_cuti: "",
          status_pengajuan: "Pending",
        });
      })
      .catch((error) => {
        console.error("Error adding leave request:", error);
        alert("Failed to add leave request");
      });
  };

  const handleChange = (e) => {
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value,
    });
  };

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.tanggal_mulai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tanggal_berakhir.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.alasan_cuti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tipe_cuti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status_pengajuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.pegawai.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const pageCount = Math.ceil(filteredRequests.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="row justify-content-center">
      <Card className="shadow-sm mb-4">
        <Card.Header>
          <h5 className="mb-0">Form Submit Pengajuan Cuti</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formNip">
                  <Form.Label>NIP</Form.Label>
                  <Form.Control
                    type="text"
                    name="nip"
                    value={newRequest.nip}
                    onChange={handleChange}
                    placeholder="Silahkan Masukan NIP"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTipe">
                  <Form.Label>Tipe Cuti</Form.Label>
                  <Form.Control
                    as="select"
                    name="tipe_cuti"
                    value={newRequest.tipe_cuti}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Tipe Cuti</option>
                    {tipeCutiOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formTglMulai">
                  <Form.Label>Tanggal Mulai</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal_mulai"
                    value={newRequest.tanggal_mulai}
                    onChange={handleChange}
                    placeholder="Tanggal Mulai Cuti"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTglBerakhir">
                  <Form.Label>Tanggal Berakhir</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal_berakhir"
                    value={newRequest.tanggal_berakhir}
                    onChange={handleChange}
                    placeholder="Tanggal Berakhir Cuti"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formAlasan" className="mb-3">
              <Form.Label>Alasan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="alasan_cuti"
                value={newRequest.alasan_cuti}
                onChange={handleChange}
                placeholder="Masukan Alasan Cuti"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-start">
              <Button variant="primary" type="submit" className="btn-lg">
                Kirim
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className="col-lg-12 mb-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="me-2"
              />
            </div>
          </div>
          <div className="card-body">
            <h5 className="mb-3">Total Pengajuan Cuti: {filteredRequests.length}</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>NIP</th>
                    <th>Nama Pegawai</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
                    <th>Alasan</th>
                    <th>Tipe Cuti</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request, index) => (
                    <tr key={request.id_pengajuan_cuti}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{request.nip}</td>
                      <td>{request.pegawai.nama_lengkap}</td>
                      <td>{new Date(request.tanggal_mulai).toLocaleDateString()}</td>
                      <td>{new Date(request.tanggal_berakhir).toLocaleDateString()}</td>
                      <td>{request.alasan_cuti}</td>
                      <td>{request.tipe_cuti}</td>
                      <td>{request.status_pengajuan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(pageCount)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount}
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestList;
