/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package perbd;

import datamodels.Actor;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author andreea
 */
public class ActorService {
    
    private DBActionsPeliculas dBActionsPeliculas;
    private MovieService movieService;
    private GeolocationService geolocationService;
    
    public ActorService(){
        this.dBActionsPeliculas = new DBActionsPeliculas();
        this.movieService = new MovieService();
        this.geolocationService = new GeolocationService();
    }
    
    public String GetActors(String par){
        
        List<String> actors = dBActionsPeliculas.getPelisPorActor(par);
      
        List<Actor> actorsWithInfo = new ArrayList<>();
        if (par.equals("pelis")){
           return actors.toString();
        } else if (par.equals("personas")){
            
            for (int i = 0; i < actors.size(); i++){
                Actor actor = new Actor();
                String [] actorInfoDB = actors.get(i).split(",");
                actor.setName(actorInfoDB[0]);
                actor.setDateOfBirth(Float.parseFloat(actorInfoDB[1]));
                actor.setDateOfDecease(Float.parseFloat(actorInfoDB[2]));
                actor = movieService.GetActorInformation(actor, par);
                String country = geolocationService.GetContinent(actor.getPlaceOfBirth());
                actor.setCountryOfBirth(country);
                actorsWithInfo.add(actor);
            }
            return actorsWithInfo.toString();
        } else {
            return "";
        }
    } 
}
