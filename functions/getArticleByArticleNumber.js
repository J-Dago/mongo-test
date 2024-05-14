exports = async function(storeNumber, articleNumber, userName, articleNewScreenLayout, unitOfMeasurement) {
  try {
    const response = await context.http.get({
        url: `https://api.sallinggroup.com/v1-test/mobile-platform-services/GetArticleByArticleNumber?articleNewScreenLayout=${articleNewScreenLayout}&storenumber=${storeNumber}&articleNumber=93000100007&username=${userName}&unitOfMeasurement=${unitOfMeasurement}`,
        headers: {
    "Content-Type": [ "application/text" ],
    Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
  }
})
  // The response body is encoded as raw BSON.Binary. Parse it to JSON.
  const ejson_body = EJSON.parse(response.body.text());
  console.log("response: ",JSON.stringify(ejson_body))
  if(ejson_body.succeeded === false){
    return JSON.stringify(ejson_body.error);
  }
  else{
    return JSON.stringify(ejson_body);
  }
  } catch(err) {
    console.log("this is error: ", err.message)
      return err.message
    }
};
