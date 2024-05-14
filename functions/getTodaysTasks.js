exports = async function(storeNumber, userName, departments, merchandiseCategory) {
  try {
    const body = {
        storeNumber: storeNumber,
        userName: userName,
        departments: departments,
        merchandiseCategory: merchandiseCategory,
        baseTimeForNextFetch: "01-01-01"
      }
  
    const response = await context.http.post({
        url: "https://api.sallinggroup.com/v1-test/mobile-platform-services/GetTodaysTasks",
        body: JSON.stringify(body),
        headers: {
    "Content-Type": [ "application/text" ],
    Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
  }
})
  // The response body is encoded as raw BSON.Binary. Parse it to JSON.
  const ejson_body = EJSON.parse(response.body.text());
  console.log(JSON.stringify(ejson_body))
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
