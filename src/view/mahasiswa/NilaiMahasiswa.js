import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";
import axios from "axios";
import DataTable from "react-data-table-component";

const axiosReq = axios.create({
  withCredentials: true,
});

class NilaiMahasiswa extends Component {
  state = {
    // user nilai data
    userNilai: [],
  };

  // handle first load
  componentDidMount() {
    this.filterData();
  }

  // handle nilai data and filter the data
  filterData = () => {
    this.props.loading(true);

    return axiosReq
      .get(this.props.backendUrl + "/penilaian")
      .then((res) => {
        let userNilai = res.data.filter((result) => {
          return result.id === this.props.userLoggedIn.id;
        });

        this.props.loading(false);
        this.setState({
          userNilai: userNilai[0].Penilaian,
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

  // handle expand table
  expand = (get) => {
    return (
      <table className="table text-center w-100 my-2">
        <tbody>
          <tr>
            <td>
              <strong>Kehadiran: </strong>
              {get.data.kehadiran}
            </td>
            <td>
              <strong>Jumlah SKS: </strong>
              {get.data.total_sks}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Nilai Tugas: </strong>
              {get.data.tugas}
            </td>
            <td>
              <strong>Nilai Ulangan: </strong>
              {get.data.uas}
            </td>
          </tr>
          <tr className="table-danger">
            <th colSpan="4">
              JUMLAH NILAI:&nbsp;
              {get.data.kehadiran +
                get.data.total_sks +
                get.data.tugas +
                get.data.uas}
            </th>
          </tr>
        </tbody>
      </table>
    );
  };

  render() {
    const columnsMahasiswa = [
      {
        name: "Semester",
        selector: (row) => "Semester " + row.semester,
      },
      {
        name: "Nilai Akhir",
        cell: (row) =>
          this.hitungPredikat(row.kehadiran, row.total_sks, row.tugas, row.uas),
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
          </div>
        </div>
        <DataTable
          columns={columnsMahasiswa}
          data={this.state.userNilai}
          expandableRows
          expandableRowsComponent={this.expand}
          pagination
        />
      </React.Fragment>
    );
  }
}

export default withAuth(NilaiMahasiswa);
