/*
项目: 复制链接微信打开 至尊宝 http://2438273.b58ut2hpkxi.fp18kadngkoqs.cloud/?p=2438273
运行环境: 毛毛
抓包帮助: 黄鸟搜索 read/info
变量格式: time&sign&User-Agent&Cookie
定时规则: 0 8,12,15,17 * * *
*/

var userIdx = 0;
var ckName = "lhmj";
var userList = '1692492038&c9ddd8c7036d0ab599b786432148b7562bf5e9f0eca48104fa852a255fd442d5&Mozilla/5.0 (Linux; Android 10; NX611J Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 MMWEBID/6632 MicroMessenger/8.0.28.2240(0x28001C35) WeChat/arm64 Weixin NetType/NON_NETWORK Language/zh_CN ABI/arm64&gfsessionid=o-0fIv8HvH24Xaq1oaDipnmivCcs; zzbb_info=%7B%22openid%22%3A%22oF1b14mJKjIkyDshjIOziGC84Wks%22%2C%22pid%22%3A2438273%2C%22uid%22%3A2513530%7D@1692524263&150877e018ad2affc3f1c16e0009280b9221d97ff249cc03023a9fa3ce7835e0&Mozilla/5.0 (Linux; Android 10; NX611J Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 MMWEBID/8281 MicroMessenger/8.0.28.2240(0x28001C35) WeChat/arm64 Weixin NetType/NON_NETWORK Language/zh_CN ABI/arm64&gfsessionid=o-0fIv5YlhaFte_vyv2UoC0Iu2bQ; zzbb_info=%7B%22openid%22%3A%22oF1b14skIq2xCr_srAHQ5gwsSmik%22%2C%22pid%22%3A2287955%2C%22uid%22%3A2438273%7D@1692525596&b2a949ba44a16d4b86c42e06e9f99394c31d7635cf1d52b9e3ac1489a4b37952&Mozilla/5.0 (Linux; Android 10; NX611J Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 MMWEBID/6468 MicroMessenger/8.0.28.2240(0x28001C35) WeChat/arm64 Weixin NetType/NON_NETWORK Language/zh_CN ABI/arm64&gfsessionid=o-0fIv10y1qv_LwwftvaLFWE5y10; zzbb_info=%7B%22openid%22%3A%22oF1b14i46d1-QHyicIa1ZGHn3PO4%22%2C%22pid%22%3A2287955%2C%22uid%22%3A2438753%7D';//process.env[ckName];
var request = require('request');
const crypto = require('crypto');

class UserInfo {
    constructor(str) {
        //console.log(str)
        this.index = ++userIdx;
        this.idx = `【账号${this.index}】`;
        this.ck = str.split('&');
        this.host = "http://" + "2438273.emncn8s4lmj.zhar.7tojpq6xbpco0.cloud"
        this.time = this.ck[0];
        this.sign = this.ck[1]; //"c9ddd8c7036d0ab599b786432148b7562bf5e9f0eca48104fa852a255fd442d5";
        this.ua = this.ck[2];
        this.cks = this.ck[3];

    }
    async main() {
        console.log("\n==========" + this.idx + "==========");

        for (let i = 0; i < 30; i++) {
            var r = await this.getUrl(this.host, this.time, this.sign);
            if (r.code != 0) {
                log(this.idx + " " + r.message);
                break;
            }

            await sleep(random(10, 15) * 1000);
            var data = await this.finish(this.host, this.time, this.sign);

            if (data.code != 0) {
                break;
            }
            log(this.idx + " 阅读文章 +" + data.data.gain);
        }
        await this.info(this.host, this.time, this.sign);

    }
    async getUrl(host, time, sign) {
        let url = host + "/read/task?time=" + time + "&sign=" + sign;
        let headers = {
            "Connection": "keep-alive",
            "Accept": "application/json, text/plain",
            "User-Agent": this.ua,
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": this.cks,
            "X-Requested-With": "com.tencent.mm"

        };
        let json = {};
        json.url = url;
        json.method = "GET";
        // json.body = body;
        json.headers = headers;
        let r = await http(json);
        let data = r.body.json();
        return data;
    }
    async finish(host, time, sign) {
        let url = host + "/read/finish";
        let body = {
            "time": time,
            "sign": sign
        };
        let headers = {

            "Connection": "keep-alive",
            "Accept": "application/json, text/plain, */*",
            "Origin": host,
            "User-Agent": this.ua,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": this.cks,
            "X-Requested-With": "com.tencent.mm"

        };
        let json = {};
        json.url = url;
        json.method = "POST";
        json.form = body;
        json.headers = headers;
        let r = await http(json);
        let data = r.body.json();
        return data;
    }

