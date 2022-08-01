import axios from "axios";
import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const axiosReq = axios.create({
  withCredentials: true,
});

class JadwalDosen extends Component {
  state = {
    // mata kuliah data
    matkul: "",
    // mata kuliah data filtered
    matkulFakultas: "",
    // add mata kuliah form data
    prodi: "",
    class: "",
    name: "",
    code: "",
    room: "",
    // edit mata kuliah form data
    editId: "",
    editProdi: "",
    editClass: "",
    editName: "",
    editCode: "",
    editRoom: "",
    // add and edit mata kuliah validation
    disabledAdd: "btn btn-danger disabled",
    disabledEdit: "btn btn-danger disabled",
  };

  // handle first load
  componentDidMount() {
    this.getMatkul();
  }

  // handle data update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.prodi !== this.state.prodi) {
      this.valTambah();
    } else if (prevState.class !== this.state.class) {
      this.valTambah();
    } else if (prevState.name !== this.state.name) {
      this.valTambah();
    } else if (prevState.code !== this.state.code) {
      this.valTambah();
    } else if (prevState.room !== this.state.room) {
      this.valTambah();
    } else if (prevState.editName !== this.state.editName) {
      this.valEdit();
    } else if (prevState.editCode !== this.state.editCode) {
      this.valEdit();
    } else if (prevState.editRoom !== this.state.editRoom) {
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

  // session handler
  getMatkul = () => {
    this.props.loading(true);

    return axiosReq
      .get(this.props.backendUrl + "/mata-kuliah")
      .then((res) => {
        this.props.loading(false);
        this.setState({
          matkul: res.data,
          matkulFakultas: res.data,
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

  // filter mata kuliah
  filterFakultas = (e) => {
    if (e.target.value === "") {
      this.setState({
        matkulFakultas: this.state.matkul,
      });
    } else {
      let newMatkul = this.state.matkul.filter((result) => {
        return result.class === e.target.value;
      });

      this.setState({
        matkulFakultas: newMatkul,
      });
    }
  };

  // handle tambah mata kuliah
  handleTambah = (e) => {
    e.preventDefault();
    this.props.loading(true);
    this.props.notify("info", "Menabah data, jangan menutup halaman!");

    return axiosReq
      .post(this.props.backendUrl + "/mata-kuliah", {
        prodi: this.state.prodi,
        class: this.state.class,
        name: this.state.name,
        code: this.state.code,
        room: this.state.room,
      })
      .then(() => {
        this.props.loading(false);
        this.props.notify("success", "Data mata kuliah ditambahkan!");

        // refresh mata kuliah table
        this.getMatkul();
      })
      .catch((err) => {
        this.props.loading(false);

        if (err.response.status === 401) {
          this.props.notify("error", "Harap login kembali!");
        } else {
          this.props.notify(
            "error",
            "Data gagal disimpan," + err.response.data.message
          );
        }
      });
  };

  // handle edit mata kuliah
  handleEdit = (e) => {
    e.preventDefault();
    let reqUrl = this.props.backendUrl + "/mata-kuliah/" + this.state.editId;

    this.props.loading(true);
    this.props.notify("info", "Memperbarui data, jangan menutup halaman!");

    return axiosReq
      .patch(reqUrl, {
        prodi: this.state.editProdi,
        class: this.state.editClass,
        name: this.state.editName,
        code: this.state.editCode,
        room: this.state.editRoom,
      })
      .then((res) => {
        this.props.loading(false);
        this.props.notify("success", "Data mata kuliah diperbarui!");

        // refresh mata kuliah table
        this.getMatkul();
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

  // menghapus mata kuliah
  deleteMatkul = (e) => {
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
        text: "Data mata kuliah ini akan dihapus secara permanen?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.props.loading(true);
          this.props.notify("info", "Menghapus data, jangan menutup halaman!");
          let reqUrl =
            this.props.backendUrl +
            "/mata-kuliah/" +
            e.target.getAttribute("data-id");

          return axiosReq
            .delete(reqUrl)
            .then((res) => {
              this.props.loading(false);
              this.props.notify("success", "Data mata kuliah dihapus!");

              // refresh mata kuliah table
              this.getMatkul();
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
      this.state.prodi === "" ||
      this.state.class === "" ||
      this.state.name === "" ||
      this.state.code === "" ||
      this.state.room === ""
    ) {
      this.setState({ disabledAdd: "btn btn-danger disabled" });
    } else this.setState({ disabledAdd: "btn btn-danger" });
  };

  // validasi edit data
  valEdit = () => {
    if (
      this.state.editName === "" ||
      this.state.editCode === "" ||
      this.state.editRoom === ""
    ) {
      this.setState({ disabledEdit: "btn btn-danger disabled" });
    } else this.setState({ disabledEdit: "btn btn-danger" });
  };

  // handle expand table
  expand = (get) => {
    return (
      <table className="table my-2">
        <tbody>
          <tr>
            <th>Fakultas:</th>
            <td>{get.data.prodi}</td>
          </tr>
          <tr>
            <th>Prodi:</th>
            <td>{get.data.class}</td>
          </tr>
          <tr>
            <th>Ruangan:</th>
            <td>{get.data.room}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  render() {
    const columns = [
      {
        name: "Mata Kuliah",
        selector: (row) => row.name,
      },
      {
        name: "Kode",
        selector: (row) => row.code,
      },
      {
        name: "Aksi",
        button: true,
        width: "125px",
        cell: (row) => (
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
                  editId: row.id,
                  editProdi: row.prodi,
                  editClass: row.class,
                  editName: row.name,
                  editRoom: row.room,
                  editCode: row.code,
                });
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              type="button"
              data-id={row.id}
              onClick={this.deleteMatkul}
            >
              Hapus
            </button>
          </div>
        ),
      },
    ];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-4">
            <p>Daftar mata kuliah yang tersedia:</p>
          </div>
          <div className="col-lg-5 mb-3 text-end">
            <button
              className="btn btn-outline-danger"
              type="button"
              hidden={
                this.props.isLoading === true ||
                this.state.matkul === "" ||
                false
              }
              onClick={this.getMatkul}
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
              Tambah Mata Kuliah
            </button>
          </div>
          <div className="col-lg-3 mb-3">
            <select
              name="filter-fakultas"
              className="form-select form-select-sm"
              onChange={this.filterFakultas}
            >
              <option value="">Semua Prodi</option>
              <option value="S1 Informatika">S1 Informatika</option>
              <option value="S1 Ilmu Komputer">S1 Ilmu Komputer</option>
              <option value="S1 Rekayasa Perangkat Lunak">
                S1 Rekayasa Perangkat Lunak
              </option>
            </select>
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={this.state.matkulFakultas}
            expandableRows
            expandableRowsComponent={this.expand}
            pagination
            noDataComponent="Belum ada mata kuliah yang ditambahkan."
          />
        </div>

        <div id="parent">
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
                    data-coreui-toggle="modal"
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
                          name="prodi"
                          className="form-select form-select-sm"
                          onChange={this.handleChange}
                          required
                        >
                          <option value="" readOnly>
                            Pilih
                          </option>
                          <option value="FMIPA">FMIPA</option>
                          <option value="FTTM">FTTM</option>
                          <option value="FISIP">FISIP</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="2">
                        Prodi
                      </label>
                      <div className="col-sm-8">
                        <select
                          name="class"
                          className="form-select form-select-sm"
                          onChange={this.handleChange}
                          required
                        >
                          <option value="" readOnly>
                            Pilih
                          </option>
                          <option value="S1 Informatika">S1 Informatika</option>
                          <option value="S1 Rekayasa Perangkat Lunak">
                            S1 Rekayasa Perangkat Lunak
                          </option>
                          <option value="S1 Ilmu Komputer">
                            S1 Ilmu Komputer
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="3">
                        Mata Kuliah
                      </label>
                      <div className="col-sm-8">
                        <input
                          name="name"
                          className="form-control"
                          id="3"
                          type="text"
                          placeholder="Nama/judul Mata Kuliah"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="4">
                        Kode
                      </label>
                      <div className="col-sm-8">
                        <input
                          name="code"
                          className="form-control"
                          id="4"
                          type="text"
                          placeholder="Kode mata kuliah"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="5">
                        Ruangan
                      </label>
                      <div className="col-sm-8">
                        <input
                          name="room"
                          className="form-control"
                          id="5"
                          type="text"
                          placeholder="Gedung/ruangan/tempat PBM"
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
                        Fakultas
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-control-plaintext"
                          id="1"
                          type="text"
                          readOnly
                          value={this.state.editProdi}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="2">
                        Prodi
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-control-plaintext"
                          id="1"
                          type="text"
                          readOnly
                          value={this.state.editClass}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="3">
                        Mata Kuliah
                      </label>
                      <div className="col-sm-8">
                        <input
                          name="editName"
                          className="form-control"
                          id="3"
                          type="text"
                          placeholder="Nama/judul Mata Kuliah"
                          value={this.state.editName}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="4">
                        Kode
                      </label>
                      <div className="col-sm-8">
                        <input
                          name="editCode"
                          className="form-control"
                          id="4"
                          type="text"
                          placeholder="Kode mata kuliah"
                          value={this.state.editCode}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label" htmlFor="5">
                        Ruangan
                      </label>
                      <div className="col-sm-8">
                        <input
                          name="editRoom"
                          className="form-control"
                          id="5"
                          type="text"
                          placeholder="Gedung/ruangan/tempat PBM"
                          value={this.state.editRoom}
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
      </React.Fragment>
    );
  }
}

export default withAuth(JadwalDosen);
