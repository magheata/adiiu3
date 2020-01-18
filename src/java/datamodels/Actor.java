/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package datamodels;

/**
 *
 * @author andreea
 */
public class Actor {
    public String Name;
    public String Gender;
    public String PlaceOfBirth;
    public float Popularity;

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String Gender) {
        this.Gender = Gender;
    }

    public String getPlaceOfBirth() {
        return PlaceOfBirth;
    }

    public void setPlaceOfBirth(String PlaceOfBirth) {
        this.PlaceOfBirth = PlaceOfBirth;
    }

    public float getPopularity() {
        return Popularity;
    }

    public void setPopularity(float Popularity) {
        this.Popularity = Popularity;
    }
    
    @Override
    public String toString() {
        String actor = "{'actor':[ ";
        actor = actor + "'name':" + "'" + this.Name + "',";
        actor = actor + "'gender':" + this.Gender + "',";
        actor = actor + "'placeOfBirth':" + this.PlaceOfBirth + "',";
        actor = actor + "'popularity':" + this.Popularity + "'";
        actor = actor + "]}";
        return actor;
    }
}
