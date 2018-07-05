package com.orange.controller;


import com.google.gson.*;
import com.orange.entity.GsonBuilderUtil;

import java.io.*;
public class readDataTest1 {
    private static Gson gson = GsonBuilderUtil.create();

    public static void main(String[] args) {
        String ts = reader("D:\\kdata.txt");
        System.out.println(ts);
        process(ts);
    }

    public static String reader(String filePath) {
        try {
            File file = new File(filePath);
            if (file.isFile() && file.exists()) {
                InputStreamReader read = new InputStreamReader(new FileInputStream(file), "UTF-8");
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt = bufferedReader.readLine();
                while (lineTxt != null) {
                    return lineTxt;
                }
            }
        } catch (UnsupportedEncodingException | FileNotFoundException e) {
            System.out.println("Cannot find the file specified!");
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println("Error reading file content!");
            e.printStackTrace();
        }
        return null;
    }


    private static void process(String txtStr) {
        JsonArray ja = new JsonParser().parse(txtStr).getAsJsonArray();
        for(int i=0;i<ja.size();i++){
            System.out.println(ja.get(i).getAsJsonObject().get("min_time").getAsString());
        }



//        System.out.println(new JsonParser().parse(txtStr).getAsJsonArray().get(0).getAsJsonObject().get("min_time").getAsString());
    }
}
