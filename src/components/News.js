import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const pagesize = 12;
    
    
    useEffect(() => {
        updateNews();// eslint-disable-next-line
    },[]);
    
    const updateNews= async ()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${pagesize}`;
        setLoading(true);
        let data = await fetch(url);
        //props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(page+1);
        props.setProgress(100);
    };

    const fetchMoreData = async() => {
        updateNews();
    };

    // after constructor is run render runs (constructor >> render >> componentDidMount)
    
    return (
        
        <>
            <h1 className="text-center mt-5">Top Headlines - {props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h1>
            {loading && <Spin/>}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spin/>}
                >
                    <div className="container">
                    <div className="row">
                    {
                        articles.map((element)=>
                            <div key={element.url} className="col-md-4 col-lg-4 col-sm-12 d-flex align-items-stretch">
                                <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt}/>
                            </div>       
                        )
                    }
                    </div>
                    </div>
                </InfiniteScroll>    
            
            
        </>
        
        
    )
}


News.propTypes = {
    name: PropTypes.string,
    category : PropTypes.string
}

News.defaultProps = {
    country:"in",
    category : "all"
}


export default News
