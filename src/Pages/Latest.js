import React, { Component } from "react";
import axios from "axios";
import cssLatest from "./cssPages.module.css";
import Modal from "./Modal/Modal";

class Latest extends Component {
    state = {
        isModalOpen: false,
        img: null,
        title: null,
        alt: null,
        date: null
    };

    componentDidMount () {
        this.getLatestIssue();
    }

    getLatestIssue = () => {
        const url = `https://xkcd.now.sh/?comic=latest`;
        axios.get(url)
            .then(res => {
                const { img, title, alt, month, year } = res.data;
                const fullMonth = month === "1" ? "January" : month === "2" ? "February" : month === "3" ? "March" : month === "4" ? "April" : month === "5" ? "May" : month === "6" ? "June" : month === "7" ? "July" : month === "8" ? "August" : month === "9" ? "September" : month === "10" ? "October" : month === "11" ? "November" : month === "12" ? "December" : null;
                this.setState({
                    img,
                    title: alt,
                    alt: title,
                    date: `${fullMonth}, ${year}`
                });
            })
            .catch(() => {
                this.setState({
                    img: "/public/noImage.jpg"
                });
            });
    }

    modalOpenHandler = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen
        }));
    }

    render () {
        return (
            <div>
                <Modal
                    date = { this.state.date }
                    title = { this.state.title }
                    alt = { this.state.alt }
                    isDisplayed = { this.state.isModalOpen}
                    closed = {this.modalOpenHandler }
                />
                <div>
                    <div className={ cssLatest.comicLatestContainer }>
                        <img
                            className={ cssLatest.latestImage }
                            src={this.state.img}
                            alt={this.state.alt}
                            title={this.state.title}
                        />
                    </div>
                    { this.state.img !== "/noImage.jpg"
                        ? <div className= { cssLatest.moreOptions }>
                            <div className={cssLatest.moreInfo} onClick={!this.state.isModalOpen ? () => this.modalOpenHandler() : null }>More Info</div>
                        </div>
                        : null
                    }
                </div>

            </div>
        );
    }
}
export default Latest;
