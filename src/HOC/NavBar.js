import React, { Component } from "react";
import Aux from "./Aux";
import cssNavBar from "./cssNavBar.module.css";

class NavBar extends Component {
    state = {
        isFadeOut: false
    }

    selectLink = props => {
        this.setState({
            isFadeOut: true
        });
        setTimeout(() => {
            window.location.replace(props);
            this.setState({
                isFadeOut: false
            });
        }, 2000);
    }

    render () {
        const isHomeBold = window.location.pathname === "/";
        return (
            <div>
                <div className={ cssNavBar.container}>
                    <div className ={ cssNavBar.headerContainerText}>
                        <span className = { isHomeBold ? cssNavBar.boldText : null} onClick ={() => this.selectLink("/") } >Latest </span>
                        <span className = { !isHomeBold ? cssNavBar.boldText : null} onClick ={() => this.selectLink("/search") } >Search </span>
                    </div>
                </div>
                <hr/>
                <div className={this.state.isFadeOut ? cssNavBar.isFadeOut : cssNavBar.isFadeIn}>
                    <Aux >
                        { this.props.children }
                    </Aux>
                </div>
            </div>
        );
    }
};

export default NavBar;
