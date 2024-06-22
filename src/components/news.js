import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class news extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 15,
        category: 'default'
    }

    static propTypes = {

        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    ConvertToUppercase = (String) => {
        return String.charAt(0).toUpperCase() + String.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.ConvertToUppercase(this.props.category)}-NewsHub`
    }

    async allfunction() {
        this.props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
        this.setState({ loading: true })
        let data = await fetch(url);

        let parsedata = await data.json()
        // console.log(parsedata)


        this.setState({

            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
        this.props.setprogress(100);
    }


    async componentDidMount() {
        this.allfunction();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })

        let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
        // this.setState({loading : true})
        let data = await fetch(url);

        let parsedata = await data.json()
        // console.log(parsedata)


        this.setState({

            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults
            // loading : false
        })
    }


    // next and previous function

    // funonNext = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.allfunction();
    // }



    // funonPrev = async () => {


    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.allfunction();
    // }

    render() {


        return (


            <>
                <h1> <div className="text-center mb-3">NewsHub - Top Headlines on {this.ConvertToUppercase(this.props.category)}</div></h1>
                {this.state.loading && <Loading />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((elements) => {

                                return <div className="col-md-4 mb-2" key={elements.url} >
                                    <NewsItem title={elements.title} description={elements.description} imgsrc={elements.urlToImage} imgherf={elements.url} date={elements.publishedAt} />

                                </div>


                            })}

                        </div>
                    </div>
                </InfiniteScroll>


                {/* next and previous button */}
                {/* <div className=" d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.funonPrev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.floor(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.funonNext}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default news
