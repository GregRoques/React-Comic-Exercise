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

    componentDidMount() {
        this.getLatestIssue();
    }

    getLatestIssue = () => {
        const url = `https://xkcd.now.sh/?comic=latest`;
        axios.get(url)
        .then(res =>{
            const { img, title, alt, date} = res.data;
            this.setState({
                img,
                title: alt,
                alt: title,
                date
            })
        })
        .catch(() => {
            this.setState({
                img: "/public/noImage.jpg"
            })
        })
    }

    modalOpenHandler = props => {
        this.setState({
            isModalOpen: props
        })
    }

    render() {
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
                    <div className={ cssLatest.comicContainer}>
                        <img
                            className={ cssLatest.latestImage }
                            src={this.state.img}
                            alt={this.state.alt}
                            title={this.state.title}
                        />
                    </div> 
                        { this.state.img !== "/public/noImage.jpg"
                            ? <div className= { cssLatest.moreOptions }> 
                                <div className={cssLatest.moreInfo} onClick={() => this.openModal(true) }>More Info</div> 
                            </div>
                            : null 
                        }
                </div>

            </div>
        )
    }
}
export default Latest