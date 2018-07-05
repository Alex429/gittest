package com.orange.model;

import java.util.ArrayList;
import java.util.List;

public class KlineData<T> {
    private String code;
    private String type;
    private String candle_period;
    private String candle_mode;
    private String search_direction;
    private String date;
    private String min_time;
    private int data_count;
    private String start_date;
    private String end_date;
    private List<T> detail_list = new ArrayList<>();

    public KlineData(String code, String type, String candle_period, String candle_mode, String search_direction, String date, String min_time, int data_count, String start_date, String end_date, List<T> detail_list) {
        this.code = code;
        this.type = type;
        this.candle_period = candle_period;
        this.candle_mode = candle_mode;
        this.search_direction = search_direction;
        this.date = date;
        this.min_time = min_time;
        this.data_count = data_count;
        this.start_date = start_date;
        this.end_date = end_date;
        this.detail_list = detail_list;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCandle_period() {
        return candle_period;
    }

    public void setCandle_period(String candle_period) {
        this.candle_period = candle_period;
    }

    public String getCandle_mode() {
        return candle_mode;
    }

    public void setCandle_mode(String candle_mode) {
        this.candle_mode = candle_mode;
    }

    public String getSearch_direction() {
        return search_direction;
    }

    public void setSearch_direction(String search_direction) {
        this.search_direction = search_direction;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMin_time() {
        return min_time;
    }

    public void setMin_time(String min_time) {
        this.min_time = min_time;
    }

    public int getData_count() {
        return data_count;
    }

    public void setData_count(int data_count) {
        this.data_count = data_count;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public List<T> getDetail_list() {
        return detail_list;
    }

    public void setDetail_list(List<T> detail_list) {
        this.detail_list = detail_list;
    }
}
