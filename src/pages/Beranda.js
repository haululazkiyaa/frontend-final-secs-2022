import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

class Beranda extends Component {
  state = {
    title: "PAMa - Telkom University",
  };

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg bg-white">
              <a className="navbar-brand" href="/">
                <img
                  src="https://masulyablog.sirv.com/secs2022/PAMa.png"
                  alt="PAMa Logo"
                  height="42"
                  className="d-inline-block align-top"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-coreui-toggle="collapse"
                data-coreui-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item me-4">
                    <a className="nav-link" href="/">
                      Pengumuman
                    </a>
                  </li>
                  <li className="nav-item me-4">
                    <a className="nav-link" href="/">
                      Biaya Pendidikan
                    </a>
                  </li>
                  <li className="nav-item me-4 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="headerDropdownMenuLink"
                      role="button"
                      data-coreui-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Layanan
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="headerDropdownMenuLink"
                    >
                      <a className="dropdown-item" href="/">
                        Direktorat Pendidikan
                      </a>
                      <a className="dropdown-item" href="/">
                        Direktorat Keuangan
                      </a>
                      <a className="dropdown-item" href="/">
                        Direktorat Sistem Informasi
                      </a>
                    </div>
                  </li>
                  <li className="nav-item me-4">
                    <a className="nav-link" href="/">
                      Unduhan
                    </a>
                  </li>
                  <li className="nav-item font-weight-bold">
                    <Link
                      to="/login"
                      className="btn btn-danger text-white px-3"
                      href="/"
                    >
                      <svg className="icon me-2">
                        <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                      </svg>
                      <strong>Login</strong>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <div className="hero position-relative">
            <div className="position-absolute d-none d-xl-block control-1">
              <img
                src="https://i.ibb.co/S7sDXCv/Lihat-Jadwal-Kuliah-3.png"
                alt=" /"
                width="150"
              />
            </div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8 hero-text pb-5">
                  <div className="d-lg-none pt-5"></div>
                  <h1 className="mb-4 welcome-text">
                    Selamat Datang di Portal Akademik Mahasiswa Telkom
                    University
                  </h1>
                  <p className="mb-4">
                    Untuk mengakses laman{" "}
                    <strong>Portal Akademik Mahasiswa (PAMa)</strong>, silahkan{" "}
                    <strong>mendaftar akun baru</strong> atau{" "}
                    <strong>masuk menggunakan akun yang ada</strong> terlebih
                    dahulu.
                  </p>
                  <Link
                    to="/pendaftaran"
                    className="btn btn-danger text-white px-3 mb-5"
                  >
                    <strong>BUAT AKUN</strong>
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline-danger px-3 ms-3 mb-5"
                  >
                    <strong>LOGIN</strong>
                  </Link>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block pt-5">
                  <img
                    src="https://i.ibb.co/mFJ5FmZ/Lihat-Jadwal-Kuliah-1.png"
                    alt=" /"
                    width="350"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container text-center">
              <div className="row">
                <div className="card-group">
                  <div className="card">
                    <div className="card-body">
                      <div className="text-medium-emphasis text-center mb-4">
                        <svg className="icon icon-xxl">
                          <use href="vendors/@coreui/icons/svg/free.svg#cil-list-rich"></use>
                        </svg>
                      </div>
                      <div className="fs-4 fw-semibold">Jadwal</div>
                      <small className="text-medium-emphasis text-uppercase fw-semibold">
                        Lihat Informasi Jadwal Perkuliahan dan Ujian
                      </small>
                      <div className="progress progress-thin mt-3 mb-0">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "100%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="text-medium-emphasis text-center mb-4">
                        <svg className="icon icon-xxl">
                          <use href="vendors/@coreui/icons/svg/free.svg#cil-bar-chart"></use>
                        </svg>
                      </div>
                      <div className="fs-4 fw-semibold">Nilai</div>
                      <small className="text-medium-emphasis text-uppercase fw-semibold">
                        Lihat Daftar Kehadiran, Nilai Tugas, dan Nilai Ujian.
                      </small>
                      <div className="progress progress-thin mt-3 mb-0">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "100%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="text-medium-emphasis text-center mb-4">
                        <svg className="icon icon-xxl">
                          <use href="vendors/@coreui/icons/svg/free.svg#cil-credit-card"></use>
                        </svg>
                      </div>
                      <div className="fs-4 fw-semibold">Pembayaran</div>
                      <small className="text-medium-emphasis text-uppercase fw-semibold">
                        Dapatkan Informasi Akademik dan Biaya Pendidikan
                      </small>
                      <div className="progress progress-thin mt-3 mb-0">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "100%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card position-relative">
                    <span className="position-absolute bottom-0 start-50 translate-middle badge rounded-pill bg-danger">
                      BARU
                    </span>
                    <div className="card-body">
                      <div className="text-medium-emphasis text-center mb-4">
                        <svg className="icon icon-xxl">
                          <use href="vendors/@coreui/icons/svg/free.svg#cil-education"></use>
                        </svg>
                      </div>
                      <div className="fs-4 fw-semibold">LMS</div>
                      <small className="text-medium-emphasis text-uppercase fw-semibold">
                        Merdeka Belajar dengan Sistem Pembelajaran Daring
                      </small>
                      <div className="progress progress-thin mt-3 mb-0">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "100%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5" style={{ backgroundColor: "#f7f7f7" }}>
            <div className="container text-center py-5">
              <div className="row">
                <h2 className="card-title text-danger mb-4">Tentang PAMa</h2>
                <p>
                  <strong>Portal Akademik Mahasiswa (PAMa)</strong> merupakan{" "}
                  <strong>
                    aplikasi Sistem Informasi Akademik (SIAkad) berbasis website
                    yang terpadu
                  </strong>
                  . Mahasiswa dan Dosen dapat mengakses dashboard PAMa dengan
                  mudah menggunakan akun pribadi masing-masing. Khusus untuk
                  Mahasiswa,{" "}
                  <strong>
                    PAMa menyedikan berbagai informasi akademik seperti Jadwal
                    Kuliah, Nilai, Biaya Pendidikan, sekaligus Sistem
                    Pembelajaran Daring terpadu.
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="container py-5">
              <div className="row text-center">
                <h2 className="card-title text-danger mb-4">Berita Terbaru</h2>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                  <div className="card h-100">
                    <img
                      src="https://smb.telkomuniversity.ac.id/wp-content/uploads/2022/04/web-banner-beasiswa-secs-telkom-university-2022-1024x386.jpeg"
                      className="card-img-top"
                      height="200"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.{" "}
                        <a href="/" className="card-link">
                          Baca selengkapnya &gt;
                        </a>
                      </p>
                    </div>
                    <div className="card-footer">
                      <small className="text-medium-emphasis">
                        Last updated 3 mins ago
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img
                      src="https://smb.telkomuniversity.ac.id/wp-content/uploads/2022/04/web-banner-beasiswa-secs-telkom-university-2022-1024x386.jpeg"
                      className="card-img-top"
                      height="200"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This card has supporting text below as a natural lead-in
                        to additional content.{" "}
                        <a href="/" className="card-link">
                          Baca selengkapnya &gt;
                        </a>
                      </p>
                    </div>
                    <div className="card-footer">
                      <small className="text-medium-emphasis">
                        Last updated 3 mins ago
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img
                      src="https://smb.telkomuniversity.ac.id/wp-content/uploads/2022/04/web-banner-beasiswa-secs-telkom-university-2022-1024x386.jpeg"
                      className="card-img-top"
                      height="200"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This card has
                        even longer content than the first to show that equal
                        height action.{" "}
                        <a href="/" className="card-link">
                          Baca selengkapnya &gt;
                        </a>
                      </p>
                    </div>
                    <div className="card-footer">
                      <small className="text-medium-emphasis">
                        Last updated 3 mins ago
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col">
                SECS 2022 | Dibuat dengan❤️ oleh{" "}
                <a href="https://coreui.io/docs/">Tim II</a>
              </div>
              <div className="col text-end">
                Ditenagai <a href="https://coreui.io">CoreUI</a> © 2022
                creativeLabs.
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default withAuth(Beranda);