    async getSign() {
        var time = Math.floor(Date.now() / 1000).toString();
        var sign_str = `key=4fck9x4dqa6linkman3ho9b1quarto49x0yp706qi5185o&time=${time}`;
        var sha256_hash = crypto.createHash('sha256').update(sign_str).digest('hex');
        var sign = sha256_hash;

        return {'ts':time,'sg':sign};
    }
    async withdraw(gold, host, time, sign) {
        let url = host + "/withdraw/wechat";
        let body = {
            "gold": gold,
            "time": time,
            "sign": sign
        };
        let headers = {
           
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "Origin": host,
                "User-Agent": this.ua,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": this.cks,
                "X-Requested-With": "com.tencent.mm"

        };
        let json = {};
        json.url = url;
        json.method = "POST";
        json.form = body;
        json.headers = headers;
        let r = await http(json);
        let data = r.body.json();
        log(data);
    }

    async info(host, time, sign) {
        let url = host + "/read/info?time=" + time + "&sign=" + sign;
        let headers = {

            "Connection": "keep-alive",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": this.ua,
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": this.cks,
            "X-Requested-With": "com.tencent.mm"

        };
        let json = {};
        json.url = url;
        json.method = "GET";
        //json.body = body;
        json.headers = headers;
        let r = await http(json);
        let data = r.body.json();
        // log(data);
        if (data.code == 0) {
            var gold = data.data.remain;
            log(this.idx + " 当前金币: " + gold);
            if (gold >= 3000) {
                log(this.idx + " 当前金币可提现" + (gold / 10000) + "元 ");
               // var sign = await this.getSign();
                //this.withdraw(gold, host, sign.ts, sign.sg);
            }
        }
    }
}

async function main() {
    if (!userList) {
        log(curTime() + "找不到变量,请先添加变量\n变量名: " + ckName + "\n \n多号@隔开");
        return;
    }
    var time = random(7, 10);
    console.log("========【Tlme脚本声明】========");
    console.log("本脚本仅供API学习交流使用请勿用于\n违法犯罪行为,如果您使用脚本时触犯\n违法行为,一切责任自行承担,与作者无关\n")
    //await sleep(time * 1000);
    for (let i of userList.split("@")) {
        await new UserInfo(i).main();
        await sleep(random(2, 3) * 1000);
    }
}

main();



/*
*log(str) 日志
*sleep(s) 延时
*curTime() 当前时间
*http(json) 发送http get post put ... 
*random(min,max) 生产区间随机数
*md5()加密 32位小写
*/

function random(Min, Max) { var Range = Max - Min; var Rand = Math.random(); return (Min + Math.round(Rand * Range)) }; function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }; function log(str) { console.log(str) }; function curTime() { function repair(i) { if (i >= 0 && i <= 9) { return "0" + i } else { return i } } var date = new Date(); var year = date.getFullYear(); var month = repair(date.getMonth() + 1); var day = repair(date.getDate()); var hour = repair(date.getHours()); var minute = repair(date.getMinutes()); var second = repair(date.getSeconds()); var curTime = hour + ":" + minute + ":" + second; return "[" + curTime + "] " }; async function http(json) { var promise = new Promise(function (resolve, reject) { request(json, function (err, res, body) { let r = {}; if (!err && res.statusCode == 200) { r.code = 200; let rjson = {}; rjson.json = function json() { return JSON.parse(body) }; rjson.string = function string() { return body }; r.headers = res.headers; r.body = rjson } else { r.code = 0 } resolve(r) }) }); return promise }; function md5(m) { var crypto = require('crypto'); var mm = crypto.createHash("md5"); mm.update(m); var str = mm.digest('hex'); var s = str.toLowerCase(); return s }
