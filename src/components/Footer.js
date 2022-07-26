import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";

class Footer extends Component {
    render() {
        return(
            <React.Fragment>
                <footer className="footer">
                    <div>SECS 2022 | Dibuat dengan❤️ oleh <a href="https://coreui.io/docs/">Tim II</a></div>
                    <div className="ms-auto">Ditenagai <a href="https://coreui.io">CoreUI</a> © 2022 creativeLabs.</div>
                </footer>
            </React.Fragment>
        )
    }
}

export default withAuth(Footer)