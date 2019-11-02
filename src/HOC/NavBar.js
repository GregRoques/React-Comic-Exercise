import React, { Component } from "react";
import Aux from "./Aux";
import cssNavBar from "./cssNavBar.module.css";
import { css } from "emotion";

const boldText = css`
    font-weight: bold,
    color: rgb(250,173,73)
`;

const cssJoin = [cssNavBar.textSpace, boldText];

class NavBar extends Component {
    state = {
        isFadeOut: false
    }

    selectLink = props => {
        this.setState({
            isFadeOut: true
        });
        setTimeout(() => {
            this.setState({
                isFadeOut: false
            });
            window.location.replace(props);
        }, 1000);
    }

    render () {
        const isHomeBold = window.location.pathname === "/";

        return (
            <div>
                <div className={ cssNavBar.container}>
                    <div className ={ cssNavBar.headerContainerText}>
                        <span className = { isHomeBold ? cssJoin.join(" ") : cssNavBar.textSpace } onClick ={() => this.selectLink("/") } >Latest </span>
                        <span className = { !isHomeBold ? cssJoin.join(" ") : cssNavBar.textSpace } onClick ={() => this.selectLink("/search") } >Search </span>
                    </div>
                </div>
                <Aux className ={ this.state.isFadeOut ? cssNavBar.isFadeOut : null }>
                    { this.props.children }
                </Aux>
            </div>
        );
    }
};

export default NavBar;
