import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const axiosReq = axios.create({
  withCredentials: true,
});

class NilaiDosen extends Component {
  state = {
    // mahasiswa data
    mahasiswa: [],
    // add nilai mahasiswa input form
    userId: "",
    semester: "",
    total_sks: "",
    kehadiran: "",
    tugas: "",
    uas: "",
    // edit nilai mahasiswa input form
    editId: "",
    editUserId: "",
    editName: "",
    editSemester: "",
    editTotal_sks: "",
    editKehadiran: "",
    editTugas: "",
    editUas: "",
    // add and edit nilai validation
    disabledAdd: "btn btn-danger disabled",
    disabledEdit: "btn btn-danger disabled",
  };

  // handle first load
  componentDidMount() {
    this.filterData();
  }

  // handle data update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId) {
      this.valTambah();
    } else if (prevState.semester !== this.state.semester) {
      this.valTambah();
    } else if (prevState.total_sks !== this.state.total_sks) {
      this.valTambah();
    } else if (prevState.kehadiran !== this.state.kehadiran) {
      this.valTambah();
    } else if (prevState.tugas !== this.state.tugas) {
      this.valTambah();
    } else if (prevState.uas !== this.state.uas) {
      this.valTambah();
    } else if (prevState.editTotal_sks !== this.state.editTotal_sks) {
      this.valEdit();
    } else if (prevState.editKehadiran !== this.state.editKehadiran) {
      this.valEdit();
    } else if (prevState.editTugas !== this.state.editTugas) {
      this.valEdit();
    } else if (prevState.editUas !== this.state.editUas) {
      this.valEdit();
    }
  }

  // handle change
  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // handle filter data mahasiswa
  filterData = () => {
    this.props.loading(true);

    return axiosReq
      .get(this.props.backendUrl + "/penilaian")
      .then((res) => {
        let userMahasiswa = res.data.filter((result) => {
          return result.Role === "MAHASISWA";
        });

        this.props.loading(false);
        this.setState({
          mahasiswa: userMahasiswa,
        });
      })
      .catch((err) => {
        this.props.loading(false);

        if (err.response.status === 401) {
          this.props.notify("error", "Harap login kembali!");
        } else {
          this.props.notify("error", "Terjadi kesalahan!");
        }
      });
  };

  // handle total score predicate
  hitungPredikat = (a, b, c, d) => {
    let totalScore = a + b + c + d;

    if (totalScore >= 200) {
      return (
        <span>
          {totalScore} <span class="badge bg-success">A</span>
        </span>
      );
    } else if (totalScore >= 150) {
      return (
        <span>
          {totalScore} <span class="badge bg-info">B</span>
        </span>
      );
    } else if (totalScore >= 100) {
      return (
        <span>
          {totalScore} <span class="badge bg-warning">C</span>
        </span>
      );
    } else if (totalScore >= 50) {
      return (
        <span>
          {totalScore} <span class="badge bg-secondary">D</span>
        </span>
      );
    } else if (totalScore >= 0) {
      return (
        <span>
          {totalScore} <span class="badge bg-danger">E</span>
        </span>
      );
    }
  };

  // handle tambah mata kuliah
  handleTambah = (e) => {
    e.preventDefault();
    this.props.loading(true);
    this.props.notify("info", "Menabah data, jangan menutup halaman!");

    return axiosReq
      .post(this.props.backendUrl + "/penilaian", {
        userId: this.state.userId,
        semester: this.state.semester,
        total_sks: this.state.total_sks,
        kehadiran: this.state.kehadiran,
        tugas: this.state.tugas,
        uas: this.state.uas,
      })
      .then(() => {
        this.props.loading(false);
        this.props.notify("success", "Data mata kuliah ditambahkan!");

        // refresh nilai table
        this.filterData();
      })
      .catch((err) => {
        this.props.loading(false);

        if (err.response.status === 401) {
          this.props.notify("error", "Sesi berakhir, silahkan login kembali!");
        } else {
          this.props.notify(
            "error",
            "Data gagal disimpan, " + err.response.data.message
          );
        }
      });
  };

  // handle edit penilaian
  handleEdit = (e) => {
    e.preventDefault();
    let reqUrl = this.props.backendUrl + "/penilaian/" + this.state.editId;

    this.props.loading(true);
    this.props.notify("info", "Memperbarui data, jangan menutup halaman!");

    return axiosReq
      .patch(reqUrl, {
        "userId": this.state.editUserId,
        "semester": this.state.editSemester,
        "total_sks": this.state.editTotal_sks,
        "kehadiran": this.state.editKehadiran,
        "tugas": this.state.editTugas,
        "uas": this.state.editUas,
      })
      .then(() => {
        this.props.loading(false);
        this.props.notify("success", "Data nilai diperbarui!");

        // refreh nilai table
        this.filterData();
      })
      .catch((err) => {
        this.props.loading(false);

        if (err.response.status === 401) {
          this.props.notify("error", "Sesi berakhir, silahkan login kembali!");
        } else {
          this.props.notify(
            "error",
            "Terjadi kesalahan saat mengoneksi ke server!"
          );
        }
      });
  };

  // menghapus nilai mahasiswa
  deleteNilai = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Anda yakin?",
        text: "Nilai mahasiswa ini akan dihapus secara permanen?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let reqUrl =
            this.props.backendUrl +
            "/penilaian/" +
            e.target.getAttribute("data-id");

          this.props.loading(true);
          this.props.notify("info", "Menghapus data, jangan menutup halaman!");

          return axiosReq
            .delete(reqUrl)
            .then(() => {
              this.props.loading(false);
              this.props.notify("success", "Data nilai dihapus!");

              // refresh nilai table
              this.filterData();
            })
            .catch((err) => {
              this.props.loading(false);

              if (err.response.status === 401) {
                this.props.notify(
                  "error",
                  "Sesi berakhir, silahkan login kembali!"
                );
              } else {
                this.props.notify(
                  "error",
                  "Terjadi kesalahan saat mengoneksi ke server!"
                );
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.props.notify("warning", "Anda batal menghapus data!");
        }
      });
  };

  // validasi tambah data
  valTambah = () => {
    if (
      this.state.userId === "" ||
      this.state.semester === "" ||
      this.state.total_sks === "" ||
      this.state.kehadiran === "" ||
      this.state.tugas === "" ||
      this.state.uas === ""
    ) {
      this.setState({ disabledAdd: "btn btn-danger disabled" });
    } else this.setState({ disabledAdd: "btn btn-danger" });
  };

  // validasi edit data
  valEdit = () => {
    if (
      this.state.editTotal_sks === "" ||
      this.state.editKehadiran === "" ||
      this.state.editTugas === "" ||
      this.state.editUas === ""
    ) {
      this.setState({ disabledEdit: "btn btn-danger disabled" });
    } else this.setState({ disabledEdit: "btn btn-danger" });
  };

  // handle expand table
  expand = (get) => {
    return (
      <React.Fragment>
        <table
          className="table text-center w-100 my-2"
          hidden={get.data.Penilaian.length === 0}
        >
          <thead>
            <tr>
              <th></th>
              <th>Kehadiran</th>
              <th>Jumlah SKS</th>
              <th>Nilai Tugas</th>
              <th>Nilai Ulangan</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {get.data.Penilaian.map((data, index) => (
              <tr key={index}>
                <th>Semester {data.semester}</th>
                <td>{data.kehadiran}</td>
                <td>{data.total_sks}</td>
                <td>{data.tugas}</td>
                <td>{data.uas}</td>
                <td>
                  {this.hitungPredikat(
                    data.kehadiran,
                    data.total_sks,
                    data.tugas,
                    data.uas
                  )}
                </td>
                <td>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Small button group"
                  >
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      data-coreui-toggle="modal"
                      data-coreui-target="#exampleModalCenteredScrollable2"
                      onClick={() => {
                        this.setState({
                          editId: data.id,
                          editName: get.data.name,
                          editUserId: data.userId,
                          editSemester: data.semester,
                          editTotal_sks: data.total_sks,
                          editKehadiran: data.kehadiran,
                          editTugas: data.tugas,
                          editUas: data.uas,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      data-id={data.id}
                      onClick={this.deleteNilai}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          className="py-2 text-center"
          hidden={get.data.Penilaian.length !== 0}
        >
          Belum ada nilai.
        </p>
      </React.Fragment>
    );
  };

  render() {
    const columnsMahasiswa = [
      {
        name: "NIM",
        selector: (row) => row.username,
      },
      {
        name: "Nama",
        selector: (row) => row.name,
      },
    ];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-7">
            <p>Daftar nilai yang tersedia:</p>
          </div>
          <div className="col-lg-5 text-end">
            <button
              className="btn btn-outline-danger"
              type="button"
              hidden={this.props.isLoading === true}
              onClick={this.filterData}
            >
              <svg className="icon me-2">
                <use href="vendors/@coreui/icons/svg/free.svg#cil-sync"></use>
              </svg>
              Refresh
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              hidden={this.props.isLoading === false}
              disabled
            >
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Mengambil data...
            </button>
            <button
              className="btn btn-danger ms-2"
              type="button"
              data-coreui-toggle="modal"
              data-coreui-target="#exampleModalCenteredScrollable1"
            >
              <svg className="icon me-2">
                <use href="vendors/@coreui/icons/svg/free.svg#cil-plus"></use>
              </svg>
              Tambah Nilai
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-end">
            <DataTable
              columns={columnsMahasiswa}
              data={this.state.mahasiswa}
              expandableRows
              expandableRowsComponent={this.expand}
              pagination
            />

            <div
              className="modal fade"
              id="exampleModalCenteredScrollable1"
              tabIndex="-1"
              aria-labelledby="exampleModalCenteredScrollableTitle1"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="exampleModalCenteredScrollableTitle1"
                    >
                      Tambah Mata Kuliah
                    </h5>
                    <button
                      className="btn-close"
                      type="button"
                      data-coreui-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleTambah}>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="1">
                          Fakultas
                        </label>
                        <div className="col-sm-8">
                          <select
                            name="userId"
                            className="form-select form-select-sm"
                            onChange={this.handleChange}
                            required
                          >
                            <option value="" readOnly>
                              Pilih
                            </option>
                            {this.state.mahasiswa.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="3">
                          Semester
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="semester"
                            className="form-control"
                            id="3"
                            type="number"
                            placeholder="Pilih semster 1-8"
                            min="1"
                            max="8"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="3">
                          Jumlah SKS
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="total_sks"
                            className="form-control"
                            id="3"
                            type="text"
                            placeholder="Jumlah SKS yang diambil Mahasiswa"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="4">
                          Kehadiran
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="kehadiran"
                            className="form-control"
                            id="4"
                            type="text"
                            placeholder="Jumlah kehadiran mahasiswa"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="5">
                          Nilai Tugas
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="tugas"
                            className="form-control"
                            id="5"
                            type="text"
                            placeholder="Penilaian akhir tugas-tugas Mahasiswa"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="5">
                          Nilai UAS
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="uas"
                            className="form-control"
                            id="5"
                            type="text"
                            placeholder="Nilai ulangan akhir Mahasiswa"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <input type="submit" id="tambah" hidden />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      data-coreui-toggle="modal"
                      data-coreui-target="#exampleModalCenteredScrollable"
                    >
                      Batal
                    </button>
                    <label
                      className={this.state.disabledAdd}
                      htmlFor="tambah"
                      data-coreui-dismiss="modal"
                    >
                      Simpan
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModalCenteredScrollable2"
              tabIndex="-1"
              aria-labelledby="exampleModalCenteredScrollableTitle2"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="exampleModalCenteredScrollableTitle2"
                    >
                      Edit Mata Kuliah
                    </h5>
                    <button
                      className="btn-close"
                      type="button"
                      data-coreui-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleEdit}>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="1">
                          Nama
                        </label>
                        <div className="col-sm-8">
                          <input
                            className="form-control-plaintext"
                            id="1"
                            type="text"
                            readOnly
                            value={this.state.editName}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="2">
                          Semester
                        </label>
                        <div className="col-sm-8">
                          <input
                            className="form-control-plaintext"
                            id="1"
                            type="text"
                            readOnly
                            value={this.state.editSemester}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="3">
                          Jumlah SKS
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="editTotal_sks"
                            className="form-control"
                            id="3"
                            type="text"
                            placeholder="Jumlah SKS yang diambil Mahasiswa"
                            value={this.state.editTotal_sks}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="4">
                          Kehadiran
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="editKehadiran"
                            className="form-control"
                            id="4"
                            type="text"
                            placeholder="Jumlah kehadiran mahasiswa"
                            value={this.state.editKehadiran}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="5">
                          Nilai Tugas
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="editTugas"
                            className="form-control"
                            id="5"
                            type="text"
                            placeholder="Penilaian akhir tugas-tugas Mahasiswa"
                            value={this.state.editTugas}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label" htmlFor="5">
                          Nilai UAS
                        </label>
                        <div className="col-sm-8">
                          <input
                            name="editUas"
                            className="form-control"
                            id="5"
                            type="text"
                            placeholder="Nilai ulangan akhir Mahasiswa"
                            value={this.state.editUas}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <input type="submit" id="edit" hidden />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      data-coreui-toggle="modal"
                      data-coreui-target="#exampleModalCenteredScrollable"
                    >
                      Batal
                    </button>
                    <label
                      className={this.state.disabledEdit}
                      htmlFor="edit"
                      data-coreui-dismiss="modal"
                    >
                      Simpan
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(NilaiDosen);
