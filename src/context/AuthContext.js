import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// config
const AuthContext = React.createContext();
const axiosReq = axios.create({
  withCredentials: true,
});

export class AuthContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      // config
      backendUrl: "https://secs2022-api.herokuapp.com",
      // status
      isLoading: false,
      isLoggedIn: localStorage.getItem("isLoggedIn") || false,
      // user logged in data
      userLoggedIn: "",
      // admin panel features
      sidebarHide: "",
      sidebarUnfoldable: "",
      subMenuShow: "",
      // response api
      responseMessage: "",
    };
  }

  // componentDidMount(){
  //     this.sessionCheck();
  // }

  // handle session
  sessionCheck = () => {
    this.loading(true);

    return axiosReq
      .get(this.state.backendUrl)
      .then((res) => {
        this.loading(false);

        this.setState({
            userLoggedIn: res.data,
        });
      })
      .catch((err) => {
        this.loading(false);

        if (err.response.status === 401) {
          this.setState({
            isLoggedIn: false,
          });

          this.notify("error", "Sesi anda telah berakhir!");
        } else {
          this.notify("error", "Terjadi kesalahan saat mengoneksi ke server!");
        }
      });
  };

  // handle register
  register = (credentials) => {
    this.loading(true);

    return axiosReq
      .post(this.state.backendUrl + "/auth/register", {
        username: credentials.username,
        password: credentials.password,
        name: credentials.name,
        Role: credentials.role,
      })
      .then(() => {
        this.notify("success", "Registrasi berhasil!");
        this.notify(
          "info",
          "Tunggu sebentar, anda akan dialihkan ke halaman login."
        );

        setTimeout(() => {
          window.location = "/login";
        }, 3000);
      })
      .catch((err) => {
        this.loading(false);

        if (err.response.status === 400) {
          this.notify("warning", err.response.data.message);
        } else {
          this.notify("error", "Terjadi kesalahan saat mengoneksi ke server!");
        }
      });
  };

  // handle login
  login = (credentials) => {
    this.loading(true);

    return axiosReq
      .post(this.state.backendUrl + "/auth/login", {
        username: credentials.username,
        password: credentials.password,
      })
      .then((res) => {
        if (res.data.Success) {
          this.notify("success", "Login berhasil!");

          localStorage.setItem("isLoggedIn", true);

          this.loading(false);
          this.setState({
            isLoggedIn: true,
          });
        } else {
          this.loading(false);
          this.setState({
            isLoggedIn: false,
          });

          this.notify("warning", "Login gagal, periksa kembali data anda!");
        }
      })
      .catch((err) => {
        this.loading(false);

        if (err.response.status === 401) {
          this.notify("warning", err.response.data.message);

          this.setState({
            responseMessage: err.response.data.message,
          });
        } else {
          this.notify("error", "Terjadi kesalahan saat mengoneksi ke server!");
        }
      });
  };

  // handle logout
  logout = () => {
    this.loading(true);

    return axiosReq
      .post(this.state.backendUrl + "/auth/logout")
      .then(() => {
        localStorage.clear();

        this.loading(false);
        this.setState({
          isLoggedIn: false,
        });

        this.notify("success", "Logout berhasil!");
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });

        this.notify("error", "Logout gagal, coba lagi!");
      });
  };

  // handle loading status
  loading = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  // handle response
  notify = (type, msg) => {
    if (type === "success") {
      toast.success(msg, {
        autoClose: 2000,
        theme: "colored",
      });
    } else if (type === "error") {
      toast.error(msg, {
        autoClose: 2000,
        theme: "colored",
      });
    } else if (type === "warning") {
      toast.warn(msg, {
        autoClose: 2000,
        theme: "colored",
      });
    } else if (type === "info") {
      toast.info(msg, {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      toast(msg, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // handle toggle sidebar
  toggleSidebar = () => {
    if (this.state.sidebarHide === " hide") {
      this.setState({
        sidebarHide: "",
      });
    } else {
      this.setState({
        sidebarHide: " hide",
      });
    }
  };

  // handle toggle sidebar (mobile version)
  toggleSidebarMobile = () => {
    if (this.state.sidebarUnfoldable === " sidebar-narrow-unfoldable show") {
      this.setState({
        sidebarUnfoldable: " sidebar-narrow-unfoldable",
      });
    } else {
      this.setState({
        sidebarUnfoldable: " sidebar-narrow-unfoldable show",
      });
    }
  };

  // handle unfoldable sidebar
  unfoldableSidebar = () => {
    if (this.state.sidebarUnfoldable === " sidebar-narrow-unfoldable") {
      this.setState({
        sidebarUnfoldable: "",
      });
    } else {
      this.setState({
        sidebarUnfoldable: " sidebar-narrow-unfoldable",
      });
    }
  };

  // handle submenu
  subMenu = (e) => {
    if (e.target.id === this.state.subMenuShow || e.target.id === "") {
      this.setState({
        subMenuShow: "",
      });
    } else {
      this.setState({
        subMenuShow: e.target.id,
      });
    }
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          // client features
          sessionCheck: this.sessionCheck,
          register: this.register,
          login: this.login,
          logout: this.logout,
          // status and response
          loading: this.loading,
          notify: this.notify,
          // admin panel features
          toggleSidebar: this.toggleSidebar,
          toggleSidebarMobile: this.toggleSidebarMobile,
          unfoldableSidebar: this.unfoldableSidebar,
          subMenu: this.subMenu,
          ...this.state,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// hoc
export const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(context) => <WrappedComponent {...this.props} {...context} />}
        </AuthContext.Consumer>
      );
    }
  };
};
