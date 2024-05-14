exports = async function(storeNumber, barcode, username) {
  
  console.log("env: " + JSON.stringify(context.environment))
  try {
    const body = {
        storeNumber: storeNumber,
        barcode: barcode,
        duration: 25000,
        userName: username
      }
  const response = await context.http.post({
      url: "https://mobile-platform-api.azurewebsites.net/api/ESL/FlashLabel",
      body: JSON.stringify(body),
      headers: {
  "Content-Type": [ "application/json" ]
}
})
  // The response body is encoded as raw BSON.Binary. Parse it to JSON.
  const ejson_body = EJSON.parse(response.body.text());
  console.log("this is response: ", JSON.stringify(ejson_body))
  if(ejson_body.succeeded === false){
    return JSON.stringify(ejson_body.error);
  }
  else{
    return 'OK'
  }
  } catch(err) {
    console.log("this is error: ", err.message)
      return err.message
    }
};
