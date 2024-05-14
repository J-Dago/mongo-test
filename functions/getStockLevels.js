exports = async function(storeNumbers, articleId) {
  try {
    
  const body =  {
        "sites": storeNumbers
      }
    
  const response = await context.http.post({
      url: `https://api.sallinggroup.com/v1-test/stock-levels/articles/38660301/sites`,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": ["application/json"],
      Authorization: [ `Bearer ${context.values.get("stocklevels-key-value")}` ]
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