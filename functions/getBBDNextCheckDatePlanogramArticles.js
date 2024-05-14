exports = async function(taskId, userName, nextCheckDate) {
  try {
    
  const response = await context.http.get({
      url: `https://api.sallinggroup.com/v1-test/mobile-platform-services/GetBBDNextCheckDatePlanogramArticles?&username=${userName}&taskId=${taskId}&nextCheckDate=${nextCheckDate}`,
      headers: {
  "Content-Type": [ "text/plain" ],
  Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
}
})
  // The response body is encoded as raw BSON.Binary. Parse it to JSON.
  const ejson_body = EJSON.parse(response.body.text());
  console.log("this is response: ", JSON.stringify(ejson_body))
  if(ejson_body.succeeded === false){
    return JSON.stringify(ejson_body.error);
  }
  else{
    return JSON.stringify(ejson_body)
  }
  } catch(err) {
    console.log("this is error: ", err.message)
      return err.message
    }
};