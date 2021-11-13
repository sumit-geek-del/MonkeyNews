import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
 
  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  const updateNews = async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();

    props.setProgress(70);

    setArticles(parsedData.articles)
    console.log(articles);
    settotalResults(parsedData.totalResults)
    setLoading(false);

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsMonkey | ${capitalizeFirstLetter(props.category)}`
    updateNews();

    // eslint-disable-next-line 
  },[]);

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0a7df79493664fd3a89672b25e6ea6b4&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)

    
    
  };
    return (
      <>
        <h1 className="text-center my-2">NewsMonkey- Top Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

        <div className="container">
        <div className="row my-2">

          {articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    src={element.source.name}
                  />
                </div>
              );
            })}
            </div>
        </div>
            </InfiniteScroll>
        </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
