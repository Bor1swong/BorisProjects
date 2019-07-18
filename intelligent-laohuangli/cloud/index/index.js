// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");
cloud.init()

var getSentiment=function(content){
const NlpClient = tencentcloud.nlp.v20190408.Client;
const models = tencentcloud.nlp.v20190408.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
//下行为用户的SecretID和SecretKey
let cred = new Credential("", "");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "nlp.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new NlpClient(cred, "ap-guangzhou", clientProfile);
let req = new models.SentimentAnalysisRequest();
let params = '{"Text":"'+ content +'"}'
req.from_json_string(params);

  return new Promise(function (resolve, reject) { //构造异步函数
    client.SentimentAnalysis(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}

// client.SentimentAnalysis(req, function (errMsg, response) {

//   if (errMsg) {
//     console.log(errMsg);
//     return;
//   }

//   console.log(response.to_json_string());
//   return response.to_json_string();
// });
// }


// 云函数入口函数
exports.main = async (event, context) => {
  const data = event
  const content=[data.cont]
  datas = await getSentiment(content)    //调用异步函数，向腾讯云API发起请求
  return datas
}