/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datamodels;

import java.util.Date;
import java.util.List;

/**
 *
 * @author andreea
 */
public class Movie {

    public String Name;
    public String ReleaseDate;
    public List<Actor> Actors;
    public String CountryOfOrigin;

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getReleaseDate() {
        return ReleaseDate;
    }

    public void setReleaseDate(String ReleaseDate) {
        this.ReleaseDate = ReleaseDate;
    }

    public List<Actor> getActors() {
        return Actors;
    }

    public void setActors(List<Actor> Actors) {
        this.Actors = Actors;
    }

    public String getCountryOfOrigin() {
        return CountryOfOrigin;
    }

    public void setCountryOfOrigin(String CountryOfOrigin) {
        this.CountryOfOrigin = CountryOfOrigin;
    }

    @Override
    public String toString() {
        String movie = "{\"movie\":{ ";
        movie = movie + "\"movieName\":" + "\"" + this.Name + "\",";
        movie = movie + "\"dateOfRelease\":\"" + this.ReleaseDate + "\",";
        movie = movie + "\"country\":\"" + this.CountryOfOrigin + "\",";
        movie = movie + "\"actors\":[";
        for (int i = 0; i < this.Actors.size(); i++) {
            movie = movie + this.Actors.get(i).toString() + "$";
        }
        movie = movie.substring(0, movie.length() - 1);   // quito la última coma
        movie = movie + "] }}";
        return movie;
    }
}
