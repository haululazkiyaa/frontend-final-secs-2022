import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const axiosReq = axios.create({
  withCredentials: true,
});

class Password extends Component {
  state = {
    // set page title
    title: "Ganti Kata Sandi",
    // change password form data
    password: "",
    confirmPassword: "",
    // change password validation
    disabledChange: "btn btn-block btn-danger text-white disabled",
  };

  // handle first load
  componentDidMount() {
    document.title = this.state.title;

    // check active session
    this.props.sessionCheck();
  }

  // handle data update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.password !== this.state.password) {
      this.valChange();
    } else if (prevState.confirmPassword !== this.state.confirmPassword) {
      this.valChange();
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

  // handle edit password
  handleEdit = (e) => {
    e.preventDefault();

    this.props.loading(true);
    this.props.notify("info", "Mengganti password, jangan menutup halaman!");

    return axiosReq
      .patch(this.props.backendUrl + "/change-password", {
        "password": this.state.password,
      })
      .then(() => {
        this.props.loading(false);
        this.props.notify("success", "Password berhasil diganti!");
        this.props.notify(
          "info",
          "Tunggu sebentar, anda akan dialihkan ke halaman dashboard."
        );

        setTimeout(() => {
          window.location = "/dashboard";
        }, 3000);
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

  // validasi tambah data
  valChange = () => {
    if (this.state.password !== "" && this.state.confirmPassword !== "") {
      if (this.state.password === this.state.confirmPassword) {
        this.setState({
          disabledChange: "btn btn-block btn-danger text-white",
        });
      } else {
        this.setState({
          disabledChange: "btn btn-block btn-danger text-white disabled",
        });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar data={this.state} />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <Header data={this.state} />
          <div className="body flex-grow-1 px-3 d-flex flex-row align-items-center">
            <div className="container-lg">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card mb-4 mx-4">
                    <div className="card-body p-4">
                      <img
                        src="https://masulyablog.sirv.com/secs2022/password.png"
                        alt="Ilustrasi mengganti password"
                        width="150"
                      />
                      <h1>{this.state.title}</h1>
                      <p className="text-medium-emphasis">
                        Silahkan masukan kata sandi baru untuk mengganti kata
                        sandi saat ini.
                      </p>
                      <form onSubmit={this.handleEdit}>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                            </svg>
                          </span>
                          <input
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Kata Sandi Baru"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="input-group mb-4">
                          <span className="input-group-text">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                            </svg>
                          </span>
                          <input
                            className="form-control"
                            name="confirmPassword"
                            type="password"
                            placeholder="Ulangi Kata Sandi"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <button
                          className={this.state.disabledChange}
                          type="submit"
                          disabled={this.props.isLoading === true}
                        >
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            hidden={this.props.isLoading === false}
                          ></span>
                          Ganti Kata Sandi
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(Password);
