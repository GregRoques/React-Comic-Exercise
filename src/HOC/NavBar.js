import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Aux from "./Aux";
import cssNavBar from "./cssNavBar.module.css";

class NavBar extends Component {
    state = {
        isFadeOut: false,
        isRedirected: false,
        redirectLink: ""
    }

    componentDidMount() {
        this.setState({
            redirectLink: window.location.href.includes("search") ? "/search" : "/"
        })
    }

    selectLink = props => {
        if (props !== window.location.pathname) {
            this.setState({
                isFadeOut: true,
            });
            setTimeout(() => {
                this.setState({
                    isRedirected: true,
                    redirectLink: props,
                    isFadeOut: false
                });
            }, 2000);
        }
    }

    push = () => {
        return <Redirect push to={this.state.redirectLink}/>
    }

    render () {
        return (
            <div>
                {this.state.isRedirected ? this.push() : null}
                <div className={ cssNavBar.container}>
                    <div className ={ cssNavBar.headerContainerText}>
                        <span className={cssNavBar.latest} id = { this.state.redirectLink === "/" ? cssNavBar.boldText : null} onClick ={() => this.selectLink("/") } >Latest </span>
                        <span className={cssNavBar.search} id = { this.state.redirectLink === "/search" ? cssNavBar.boldText : null} onClick ={() => this.selectLink("/search") } >Search </span>
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
