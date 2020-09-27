import HttpConfig from './config';
import axios from 'axios';
import apiList from './apiList';
import qs from 'querystring';
import defaultsDeep from 'lodash/defaultsDeep';

//创建自定义axios实例
let instance = axios.create({
    baseURL : '',
    timeout : 240000, // 设置4分钟超时时间
    //code 0 -- 正常， 1 -- 逻辑异常， -1 -- 捕获异常
    validateStatus : function (status) {
        return status < 500;
    },
    headers : {
        //设置发送内容格式
        'content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
        //设置接受内容格式
        'Accept' : 'application/json',
    },
});

//响应拦截器
instance.interceptors.response.use((res) => {
    //处理响应数据
    return res.data;
}, function (err) {
    return Promise.reject(err);
});

export default {
    post ({ apiKey, params = {}, config = null, module = 'baseURL' }) {
        let myConfig = {};
        //自定义http配置
        if (config) {
            Object.assign(myConfig, config);
        }
        //设置时间戳
        params.clientTimestamp = Date.now();
        let needStringify = !(myConfig.headers &&
            (myConfig.headers['content-type'].includes('application/json') ||
                myConfig.headers['content-type'].includes('multipart/form-data')));
        return instance.post(HttpConfig[module] + apiList[apiKey], needStringify ? qs.stringify(params) : params, myConfig).then(res => {
          return res;
        }).catch(err => {
          return err;
        });
    },
    get ({ apiKey, params = {}, config = null, module = 'baseURL' }) {
        let myConfig = {};
        myConfig = defaultsDeep(myConfig, { params : params });
        //自定义http配置
        if (config) {
            Object.assign(myConfig, config);
        }
        //设置时间戳
        myConfig.params.clientTimestamp = Date.now();
        return instance.get(HttpConfig[module] + `${apiList[apiKey]}`, myConfig).then(res => {
          return res;
        }).catch(err => {
          return err;
        });
    },
};
