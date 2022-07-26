import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from 'sweetalert2'

class Dashboard extends Component {
  state = {
    title: 'Dashboard'
  }

  componentDidMount(){
    document.title = this.state.title;
    this.props.sessionCheck();
  }

  alert = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

    render() {
        return(
            <React.Fragment>
                <Sidebar data={this.state} />
                    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <Header data={this.state} />
                    <div className="body flex-grow-1 px-3">
                      <div className="container-lg">
                      <div className="alert alert-warning" role="alert">
                        Anda belum melengkapi profil, silahkan lengkapi profil terlebih dahulu!
                      </div>
                        <div className="card dashboard-card mb-4">
                          <div className="card-body card-backdrop text-white p-5">
                            <div className="row">
                              <div className="col">
                                <span>Selamat datang,</span>
                                <h2>{this.props.user.name}</h2>
                                <p><span class="badge bg-white me-2 text-black">ID Number</span>{this.props.user.username}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="card mb-4">
                              <div className="card-header">Perkuliahan</div>
                              <div className="card-body">
                                <button className="btn btn-warning" onClick={this.alert} disabled={this.props.isLoading === true}>
                                  <span class="spinner-border spinner-border-sm me-2" role="status" hidden={this.props.isLoading === false}></span>
                                  Alert
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="card mb-4">
                              <div className="card-header">Pengumuman</div>
                              <div className="card-body">
                                <p>Tes</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Footer />
                  </div>
            </React.Fragment>
        )
    }
}

export default withAuth(Dashboard)