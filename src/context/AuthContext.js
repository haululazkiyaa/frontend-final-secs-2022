import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            sidebarHide: '',
            sidebarUnfoldable: ''
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
    
    render() {
        return(
            <AuthContext.Provider value={
                {
                    toggleSidebar: this.toggleSidebar,
                    toggleSidebarMobile: this.toggleSidebarMobile,
                    unfoldableSidebar: this.unfoldableSidebar,
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