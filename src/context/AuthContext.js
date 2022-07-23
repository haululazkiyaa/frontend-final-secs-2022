import axios from "axios";
import React, { Component } from "react";
import Swal from 'sweetalert2'

const AuthContext = React.createContext();
const axiosReq = axios.create({
    withCredentials: true
});

export class AuthContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: localStorage.getItem('isLoggedIn') || false,
            user: '',
            isLoading: false,
            sidebarHide: '',
            sidebarUnfoldable: '',
            submenu: ''
        }
    }

    // componentDidMount(){
    //     this.sessionCheck();
    // }

    // session handler
    sessionCheck = () => {
        return axiosReq.get('https://secs2022-api.herokuapp.com/')
            .then(res => {
                this.setState({
                    user: res.data
                })
            })
            .catch(err => {
                if(err.response.status === 401) {
                    this.setState({
                        isLoggedIn: false
                    })
                }
            })
    }

    // login handler
    register = (credentials) => {
        this.setState({
            isLoading: true
        })

        return axiosReq.post('https://secs2022-api.herokuapp.com/auth/register', {
            'username': credentials.username,
            'password': credentials.password,
            'name': credentials.name,
            'Role': credentials.role
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registrasi berhasil!',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = "/login"
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })

                if(err.response.status === 400) {
                    Swal.fire({
                        icon: 'warning',
                        title: err.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Galat saat menghubungi server!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // login handler
    login = (credentials) => {
        this.setState({
            isLoading: true
        })

        return axiosReq.post('https://secs2022-api.herokuapp.com/auth/login', credentials)
            .then(res => {
                if(res.data.Success) {
                    localStorage.setItem('isLoggedIn', true);

                    this.setState({
                        isLoading: false,
                        isLoggedIn: true,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        isLoggedIn: false
                    })

                    Swal.fire({
                        icon: 'error',
                        title: 'Periksa kembali detail login anda!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoggedIn: false,
                    isLoading: false
                })

                if(err.response.status === 401) {
                    Swal.fire({
                        icon: 'warning',
                        title: err.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Galat saat menghubungi server!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // logout handler
    logout = () => {
        this.setState({
            isLoading: true
        })

        return axiosReq.post('https://secs2022-api.herokuapp.com/auth/logout')
            .then(() => {
                localStorage.clear()

                this.setState({
                    isLoading: false,
                    isLoggedIn: false
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil keluar!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(() => {
                this.setState({
                    isLoading: false
                })

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal keluar!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    // toggle sidebar
    toggleSidebar = () => {
        if(this.state.sidebarHide === ' hide') {
            this.setState({
                sidebarHide: ''
            })
        } else {
            this.setState({
                sidebarHide: ' hide'
            })
        }
    }

    // toggle sidebar mobile
    toggleSidebarMobile = () => {
        if(this.state.sidebarUnfoldable === ' sidebar-narrow-unfoldable show') {
            this.setState({
                sidebarUnfoldable: ' sidebar-narrow-unfoldable'
            })
        } else {
            this.setState({
                sidebarUnfoldable: ' sidebar-narrow-unfoldable show'
            })
        }
    }

    // unfoldable sidebar
    unfoldableSidebar = () => {
        if(this.state.sidebarUnfoldable === ' sidebar-narrow-unfoldable') {
            this.setState({
                sidebarUnfoldable: ''
            })
        } else {
            this.setState({
                sidebarUnfoldable: ' sidebar-narrow-unfoldable'
            })
        }
    }

    // handle submenu
    handleSubmenu = (e) => {
    if(e.target.id === this.state.submenu || e.target.id === '') {
        this.setState({
        submenu: ''
        })
    } else {
        this.setState({
        submenu: e.target.id
        })
    }
    }
    
    render() {  
        return(
            <AuthContext.Provider value={
                {
                    toggleSidebar: this.toggleSidebar,
                    toggleSidebarMobile: this.toggleSidebarMobile,
                    unfoldableSidebar: this.unfoldableSidebar,
                    handleSubmenu: this.handleSubmenu,
                    sessionCheck: this.sessionCheck,
                    register: this.register,
                    login: this.login,
                    logout: this.logout,
                    ...this.state
                }
            }>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

// hoc
export const withAuth = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {(context) => (
                        <WrappedComponent {...this.props} {...context} />
                    )}
                </AuthContext.Consumer>
            )
        }
    }
}