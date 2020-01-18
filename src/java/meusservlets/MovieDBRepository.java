/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package meusservlets;

import datamodels.*;
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
public class MovieDBRepository {

    private String API_KEY = "a4aa08fa41f4696c95f0450027407fbd";

    public String Get(String type, String id) {
        StringBuilder content = new StringBuilder();
        try {
            
            URL url = new URL("https://api.themoviedb.org/3/" + type + "/"+ id + "?api_key=" + API_KEY + "&language=en-US");
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
        return content.toString();
    }
    
    public String SearchMovieId(Movie movie, String name) {
        if (name.length() == 0) {
            return "";
        }
        name = name.trim();
        String id = "";
        StringBuilder content = new StringBuilder();
        try {
            
            URL url = new URL("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + ConstructQueryParams(name));
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            if (content != null){
                int indexFirst = content.toString().indexOf("id");
                int indexLast = content.indexOf("video");
                if ((indexFirst > -1) && (indexLast > -1)){
                    id = content.substring(indexFirst + 4, indexLast - 2);
                }
            }
            in.close();
            con.disconnect();
        } catch (Exception ex) {
            Logger.getLogger(MovieDBRepository.class.getName()).log(Level.SEVERE, null, ex);
        }
        return id;
    }
    
    public String SearchActorId(Actor actor) {
        if (actor.Name.length() == 0) {
            return "";
        }
        String id = "";
        StringBuilder content = new StringBuilder();
        try {
            
            URL url = new URL("https://api.themoviedb.org/3/search/person?api_key=" + API_KEY + "&query=" + ConstructQueryParams(actor.Name));
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            if (content != null){
                int indexFirst = content.toString().indexOf("id");
                int indexLast = content.indexOf("profile_path");
                if ((indexFirst > -1) && (indexLast > -1)){
                    id = content.substring(indexFirst + 4, indexLast - 2);
                }
            }
            in.close();
            con.disconnect();
        } catch (Exception ex) {
            Logger.getLogger(MovieDBRepository.class.getName()).log(Level.SEVERE, null, ex);
        }
        return id;
    }

    
    private String ConstructQueryParams(String name) {
        String[] parts = name.split(" ");
        String queryParams = "";
        for (int i = 0; i < parts.length; i++) {
            queryParams = queryParams.concat(parts[i]);
            if (i != parts.length - 1) {
                queryParams = queryParams.concat("+");
            }
        }
        return queryParams;
    }
}
