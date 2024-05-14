exports = async function(storeNumber, articleNumbers){
  console.log("this is storenum: ", JSON.stringify(storeNumber));
  console.log("this is articleNumbers: ", JSON.stringify(articleNumbers));
 // const response = await context.http.get({ url: "https://www.example.com/users" })
  // The response body is a BSON.Binary object. Parse it and return.
  var secret = context.values.get("secret-test")
  var value = context.values.get("value-test")
  var secretValue = context.values.get("secret-value")
  console.log("this is secret: ", secret);
  console.log("this is value: ", value);
  console.log("this is secretValue: ", secretValue);
  var response = `{
  "succeeded": true,
  "error": {
    "message": "string",
    "code": 0
  },
  "data": {
    "siteId": "string",
    "stockLevels": [
      {
        "articleId": "string",
        "currentStock": "10",
        "isCPUCMarked": true,
        "type": "string",
        "unitOfMeasure": "string"
      }
    ]
  }
}`
return response;
// var parsed = EJSON.parse(response);
// console.log("this is ejson parsed: ", JSON.stringify(parsed));
//   return EJSON.parse(response);

};