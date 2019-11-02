import React, { Component } from "react";
import axios from "axios";
import cssSearch from "./cssPages.module.css";
import Modal from "./Modal/Modal";

class Search extends Component {
    state = { 
        isModalOpen: false,
        currentPage: null,
        searchPlaceHolder: "Enter a number between 1 - 2199",
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

        const number = e.target.value

        if(number < 1 || number > 2199){
            this.setState({
                currentPage: "",
                searchPlaceHolder: "Number Invalid! Must be Between 1 - 2199. "
            })
        } else {
            this.setState({
                currentPage: number,
                searchPlaceHolder: "Enter a number between 1 - 2199."
            })
            this.getLatestIssue();
        }
    }

    addPageCounter = () => {

        currentPage > 2199 ? newPage = 1 : newPage = currentPage ++
        this.setState({
            currentPage: newPage,
        })
        this.getLatestIssue()
    }

    subtractPageCounter = () => {
        let currentPage = this.state.currentPage;
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
                        type="number"
                        placeholder={this.state.searchPlaceHolder}
                        className="searchInput"
                        onChange={e => this.newPageHandler(e)}
                        value={this.state.currentPage}
                    />
                    <button
                        type="submit"
                        className="searchSubmit"
                    > Search</button>
                </form>
                 { this.state.image ? 
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
                            <ImageFooter />
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