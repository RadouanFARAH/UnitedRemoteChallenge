import React, { Component } from 'react'
import Repo from './Repo' 
import axios from 'axios'
import uuid from 'react-uuid'

export default class Repos extends Component {
    state = {
        repos:[],
        pageNumber:1,
        scrolling:false
    }
    componentDidMount() {
        this.loadRepos();
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }
    handleScroll = (e) => {
        const {scrolling} = this.state;
        if (scrolling) return
        const lastLi = document.querySelector('ul.repos > li:last-child')
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 20
        if (pageOffset > lastLiOffset - bottomOffset) this.loadMore()
    } 

    loadRepos = async () => {
         const {repos, pageNumber} = this.state;
         const url =`https://api.github.com/search/repositories?q=created:>2020-01-01&sort=stars&order=desc&page=${pageNumber}`;
         const response = await axios.get(url);
         this.setState({repos:repos.concat(response.data.items), scrolling:false});
         
    }
    loadMore = () => {
        this.setState(prevState=>({
            pageNumber: prevState.pageNumber + 1,
            scrolling:true
        }), this.loadRepos)
    }

    render() {
        return (
            <ul className="repos" style={{listStyle:'none'}}>
            {this.state.repos.map(repo => <li  key={uuid()} ><Repo {...repo}/></li>)}
            </ul>
            
        )
    }
}
