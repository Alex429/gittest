package com.orange.model;

public class KlineOne {
    private String min_time;
    private String open_px;
    private String high_px;
    private String low_px;
    private String close_px;
    private String business_amount;
    private String business_balance;
    private String ma5;
    private String ma10;
    private String ma20;

    public KlineOne(String min_time, String open_px, String high_px, String low_px, String close_px, String business_amount, String business_balance, String ma5, String ma10, String ma20) {
        this.min_time = min_time;
        this.open_px = open_px;
        this.high_px = high_px;
        this.low_px = low_px;
        this.close_px = close_px;
        this.business_amount = business_amount;
        this.business_balance = business_balance;
        this.ma5 = ma5;
        this.ma10 = ma10;
        this.ma20 = ma20;
    }

    public String getMin_time() {
        return min_time;
    }

    public void setMin_time(String min_time) {
        this.min_time = min_time;
    }

    public String getOpen_px() {
        return open_px;
    }

    public void setOpen_px(String open_px) {
        this.open_px = open_px;
    }

    public String getHigh_px() {
        return high_px;
    }

    public void setHigh_px(String high_px) {
        this.high_px = high_px;
    }

    public String getLow_px() {
        return low_px;
    }

    public void setLow_px(String low_px) {
        this.low_px = low_px;
    }

    public String getClose_px() {
        return close_px;
    }

    public void setClose_px(String close_px) {
        this.close_px = close_px;
    }

    public String getBusiness_amount() {
        return business_amount;
    }

    public void setBusiness_amount(String business_amount) {
        this.business_amount = business_amount;
    }

    public String getBusiness_balance() {
        return business_balance;
    }

    public void setBusiness_balance(String business_balance) {
        this.business_balance = business_balance;
    }

    public String getMa5() {
        return ma5;
    }

    public void setMa5(String ma5) {
        this.ma5 = ma5;
    }

    public String getMa10() {
        return ma10;
    }

    public void setMa10(String ma10) {
        this.ma10 = ma10;
    }

    public String getMa20() {
        return ma20;
    }

    public void setMa20(String ma20) {
        this.ma20 = ma20;
    }
}
