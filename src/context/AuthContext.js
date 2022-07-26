import axios from "axios";
import React, { Component } from "react";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AuthContext = React.createContext();
const axiosReq = axios.create({
    withCredentials: true
});

export class AuthContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            isLoggedIn: localStorage.getItem('isLoggedIn') || false,
            user: '',
            sidebarHide: '',
            sidebarUnfoldable: '',
            submenu: '',
            msg: ''
        }
    }

    // componentDidMount(){
    //     this.sessionCheck();
    // }

    // session handler
    sessionCheck = () => {
        this.setState({
            isLoading: true,
        })

        return axiosReq.get('https://secs2022-api.herokuapp.com/')
            .then(res => {
                this.setState({
                    isLoading: false,
                    user: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                
                if(err.response.status === 401) {
                    this.setState({
                        isLoggedIn: false
                    })
                    
                    this.notify('error', 'Sesi anda telah berakhir!');
                } else {
                    this.notify('error', 'Terjadi kesalahan!');
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
                this.notify('success', 'Registrasi berhasil!');

                window.location.href = "/login"
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })

                if(err.response.status === 400) {
                    this.notify('warning', err.response.data.message);
                } else {
                    this.notify('error', 'Gagal mengkoneksi ke server!');
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
                    this.notify('success', 'Login berhasil!');

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

                    this.notify('warning', 'Login gagal');
                }
            })
            .catch(err => {
                this.setState({
                    isLoggedIn: false,
                    isLoading: false
                })

                if(err.response.status === 401) {
                    this.notify('warning', err.response.data.message);

                    this.setState({
                        msg: err.response.data.message
                    })
                } else {
                    this.notify('error', 'Gagal mengkoneksi ke server!');
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

                this.notify('success', 'Logout berhasil!');
            })
            .catch(() => {
                this.setState({
                    isLoading: false
                })

                this.notify('error', 'Logout gagal!');
            })
    }

    // toast notify
    notify = (type, msg) => {
        if(type === "success") {
            toast.success(msg, {
                autoClose: 2000,
                theme: "colored"
            });
        } else if(type === "error") {
            toast.error(msg, {
                autoClose: 2000,
                theme: "colored"
            });
        } else if(type === "warning") {
            toast.warn(msg, {
                autoClose: 2000,
                theme: "colored"
            });
        } else if(type === "info") {
            toast.info(msg, {
                autoClose: 2000,
                theme: "colored"
            });
        } else {
            toast(msg, {
                autoClose: 2000,
                theme: "colored"
            });
        }
        
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
                    notify: this.notify,
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