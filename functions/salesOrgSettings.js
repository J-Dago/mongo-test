exports = async function(storeNumber, userName) {
  try {
  const response = await context.http.get({
      url: `https://api.sallinggroup.com/v1-test/mobile-platform-services/GetSalesOrgSettingsByStoreNumber?storeNumber=${storeNumber}&userName=${userName}`,
      headers: {
  "Content-Type": [ "application/text" ],
  Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
}
})
  // The response body is encoded as raw BSON.Binary. Parse it to JSON.
  const ejson_body = EJSON.parse(response.body.text());
  if(ejson_body.succeeded === false){
    return JSON.stringify(ejson_body.error);
  }
  else{
    console.log(JSON.stringify(ejson_body))
    return JSON.stringify(ejson_body)
  }
  } catch(err) {
    console.log("this is error: ", err.message)
      return err.message
    }
};