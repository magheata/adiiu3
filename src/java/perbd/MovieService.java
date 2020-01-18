/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package perbd;

import datamodels.Actor;
import datamodels.Movie;
import java.util.List;
import meusservlets.MovieDBRepository;

/**
 *
 * @author andreea
 */
public class MovieService {

    private MovieDBRepository movieDBRepository;

    public MovieService() {
        this.movieDBRepository = new MovieDBRepository();
    }

    public String GetMoviesInfo(String moviesString) {

        if (moviesString.length() == 0) {
            return null;
        }

        String[] moviesFromDB = moviesString.split(",");

        String movies = "{\"movies\":[";

        for (int i = 0; i < moviesFromDB.length - 1; i++) {
            Movie movie = new Movie();
            String currentMovie = moviesFromDB[i].trim();
            if (i == 0) {
                currentMovie = currentMovie.substring(1, currentMovie.length());
            } else if (i == moviesFromDB.length - 2) {
                currentMovie = currentMovie.substring(0, currentMovie.length() - 2);
            }
            String id = movieDBRepository.SearchMovieId(movie, currentMovie);
            if (!id.equals("")) {
                String movieS = movieDBRepository.Get("movie", id);
                movie.setName(currentMovie);
                movie = SetMovieParameters(movie, movieS);
                if (movie != null) {
                    movie.setActors(GetActorsForMovieInfo(movie.Name));
                    movies = movies + movie.toString() + ", ";
                }
            }
        }
        movies = movies + "]}";
        return movies;
    }

    private List<Actor> GetActorsForMovieInfo(String movieName) {

        DBActionsPersonaPeli dbPersonaPeli = new DBActionsPersonaPeli();
        List<Actor> actors = dbPersonaPeli.getActorsForMovie(movieName);

        for (int i = 0; i < actors.size(); i++) {
            actors.get(i).setName(actors.get(i).Name);
            String id = movieDBRepository.SearchActorId(actors.get(i));
            if (!id.equals("")) {
                String actorS = movieDBRepository.Get("person", id);
                SetActorParameters(actors.get(i), actorS);
            }
        }
        return actors;
    }

    private Movie SetMovieParameters(Movie movie, String movieResponse) {

        try {
            //Set Country of Origin
            int indexFirst = movieResponse.indexOf("iso_3166_1");
            int indexLast = movieResponse.indexOf("name");
            if ((indexFirst > -1) && (indexLast > -1)) {
                String country = movieResponse.substring(indexFirst + 13, indexFirst + 15);
                if (!country.equals("ul")) {
                    movie.setCountryOfOrigin(country);
                } else {
                    movie.setCountryOfOrigin("");
                }
            }

            //Set Country of Origin
            indexFirst = movieResponse.indexOf("release_date");
            indexLast = movieResponse.indexOf("revenue");
            if ((indexFirst > -1) && (indexLast > -1)) {
                movie.setReleaseDate(movieResponse.substring(indexFirst + 15, indexLast - 3));
            }
            return movie;
        } catch (Exception ex) {
            System.out.println(ex.toString() + "@movie");
        }
        return movie;
    }

    private Actor SetActorParameters(Actor actor, String actorResponse) {
        int indexFirstCountry;
        int indexLastCountry;
        int indexFirstPopularity;
        int indexFirstProfilePath;
        int indexFirstAdult;

        try {
            //Set Country of Origin
            indexFirstCountry = actorResponse.indexOf("place_of_birth");
            indexLastCountry = actorResponse.indexOf("profile_path");
            indexFirstPopularity = actorResponse.indexOf("popularity");
            indexFirstAdult = actorResponse.indexOf("adult");
            indexFirstProfilePath = actorResponse.indexOf("profile_path");

            if ((indexFirstCountry > -1) && (indexLastCountry > -1)) {
                String pob = actorResponse.substring(indexFirstCountry + 17, indexLastCountry - 3).split(",")[0];
                if (!pob.equals("ul")) {
                    actor.setPlaceOfBirth(pob);
                } else {
                    actor.setPlaceOfBirth("");
                }
            }

            if ((indexFirstPopularity > -1) && (indexFirstCountry > -1)) {
                float popularity = Float.parseFloat(actorResponse.substring(indexFirstPopularity + 12, indexFirstCountry - 2));
                actor.setPopularity(popularity);
            }

            if ((indexFirstAdult > -1) && (indexFirstProfilePath > -1)) {
                actor.setImageUrl(actorResponse.substring(indexFirstProfilePath + 16, indexFirstAdult - 3));
            }
        } catch (Exception ex) {
        }
        return actor;
    }
}
