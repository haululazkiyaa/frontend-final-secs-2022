import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const axiosReq = axios.create({
  withCredentials: true,
});

class JadwalMahasiswa extends Component {
  state = {
    // mahasiswa schedule data
    mahasiswa: [],
    // mahasiswa schedule table data
    jadwal: {
      Senin: [],
      Selasa: [],
      Rabu: [],
      Kamis: [],
      Jumat: [],
      Sabtu: [],
      Minggu: [],
    },
    // mata kuliah data
    matkul: "",
    // mata kuliah data filtered
    matkulFakultas: "",
    userMatkul: "",
    // select mata kuliah detail
    mataKuliahDetail: {
      code: "",
      name: "",
      room: "",
      class: "",
      prodi: "",
    },
    // select mata kuliah form data
    mataKuliahId: "",
    start: "",
    end: "",
    semester: "",
    schedule: [],
    // pilih mata kuliah validation
    disabledPilih: "btn btn-danger disabled",
  };

  // handle first load
  componentDidMount() {
    this.getMahasiswa();
  }

  // handle data update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.start !== this.state.start) {
      this.valPilih();
    } else if (prevState.end !== this.state.end) {
      this.valPilih();
    } else if (prevState.semester !== this.state.semester) {
      this.valPilih();
    } else if (prevState.schedule.length !== this.state.schedule.length) {
      this.valPilih();
    } else if (prevState.mahasiswa.length !== this.state.mahasiswa.length) {
      this.getMahasiswa();
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

  // handle mahasiswa data
  getMahasiswa = () => {
    this.props.loading(true);

    return axiosReq
      .get(this.props.backendUrl + "/user-matakuliah")
      .then((res) => {
        this.props.loading(false);
        this.setState({
          mahasiswa: res.data.User_MataKuliah,
        });

        // refresh jadwal table
        this.setJadwal();
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

  // handle jadwal mahasiswa
  setJadwal = () => {
    const mahasiswa = this.state.mahasiswa;

    const newSchedule = {
      Senin: [],
      Selasa: [],
      Rabu: [],
      Kamis: [],
      Jumat: [],
      Sabtu: [],
      Minggu: [],
    };

    // function timeToSec(time) {
    //     const timeArray = time.split(".")
    //     return ((+timeArray[0]) * 3600) + ((+timeArray[1]) * 60)
    // }

    for (const matkul of mahasiswa) {
      for (const jadwal of matkul.schedule) {
        if (!newSchedule[jadwal]) {
          newSchedule[jadwal] = [];
        } else {
          newSchedule[jadwal] = [matkul, ...newSchedule[jadwal]];
        }
        // newSchedule[jadwal].sort((a, b) => timeToSec(a) - timeToSec(b))

        this.setState({
          jadwal: newSchedule,
        });
      }
    }
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
          this.props.notify("error", "Sesi berakhir, silahkan login kembali!");
        } else {
          this.props.notify(
            "error",
            "Terjadi kesalahan saat mengoneksi ke server!"
          );
        }
      });
  };

  // handle filter data by prodi
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

  // handle select mata kuliah
  handlePilih = (e) => {
    e.preventDefault();

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
        text: "Anda akan memilih mata kuliah ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.props.loading(true);
          this.props.notify(
            "info",
            "Menambahkan mata kuliah ke jadwal anda, jangan menutup halaman!"
          );

          return axiosReq
            .post(this.props.backendUrl + "/user-matakuliah", {
              "mataKuliahId": this.state.mataKuliahId,
              "start": this.state.start,
              "end": this.state.end,
              "semester": this.state.semester,
              "schedule": this.state.schedule,
            })
            .then(() => {
              this.props.loading(false);
              this.props.notify(
                "success",
                "Data telah ditambahkan ke jadwal anda!"
              );

              this.getMatkul();
              this.getMahasiswa();
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
                  "Data gagal ditambahkan, " + err.response.data.message
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

  // validasi pilih matkul
  valPilih = () => {
    if (
      this.state.start === "" ||
      this.state.end === "" ||
      this.state.semester === "" ||
      this.state.schedule.length === 0
    ) {
      this.setState({ disabledPilih: "btn btn-danger disabled" });
    } else this.setState({ disabledPilih: "btn btn-danger" });
  };

  // handle day
  handleDay = (e) => {
    let newSchedule = [...this.state.schedule, e.target.id];
    if (this.state.schedule.includes(e.target.id)) {
      newSchedule = newSchedule.filter((day) => day !== e.target.id);
    }
    this.setState({
      schedule: newSchedule,
    });
  };

  // handle expand table
  expand = (get) => {
    return (
      <table>
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
        width: "75px",
        cell: (row) => (
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Small button group"
          >
            <button
              className="btn btn-danger"
              type="button"
              data-coreui-toggle="modal"
              data-coreui-target="#exampleModalCenteredScrollable2"
              onClick={() => {
                this.setState({ mataKuliahDetail: row, mataKuliahId: row.id });
              }}
            >
              <svg className="icon me-2">
                <use href="vendors/@coreui/icons/svg/free.svg#cil-plus"></use>
              </svg>
              Pilih
            </button>
          </div>
        ),
      },
    ];

    return (
      <React.Fragment>
        <div className="row">
        <div className="col-lg-7">
          <p>Jadwal perkuliahan anda:</p>
        </div>
        <div className="col-lg-5 text-end">
          <button
            className="btn btn-outline-danger me-2"
            type="button"
            hidden={this.props.isLoading === true}
            onClick={this.getMahasiswa}
          >
            <svg className="icon me-2">
              <use href="vendors/@coreui/icons/svg/free.svg#cil-sync"></use>
            </svg>
            Refresh
          </button>
          <button
            className="btn btn-outline-danger me-2"
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
            className="btn btn-danger"
            type="button"
            data-coreui-toggle="modal"
            data-coreui-target="#exampleModalCenteredScrollable"
            onClick={this.getMatkul}
          >
            <svg className="icon me-2">
              <use href="vendors/@coreui/icons/svg/free.svg#cil-plus"></use>
            </svg>
            Pilih Mata Kuliah
          </button>
        </div>
        </div>
        <div className="overflow-auto mt-2">
          <table className="w-100" hidden={this.state.mahasiswa.length === 0}>
            <tbody>
              {Object.keys(this.state.jadwal).map((key) => (
                <tr key={key}>
                  <div className="jadwalcard">
                    <th
                      className="text-center p-2"
                      style={{ width: "100px" }}
                      scope="row"
                    >
                      {key}
                    </th>
                    {this.state.jadwal[key].length > 0 &&
                      this.state.jadwal[key].map((data, index) => (
                        <td key={index} className="p-1">
                          <div className="jadwal text-white bg-danger">
                            {/* {data[index].MataKuliah.code} */}
                            {/* {<div>{index}</div>} */}
                            {/* {<div>{key}</div>} */}
                            <span className="badge bg-white text-danger">
                              {data.MataKuliah.code}
                            </span>
                            <br />
                            <strong>{data.MataKuliah.name}</strong>
                            <br />
                            <svg className="icon me-1">
                              <use href="vendors/@coreui/icons/svg/free.svg#cil-clock"></use>
                            </svg>
                            {data.start}-{data.end}
                            {/* {"Lorem Ipsum"} */}
                          </div>
                        </td>
                      ))}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p hidden={this.state.mahasiswa.length !== 0}>Tidak ada data</p>
        <div
          className="modal fade"
          id="exampleModalCenteredScrollable"
          tabIndex="-1"
          aria-labelledby="exampleModalCenteredScrollableTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalCenteredScrollableTitle"
                >
                  Pilih Mata Kuliah
                </h5>
                <button
                  className="btn-close"
                  type="button"
                  data-coreui-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col">
                    <p>Daftar mata kuliah yang tersedia:</p>
                  </div>
                  <div className="col">
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
                <div>
                  <DataTable
                    columns={columns}
                    data={this.state.matkulFakultas}
                    expandableRows
                    expandableRowsComponent={this.expand}
                    pagination
                  />
                </div>
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
                  Pilih Mata Kuliah
                </h5>
                <button
                  className="btn-close"
                  type="button"
                  data-coreui-toggle="modal"
                  data-coreui-target="#exampleModalCenteredScrollable"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handlePilih}>
                  <div className="mb-3 mx-1 row">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="table-danger text-center" colSpan="2">
                            <strong>Detail Mata Kuliah</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <strong>Mata Kuliah: </strong>
                            {this.state.mataKuliahDetail.name}
                          </td>
                          <td style={{ width: "50%" }}>
                            <strong>Kode: </strong>
                            {this.state.mataKuliahDetail.code}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Fakultas: </strong>
                            {this.state.mataKuliahDetail.prodi}
                          </td>
                          <td>
                            <strong>Prodi: </strong>
                            {this.state.mataKuliahDetail.class}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Ruangan: </strong>
                            {this.state.mataKuliahDetail.room}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
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
                    <label className="col-sm-4 col-form-label" htmlFor="4">
                      Jam Mulai
                    </label>
                    <div className="col-sm-8">
                      <input
                        name="start"
                        className="form-control"
                        id="4"
                        type="text"
                        placeholder="Jam mulai kuliah (Cth: 09.00)"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label" htmlFor="5">
                      Jam Selesai
                    </label>
                    <div className="col-sm-8">
                      <input
                        name="end"
                        className="form-control"
                        id="5"
                        type="text"
                        placeholder="Jam selesai kuliah (Cth: 09.00)"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      Hari Kuliah
                    </label>
                    <div className="col-sm-8">
                      <div className="row row-cols-2 row-cols-sm-4">
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Senin"
                            value="Senin"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger mb-3"
                            htmlFor="Senin"
                          >
                            Senin
                          </label>
                        </div>
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Selasa"
                            value="Selasa"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger mb-3"
                            htmlFor="Selasa"
                          >
                            Selasa
                          </label>
                        </div>
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Rabu"
                            value="Rabu"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger mb-3"
                            htmlFor="Rabu"
                          >
                            Rabu
                          </label>
                        </div>
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Kamis"
                            value="Kamis"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger mb-3"
                            htmlFor="Kamis"
                          >
                            Kamis
                          </label>
                        </div>
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Jumat"
                            value="Jumat"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger mb-3"
                            htmlFor="Jumat"
                          >
                            Jumat
                          </label>
                        </div>
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Sabtu"
                            value="Sabtu"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger mb-3"
                            htmlFor="Sabtu"
                          >
                            Sabtu
                          </label>
                        </div>
                        <div className="col">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="Minggu"
                            value="Minggu"
                            onChange={this.handleDay}
                          />
                          <label
                            className="btn btn-outline-danger"
                            htmlFor="Minggu"
                          >
                            Minggu
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input type="submit" id="pilih" hidden />
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
                  className={this.state.disabledPilih}
                  htmlFor="pilih"
                  data-coreui-dismiss="modal"
                >
                  <svg className="icon me-2">
                    <use href="vendors/@coreui/icons/svg/free.svg#cil-save"></use>
                  </svg>
                  Simpan
                </label>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(JadwalMahasiswa);
