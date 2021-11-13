import React from 'react'

const NewsItem = (props)=> {

    
        let { title, description, imageUrl, newsUrl, author, date, src } = props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <span class="badge rounded-pill bg-success">{!src ? "News Monkey" : src}</span>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
