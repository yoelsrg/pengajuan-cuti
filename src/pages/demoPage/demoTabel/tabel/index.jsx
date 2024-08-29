import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk modal
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // State untuk karyawan yang dipilih dan form data
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    nama_lengkap: "",
    nip: "",
    alamat: "",
    ruangan: "",
    jabatan: "",
    awal_masuk_kerja: "",
    email: "",
    no_handphone: "",
  });

  const [newEmployee, setNewEmployee] = useState({
    nama_lengkap: "",
    nip: "",
    alamat: "",
    ruangan: "",
    jabatan: "",
    awal_masuk_kerja: "",
    email: "",
    no_handphone: "",
  });

  // Handler untuk modal
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedEmployee({
      nama_lengkap: employee.nama_lengkap,
      nip: employee.nip,
      alamat: employee.alamat,
      ruangan: employee.ruangan,
      jabatan: employee.jabatan,
      awal_masuk_kerja: employee.awal_masuk_kerja,
      email: employee.email,
      password: employee.password,
      no_handphone: employee.no_handphone,
    });
    setShowUpdate(true);
  };

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setNewEmployee({
      nama_lengkap: "",
      nip: "",
      alamat: "",
      ruangan: "",
      jabatan: "",
      awal_masuk_kerja: "",
      email: "",
      no_handphone: "",
    });
    setShowAdd(true);
  };

  useEffect(() => {
    const url = "https://edeb-36-94-179-67.ngrok-free.app/api/pegawai";

    axios
      .get(url, { headers: { "ngrok-skip-browser-warning": "1" } })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
          setLoading(false);
        } else {
          console.error("Expected an array but received:", response.data);
          setError(new Error("Data format is incorrect"));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the pegawai data!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`https://edeb-36-94-179-67.ngrok-free.app/api/pegawai/${id}`)
        .then((response) => {
          setEmployees(
            employees.filter((employee) => employee.id_pegawai !== id)
          );
          alert("Employee successfully deleted");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          alert("Failed to delete employee");
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://edeb-36-94-179-67.ngrok-free.app/api/pegawai/${selectedEmployee.id_pegawai}`,
        updatedEmployee
      )
      .then((response) => {
        setEmployees(
          employees.map((employee) =>
            employee.id_pegawai === selectedEmployee.id_pegawai
              ? response.data
              : employee
          )
        );
        alert("Employee successfully updated");
        handleCloseUpdate();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("Failed to update employee");
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("https://edeb-36-94-179-67.ngrok-free.app/api/pegawai", newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        alert("Employee successfully added");
        handleCloseAdd();
      })
      .catch((error) => {
        console.error(
          "Add Employee Error:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to add employee");
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter karyawan berdasarkan search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.ruangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
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
            <Button onClick={handleShowAdd} className="btn btn-dark ms-auto">
              Tambah Pegawai
            </Button>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <h5>Total Pegawai: {filteredEmployees.length}</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Alamat</th>
                    <th>Ruangan</th>
                    <th>Jabatan</th>
                    <th>Awal Masuk</th>
                    <th>Email</th>
                    <th>No Handphone</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr key={employee.id_pegawai}>
                      <td>{index + 1}</td>
                      <td>{employee.nama_lengkap}</td>
                      <td>{employee.nip}</td>
                      <td>{employee.alamat}</td>
                      <td>{employee.ruangan}</td>
                      <td>{employee.jabatan}</td>
                      <td>
                        {new Date(
                          employee.awal_masuk_kerja
                        ).toLocaleDateString()}
                      </td>
                      <td>{employee.email}</td>
                      <td>{employee.no_handphone}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button
                            onClick={() => handleShowUpdate(employee)}
                            variant="warning"
                            size="sm"
                            className="me-1"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => handleDelete(employee.id_pegawai)}
                            variant="danger"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk menambah karyawan */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pegawai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama_lengkap"
                value={newEmployee.nama_lengkap}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    nama_lengkap: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="number"
                name="nip"
                value={newEmployee.nip}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    nip: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                name="alamat"
                value={newEmployee.alamat}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    alamat: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ruangan</Form.Label>
              <Form.Control
                type="text"
                name="ruangan"
                value={newEmployee.ruangan}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, ruangan: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                name="jabatan"
                value={newEmployee.jabatan}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, jabatan: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Awal Masuk</Form.Label>
              <Form.Control
                type="date"
                name="awal_masuk_kerja"
                value={newEmployee.awal_masuk_kerja}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee, awal_masuk_kerja: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={newEmployee.password}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, password: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No Handphone</Form.Label>
              <Form.Control
                type="text"
                name="no_handphone"
                value={newEmployee.no_handphone}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    no_handphone: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Tambah
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal untuk update karyawan */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Pegawai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama_lengkap"
                value={updatedEmployee.nama_lengkap}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    nama_lengkap: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="number"
                name="nip"
                value={updatedEmployee.nip}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    nip: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                name="alamat"
                value={updatedEmployee.alamat}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    alamat: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ruangan</Form.Label>
              <Form.Control
                type="text"
                name="ruangan"
                value={updatedEmployee.ruangan}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    ruangan: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                name="jabatan"
                value={updatedEmployee.jabatan}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    jabatan: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Awal Masuk</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_masuk_kerja"
                value={updatedEmployee.awal_masuk_kerja}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    awal_masuk_kerja: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedEmployee.email}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    email: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No Handphone</Form.Label>
              <Form.Control
                type="text"
                name="no_handphone"
                value={updatedEmployee.no_handphone}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    no_handphone: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Pegawai
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeList;
