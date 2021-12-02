import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import noImage from "../images/noImage.png";

const MovieView = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=518e3d61693e1fd3cfd08fee128ab8ff&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [id]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading..." />;
    }
    if (movieDetails) {
      const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
      const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`

      let genre = "";
      let production_companies = "";
      if (movieDetails.genres) {
        genre = movieDetails.genres.map((obj, i) => {
          return <li key={i}>{obj.name}</li>;
        });
      }
      if (movieDetails.production_companies) {
        production_companies = movieDetails.production_companies.map(
          (obj, i) => {
            return <li key={i}>{obj.name}</li>;
          }
        );
      }

      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={posterPath}
                  onError={(e) => {
                    e.target.src = noImage;
                    e.target.onError = null;
                  }
                  }
                  alt="..."
                  className="img-fluid shadow rounded"
                />
              </div>
              <div className="col-md-9">
              <code>
                  Status: {movieDetails.status}
                  <br />
                  Release: {movieDetails.release_date}
                  <br />
                  Original_language: {movieDetails.original_language}
                  <br />
                  <hr />
                  Genres: {genre}
                  <br />
                  Production_companies: {production_companies}
                  <br />
                </code>
                <p className="lead">{movieDetails.overview}</p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return renderMovieDetails();
};

export default MovieView;