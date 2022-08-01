import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Dashboard extends Component {
  state = {
    // set page title
    title: "Dashboard",
  };

  // handle first load
  componentDidMount() {
    document.title = this.state.title;

    // check active session
    this.props.sessionCheck();
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar data={this.state} />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <Header data={this.state} />
          <div className="body flex-grow-1 px-3">
            <div className="container-lg">
              <div className="card dashboard-card mb-4">
                <div className="card-body card-backdrop text-white p-5">
                  <div className="row">
                    <div className="col">
                      <span>Selamat datang,</span>
                      <h2>{this.props.userLoggedIn.name}</h2>
                      <p>
                        <span className="badge bg-white me-2 text-black">
                          {this.props.userLoggedIn.Role === "MAHASISWA" ? "NIM" : "NIP"}
                        </span>
                        {this.props.userLoggedIn.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row"
                hidden={
                  this.props.userLoggedIn.Role === "MAHASISWA" ? false : true
                }
              >
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-header">Layanan</div>
                    <div className="card-body">
                      <h5>Pelayanan Informasi Publik</h5>
                      <p>
                        Jika anda memiliki kebutuhan mengenai informasi,
                        silahkan menghubungi&nbsp;
                        <strong>Unit Layanan Terpadu Telkom University</strong>.
                        Email:&nbsp;
                        <a href="mailto:ult@telkomuniveristy.ac.id">
                          ult@telkomuniveristy.ac.id
                        </a>
                        &nbsp; / Telepon:
                        <a href="tel:+62222022023;10058">
                          022-2022023 ext. 10058
                        </a>
                        &nbsp; / Whatsapp:
                        <a href="https://wa.me/628112096229">08112096229</a>
                      </p>
                      <hr />
                      <h5>Pelayanan Tagihan &amp; Pembayaran</h5>
                      <p>
                        Jika anda memiliki permasalahan yang berhubungan dengan
                        tagihan dan pembayaran, silakan menghubungi&nbsp;
                        <strong>Direktorat Keuangan Telkom University.</strong>.
                        Email:&nbsp;
                        <a href="mailto:keuangan@telkomuniveristy.ac.id">
                          keuangan@telkomuniveristy.ac.id
                        </a>
                        &nbsp; / Whatsapp:
                        <a href="https://wa.me/628112096229">08112096229</a>
                        &nbsp; (Chat only)
                      </p>
                      <hr />
                      <h5>Pelayanan Administrasi Akademik</h5>
                      <p>
                        Jika anda memiliki permasalahan yang berhubungan dengan
                        Administrasi Akademik, silakan menghubungi&nbsp;
                        <strong>Direktorat Pendidikan Telkom University</strong>
                        . Email:&nbsp;
                        <a href="mailto:akademik@telkomuniveristy.ac.id">
                          akadmik@telkomuniveristy.ac.id
                        </a>
                        &nbsp; / Telepon:{" "}
                        <a href="tel:+62222022023">022-2022023</a>&nbsp; (Jam
                        &amp; Hari Kerja) / Whatsapp:
                        <a href="https://wa.me/628112096229">08112096229</a>
                        &nbsp; (Chat Only) (Jam &amp; Hari Kerja)
                      </p>
                      <hr />
                      <h5>Pelayanan Akun Telkom Univeristy</h5>
                      <p>
                        Perbaikan akun &amp; penggantian password dapat
                        dilakukan di&nbsp;
                        <strong>
                          Direktorat Sistem dan Teknologi Informasi Telkom
                          University
                        </strong>
                        . Email:&nbsp;
                        <a href="mailto:tik@telkomuniveristy.ac.id">
                          tik@telkomuniveristy.ac.id
                        </a>
                        &nbsp; (Internal) /
                        <a href="tel:+62222022023;1147">
                          022-2022023 ext. 1147
                        </a>
                        &nbsp; / Whatsapp:
                        <a href="https://wa.me/628112096229">08112096229</a>
                        &nbsp; (Chat Only) (Jam &amp; Hari Kerja)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-header">Pengumuman</div>
                    <div className="card-body">
                      <div className="alert alert-warning" role="alert">
                        Bagi Mahasiswa Baru Telkom University program Sarjana
                        (S1) tahun 2022/2023 segera mengisi IRS untuk Semester 1
                        mulai tanggal 1-7 Agustus 2022.
                      </div>
                      <div className="alert alert-warning" role="alert">
                        Bagi pemegang KIP-Kuliah segera melakukan aktivasi
                        kembali untuk melakukan pencarian semester berikutnya.
                      </div>
                      <div className="alert alert-info" role="alert">
                        Jadwal pra-perkuliahan Mahasiswa Baru program Sarjana
                        (S1) dapat di unduh
                        <Link to="/" className="alert-link">
                          disini
                        </Link>
                        .
                      </div>
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

export default withAuth(Dashboard);
