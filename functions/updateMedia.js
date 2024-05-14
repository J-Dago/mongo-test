exports = async function(jsonData) {
  try {
    const data = JSON.parse(jsonData);
  
    const response = await context.http.post({
        url: "https://api.sallinggroup.com/v1-test/mobile-platform-services/UpdateMedia",
        body: JSON.stringify(data),
        headers: {
    "Content-Type": [ "text/plain" ],
    Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
  }
})
  // The response body is encoded as raw BSON.Binary. Parse it to JSON.
  const ejson_body = EJSON.parse(response.body.text());
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
