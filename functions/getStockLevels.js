exports = async function(storeNumbers, articleId) {
  try {
    
  const body =  {
        "sites": storeNumbers
      }
    
  const response = await context.http.post({
      url: `https://api.sallinggroup.com/v1-test/stock-levels/articles/${articleId}/sites`,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": ["application/json"],
      Authorization: [ `Bearer ad396894-df4a-45f7-8560-b24c3d1c27d1` ] // Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
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