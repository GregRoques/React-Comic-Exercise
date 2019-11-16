import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import cssSearch from "./cssPages.module.css";
import Modal from "./Modal/Modal";

class Search extends Component {
    state = {
        isModalOpen: false,
        currentPage: "",
        displayPage: "",
        img: null,
        title: null,
        alt: null,
        date: null
    };

    async componentDidMount () {
        if (window.location.pathname !== "/search") {
            const currentComic = (window.location.pathname).split("/search/").pop();
            if (!isNaN(currentComic) && currentComic > 0 && currentComic < 2200) {
                await this.setState({
                    displayPage: currentComic
                });
                this.getLatestIssue();
            } else {
                window.history.pushState(null, null, `/search`);
            }
        }
    }

    newPageHandler = e => {
        this.setState({
            currentPage: e.target.value
        });
    }

    submitHandler = async e => {
        e.preventDefault();

        await this.setState((prevState) => ({
            displayPage: parseInt(prevState.currentPage),
            currentPage: ""
        }));

        this.getLatestIssue();
    }

    addPageCounter = async () => {
        let newPage = this.state.displayPage + 1;
        if (newPage > 2199) {
            newPage = 1;
        }
        await this.setState({
            displayPage: newPage
        });
        this.getLatestIssue();
    }

    subtractPageCounter = async () => {
        let newPage = this.state.displayPage - 1;
        if (newPage < 1) {
            newPage = 2199;
        };
        await this.setState({
            displayPage: newPage
        });
        this.getLatestIssue();
    }

    getLatestIssue = () => {
        const { displayPage } = this.state;
        if (displayPage < 1 || displayPage > 2199 || isNaN(displayPage) === true) {
            Swal.fire({
                title: "Nah ah ah",
                text: "Input must be between a number 1 and 2199.",
                imageUrl: "https://media1.giphy.com/media/FmyCxAjnOP5Di/giphy.gif"
            });
        } else {
            const url = `https://xkcd.now.sh/?comic=${displayPage}`;
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
                    window.history.pushState(null, null, `/search/${displayPage}`);
                })
                .catch(() => {
                    this.setState({
                        img: "https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=547"
                    });
                });
        }
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
                    closed = {this.modalOpenHandler}
                />
                <form className={cssSearch.searchForm} onSubmit={e => this.submitHandler(e)}>
                    <input
                        id="search-term"
                        type="text"
                        maxLength="4"
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
                { this.state.img ? <div>
                    <div key={this.state.img} className={ cssSearch.comicSearchContainer }>
                        <img
                            className={ cssSearch.latestImage }
                            src={this.state.img}
                            alt={this.state.alt}
                            title={this.state.title}
                        />
                    </div>
                    { this.state.img !== "/public/noImage.jpg" ? <div className= { cssSearch.moreOptions }>
                        <div className={cssSearch.subtract} onClick={() => this.subtractPageCounter()}> <span className={cssSearch.subtractThree}>&lt;</span> <span className={cssSearch.subtractTwo}>&lt;</span ><span className={cssSearch.subtractOne}>&lt;</span></div>
                        <div className={cssSearch.moreInfo} onClick={!this.state.isModalOpen ? () => this.modalOpenHandler() : null }>More Info</div>
                        <div className={cssSearch.add} onClick={() => this.addPageCounter()} > <span className={cssSearch.addOne}>&gt; </span> <span className={cssSearch.addTwo}>&gt; </span ><span className={cssSearch.addThree}>&gt;</span></div>
                    </div>
                        : null }
                </div>
                    : null
                }
            </div>
        );
    }
}
export default Search;
