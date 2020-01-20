/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package meusservlets;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author andreea
 */
public class OpenCageRepository {
    private String API_KEY = "5473ec3a23c946d996fa5fcca9abc145";
    
    public String GetContinent(String input){        
        StringBuilder content = new StringBuilder();
        try {
            URL url = new URL("https://api.opencagedata.com/geocode/v1/json?key="+ API_KEY + "&q="+ input + "&pretty=1");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
        } catch (Exception ex) {
            Logger.getLogger(MovieDBRepository.class.getName()).log(Level.SEVERE, null, ex);
        }
        String aux = content.toString();
        int indexFirst = aux.indexOf("continent") + 14;
        int indexLast = aux.substring(indexFirst, aux.length() - 1).indexOf(",");
        String continent = aux.substring(indexFirst, (indexFirst + indexLast) - 1);
        switch(continent){
            case "Europe":
                return "eu";
            case "North America":
                return "na";
            case "Asia":
                return "as";
            case "Oceania":
                return "oc";
            case "Africa":
                return "af";
            case "South America":
                return "sa";
            default:
                return "";
        }
    }
}
