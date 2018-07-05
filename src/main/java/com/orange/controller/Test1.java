package com.orange.controller;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.orange.entity.GsonBuilderUtil;
import com.orange.model.BaseRet;
import com.orange.model.KlineData;
import com.orange.model.KlineOne;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/Kline", produces = "application/json; charset=utf-8")
public class Test1 {
    private static Gson gson = GsonBuilderUtil.create();


    @RequestMapping(value = "/test1", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public String sayHello0(HttpServletRequest request, Model model) {
        model.addAttribute("strategyRetList", "1");
        return "k-line-2-canve1";
    }

    @RequestMapping(value = "/GetDataKm", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getDataKm(HttpServletRequest request, Model model) {
        List<KlineOne> klineOnes = new ArrayList<>();

        String dataStr = readDataTest1.reader("D:\\kdata.txt");
//        System.out.println(dataStr);
        JsonArray ja = new JsonParser().parse(dataStr).getAsJsonArray();
        for (int i = 0; i < ja.size(); i++) {
            String min_time = ja.get(i).getAsJsonObject().get("min_time").getAsString();
            String open_px = ja.get(i).getAsJsonObject().get("open_px").getAsString();
            String high_px = ja.get(i).getAsJsonObject().get("high_px").getAsString();
            String low_px = ja.get(i).getAsJsonObject().get("low_px").getAsString();
            String close_px = ja.get(i).getAsJsonObject().get("close_px").getAsString();
            String business_amount = ja.get(i).getAsJsonObject().get("business_amount").getAsString();
            String business_balance = ja.get(i).getAsJsonObject().get("business_balance").getAsString();
            String ma5 = ja.get(i).getAsJsonObject().get("ma5").getAsString();
            String ma10 = ja.get(i).getAsJsonObject().get("ma10").getAsString();
            String ma20 = ja.get(i).getAsJsonObject().get("ma20").getAsString();

            KlineOne klineOne = new KlineOne(min_time, open_px, high_px, low_px, close_px, business_amount, business_balance, ma5, ma10, ma20);
            klineOnes.add(klineOne);
            if (klineOnes.size() >= 37) {
                break;
            }
        }

        int data_count = klineOnes.size();
        KlineData klineData = new KlineData("SZ002264", "1", "6", "0", "1", "",
                "", data_count, "", "", klineOnes);

        BaseRet baseRet = new BaseRet(1, data_count + "个数据", klineData);


        String json_ret = gson.toJson(baseRet);
        System.out.println(json_ret);
        return json_ret;
    }
}
