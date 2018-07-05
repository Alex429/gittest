package com.orange.entity;

public class CxDataEntity {
    //    服务器地址
//    public final static String SERVER_HOST = "http://192.168.84.63:8090";
    public final static String SERVER_HOST = "http://192.168.84.195";

    //    单个策略详情动态表名的开头字段 例如：zntz_intelligence_strategy_1001
    public final static String INTELLIGENCESTRATEGY_TABLENAMESTART = "zntz_intelligence_strategy_";

    //    单个股票池动态表名的开头字段 例如 zntz_preference_stock_pool_2003
    public final static String PREFERENCE_STOCK_POOL_TABLENAMESTART = "zntz_preference_stock_pool_";

    //    Ehcache名称
    public final static String EHCACHENAME_CXCACHE = "CxCache";

    //    密码最短 长度
    public final static int PASSWORD_MIN_LENGTH = 6;

    //    密码最长 长度
    public final static int PASSWORD_MAX_LENGTH = 16;

    //    用户名最长 长度
    public final static int USERNAME_MAX_LENGTH = 20;

    //    手机号长度
    public final static int PHONE_LENGTH = 11;

    //    验证码长度
    public final static int CHECKCODE_LENGTH = 6;

    //    验证码有效期 30 分钟
    public final static int CHECKCODE_PERIOD_OF_VALIDITY = 30;

    //    默认头像地址
    public final static String DEFAULT_AVATER_URL = "/headers/default.jpg";

    //    极光
    public final static String JIGUANG_APPKEY = "24e5615b27da5f15a02f0e5a";
    public final static String JIGUANG_MASTER_SECRET = "9298bf2ac4bfc49f873dd1e8";
}

