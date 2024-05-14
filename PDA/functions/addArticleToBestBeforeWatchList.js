exports = async function(jsonData) {
  try {
    const data = JSON.parse(jsonData);
    console.log(data);
  
    const response = await context.http.post({
        url: "https://api.sallinggroup.com/v1-test/mobile-platform-services/AddArticleToBestBeforeWatchList",
        body: JSON.stringify(data),
        headers: {
    "Content-Type": [ "text/plain" ],
    Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
  }
})
  return "Success";

  } catch(err) {
    console.log("this is error: ", err.message);
      return "Fail";
    }
};
