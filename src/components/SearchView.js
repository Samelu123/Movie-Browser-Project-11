import Hero from "./Hero";
import { Link } from 'react-router-dom';
import noImage from "../images/noImage.png";
import noResults from "../images/noResults.png";


const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  const detailUrl = `/movies/${movie.id}`

return (
    <div className="col-lg-3 col-md-3 col-2 my-4">
      <div className="card">
        <img src={posterUrl} className="card-img" alt={movie.original_title} onError={(e) => {
            e.target.src = noImage;
            e.target.onError = null;
          }}
         />
        <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <Link to={detailUrl} className="btn btn-primary">Show details</Link>
        </div>
      </div>
    </div>
  );
};



const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching for ${keyword}`

  const resultsHtml = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />
  });

  if (resultsHtml.length === 0 && keyword.length >= 2) {
    const text = `No results for " ${keyword} "`;
    
    return (
      <>
        <Hero text ={text} />
        <img
          src={noResults} 
          className="card-img-res"
          onError=
            {(e) => {
                e.target.src = noImage;
                e.target.onError = null;
              }
            }
          alt="..." 
        />
      </>
    );
  } else {
    return (
      <>
        <Hero text={title} />
        {resultsHtml &&
          <div className="container">
            <div className="row">
              {resultsHtml}
            </div>
          </div>
        }
      </>
    );
  };
};

export default SearchView;