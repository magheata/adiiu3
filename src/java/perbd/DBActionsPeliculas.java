/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package perbd;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author dsst
 */
public class DBActionsPeliculas {

    public String getPelisPorCadena(String par) {
        DBConnection con = new DBConnection();
        String res = "{'pelisporcadena':[";
        try {
            con.open();
            Statement st = con.getConection().createStatement();
            String sqlq = "select * from peliculas where originaltitle like '%" + par + "%';";
            ResultSet rs = st.executeQuery(sqlq);
            String aux;
            String nom;
            while (rs.next()) {
                nom = rs.getString("originaltitle");
                aux = "";
                aux = aux + "{'nom':'" + nom + "'}";
                res = res + aux + ",";
            }
            res = res.substring(0, res.length() - 1);   // quito la última coma
            res = res + "]}";
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            con.close();
        }
        return res;
    }

    public String getCantidPorCadena(String par) {
        DBConnection con = new DBConnection();
        String res = "{'cantipelisporcadena':";
        try {
            con.open();
            Statement st = con.getConection().createStatement();
            String sqlq = "select count(originaltitle) from peliculas where originaltitle like '%" + par + "%';";
            ResultSet rs = st.executeQuery(sqlq);
            int canti = 0;
            if (rs.next()) {
               canti = rs.getInt(1);
            }
            res = res + canti + "}";
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            con.close();
        }
        return res;
    }
    
    public List<String> getPelisPorActor(String par) {
        DBConnection con = new DBConnection();
        List<String> res = new ArrayList<>();
        try {
            con.open();
            Statement st = con.getConection().createStatement();
            String sqlq = "select * from namebasics limit 10;";
            ResultSet rs = st.executeQuery(sqlq);
            String aux;
            String persona;
            String birthYear;
            String deathYear;
            String nconst;
            String pelis;
            while (rs.next()) {
                persona = rs.getString("primaryname");
                birthYear = rs.getString("birthyear");
                deathYear = rs.getString("deathYear");
                if(par.equals("personas")){
                    res.add('"' + persona + '"' + ", " + birthYear + ", " + deathYear);
                }else if(par.equals("pelis")){
                    nconst = rs.getString("nconst"); //id de la persona
                    Statement st2 = con.getConection().createStatement();
                    String sqlq2 = "select count(tconst) as contador from personapeli where nconst='" + nconst + "';";
                    ResultSet rs2 = st2.executeQuery(sqlq2);
                    if (rs2.next()) {
                        res.add(rs2.getString("contador"));
                    }else{
                        res.add(Integer.toString(0));
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            con.close();
        }
        return res;
    }
}
