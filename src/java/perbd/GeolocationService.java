/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package perbd;

import meusservlets.OpenCageRepository;

/**
 *
 * @author andreea
 */
public class GeolocationService {
 
    private OpenCageRepository openCageRepository;
    
    public GeolocationService(){
        this.openCageRepository = new OpenCageRepository();
    }
    
    public String GetContinent(String input){
        if (!input.equals("")){        
            return openCageRepository.GetContinent(input);
        }
        return "";
    }
}
