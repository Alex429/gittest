package com.orange.entity;

import java.util.Random;

public class GetRandomName {

    public static String getUsername() {
        Random R = new Random();
        int randInt = R.nextInt(10000) + 10000;
        String nameRand = "用户" + randInt;
//        System.out.println(nameRand);
        return nameRand;
    }

    public static void main(String[] args) {
        Random R = new Random();
        int randInt = R.nextInt(10000) + 10000;
        String nameRand = "用户" + randInt;
        System.out.println(nameRand);
    }
}
