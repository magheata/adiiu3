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
    public String PlaceOfBirth;
    public String CountryOfBirth;
    public float Popularity;
    public String ImageUrl;
    public float DateOfBirth;
    public float DateOfDecease;

    public String getCountryOfBirth() {
        return CountryOfBirth;
    }

    public void setCountryOfBirth(String CountryOfBirth) {
        this.CountryOfBirth = CountryOfBirth;
    }

    public float getDateOfBirth() {
        return DateOfBirth;
    }

    public void setDateOfBirth(float DateOfBirth) {
        this.DateOfBirth = DateOfBirth;
    }

    public float getDateOfDecease() {
        return DateOfDecease;
    }

    public void setDateOfDecease(float DateOfDecease) {
        this.DateOfDecease = DateOfDecease;
    }

    public String getImageUrl() {
        return ImageUrl;
    }

    public void setImageUrl(String ImageUrl) {
        this.ImageUrl = ImageUrl;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
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
        String actor = "{\"actor\":{ ";
        actor = actor + "\"name\":" + "\"" + this.Name + "\";";
        actor = actor + "\"placeOfBirth\": \"" + this.PlaceOfBirth + "\";";
        actor = actor + "\"countryOfBirth\": \"" + this.CountryOfBirth + "\";";
        actor = actor + "\"dateOfBirth\": \"" + this.DateOfBirth + "\";";
        actor = actor + "\"dateOfDecease\": \"" + this.DateOfDecease + "\";";
        actor = actor + "\"popularity\": \"" + this.Popularity + "\";";
        actor = actor + "\"imageUrl\": \"" + this.ImageUrl + "\"";
        actor = actor + "}}";
        return actor;
    }
}
