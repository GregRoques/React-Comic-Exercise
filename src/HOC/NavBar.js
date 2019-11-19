import React, { Component } from "react";
import Aux from "./Aux";
import cssNavBar from "./cssNavBar.module.css";

class NavBar extends Component {
    state = {
        isFadeOut: false
    }

    selectLink = props => {
        if (props !== window.location.pathname) {
            this.setState({
                isFadeOut: true
            });
            setTimeout(() => {
                window.location.replace(props);
            }, 2000);
        }
    }

    render () {
        const currWindow = window.location.pathname.includes("search") ? "/search" : "/";
        return (
            <div>
                <div className={ cssNavBar.container}>
                    <div className ={ cssNavBar.headerContainerText}>
                        <span className={cssNavBar.latest} id = { currWindow === "/" ? cssNavBar.boldText : null} onClick ={() => this.selectLink("/") } >Latest </span>
                        <span className={cssNavBar.search} id = { currWindow === "/search" ? cssNavBar.boldText : null} onClick ={() => this.selectLink("/search") } >Search </span>
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
