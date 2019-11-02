import React, { Component } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import cssSearch from "./cssPages.module.css";
import Modal from "./Modal/Modal";

class Search extends Component {
    state = { 
        isModalOpen: false,
        currentPage: "",
        img: null,
        title: null,
        alt: null,
        date: null
    };

    ImageFooter = () => {
        return(
            <div className= { cssSearch.moreOptions }>
                <div className={cssSearch.add} onClick={() => this.subtractPageCounter()}> <span className={cssSearch.one}>&lt; </span> <span className={cssSearch.two}>&lt; </span ><span className={cssSearch.three}>&lt;</span></div>
                <div className={cssSearch.moreInfo} onClick={!this.state.isVisible ? () => this.modalOpenHandler(): null }>More Info</div>
                <div className={cssSearch.subtract} onClick={() => this.addPageCounter()} > <span className={cssSearch.one}>&gt; </span> <span className={cssSearch.two}>&gt; </span ><span className={cssSearch.three}>&gt;</span></div>
            </div>
        )
    }

    newPageHandler = e =>{
        this.setState({
            currentPage: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault();

        const number = this.state.currentPage

        if(number < 1 || number > 2199 || isNaN(number) === true){
            Swal.fire({
                title: "Nah ah ah",
                text: "Input must be between a number 1 and 2199.",
                imageUrl: "https://media1.giphy.com/media/FmyCxAjnOP5Di/giphy.gif"
            })
        } else {
            this.setState({
                currentPage: number,
            })
            this.getLatestIssue();
        }
    }

    addPageCounter = () => {
        let {currentPage} = this.state
        let newPage;
        currentPage > 2199 ? newPage = 1 : newPage = currentPage ++
        this.setState({
            currentPage: newPage,
        })
        this.getLatestIssue()
    }

    subtractPageCounter = () => {
        let {currentPage} = this.state
        let newPage;
        currentPage < 1 ? newPage = 2199 : newPage = currentPage --
        this.setState({
            currentPage: newPage,
        })
        this.getLatestIssue()
    }

    getLatestIssue = () => {
        const currPage = this.state.currentPage;
        const url = `https://xkcd.now.sh/?comic=${currPage}`;

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

    modalOpenHandler = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen
        }));
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Modal
                    date = { this.state.date }
                    title = { this.state.title }
                    alt = { this.state.alt }
                    isDisplayed = { this.state.isModalOpen}
                    closed = {this.modalOpenHandler}
                /> 
                <form className="searchForm" onSubmit={e => this.submitHandler(e)}>
                    <input
                        id="search-term"
                        type="text"
                        maxlength="4"
                        placeholder="Enter a number between 1 - 2199."
                        className="searchInput"
                        onChange={e => this.newPageHandler(e)}
                        value={this.state.currentPage}
                    />
                    <button
                        type="submit"
                        className="searchSubmit"
                    > Search</button>
                </form>
                 { this.state.img ? 
                    <div>
                        <div className={ cssSearch.comicContainer}>
                            <img
                                className={ cssSearch.latestImage }
                                src={this.state.img}
                                alt={this.state.alt}
                                title={this.state.title}
                            />
                        </div> 
                        { this.state.img !== "/public/noImage.jpg" ?
                            <this.ImageFooter />
                        : null }
                    </div>
                : null
                 }
                <div>

                </div>

            </div>
        );
    }
}
export default Search;