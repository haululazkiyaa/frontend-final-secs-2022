import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

class Registrasi extends Component {
  state = {
    title: 'Registrasi',
    role: 'MAHASISWA'
  }

  componentDidMount(){
    document.title = this.state.title;
  }

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.register(this.state);
  }

    render() {
      if(this.props.isLoggedIn) {
          return <Navigate to='/dashboard' />
      }  

        return(
            <React.Fragment>
                <div className="gradient-animation min-vh-100 d-flex flex-row align-items-center">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="card shadow-none mb-4 mx-4">
                          <div className="card-body p-4">
                            <img src="https://i.ibb.co/t2xpHnw/undraw-Mobile-login-re-9ntv.png" alt="Registrasi" width="150" />
                            <h1>{this.state.title}</h1>
                            <p className="text-medium-emphasis">Silahkan melakukan registrasi akun terlebih dahulu untuk mengkases layanan Telkom University.</p>
                            <form onSubmit={this.handleSubmit}>
                              <div className="mb-3 row g-3 align-items-center">
                                <div className="col-auto">
                                  <label htmlFor="inputPassword6" className="col-form-label">Registrasi sebagai:</label>
                                </div>
                                <div className="col-auto">
                                  <select className="form-select" name="role" aria-label="Default select example" onChange={this.handleChange}>
                                    <option disabled>Pilih</option>
                                    <option value="MAHASISWA">Mahasiswa</option>
                                    <option value="DOSEN">Dosen</option>
                                  </select>
                                </div>
                              </div>
                              <div className="input-group mb-3"><span className="input-group-text">
                                  <svg className="icon">
                                    <use href="vendors/@coreui/icons/svg/free.svg#cil-address-book"></use>
                                  </svg></span>
                                <input className="form-control" name="name" type="text" placeholder="Nama Lengkap"  onChange={this.handleChange} />
                              </div>
                              <div className="input-group mb-3"><span className="input-group-text">
                                  <svg className="icon">
                                    <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                  </svg></span>
                                <input className="form-control" name="username" type="text" placeholder="Username" onChange={this.handleChange} />
                              </div>
                              <div className="input-group mb-4"><span className="input-group-text">
                                  <svg className="icon">
                                    <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                  </svg></span>
                                <input className="form-control" name="password" type="password" placeholder="Kata Sandi" onChange={this.handleChange} />
                              </div>
                              <button to="login" className="btn btn-block btn-danger text-white" type="submit">Create Account</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withAuth(Registrasi)