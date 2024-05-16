exports = async function(changeEvent) {
  try {
    const body = {
      articleNumber : changeEvent.fullDocument.articleNumber,
      barcode : changeEvent.fullDocument.barcode,
      deviceId : changeEvent.fullDocument.deviceId,
      isOutOfStock : changeEvent.fullDocument.isOutOfStock,
      storeNumber : changeEvent.fullDocument.storeNumber,
      userName : changeEvent.fullDocument.userName,
    }
    console.log(JSON.stringify(changeEvent))
    const response = await context.http.post({
        url: 'https://api.sallinggroup.com/v1-test/mobile-platform-services/InsertVCloudOutOfStockArticleInfo',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": [ "application/text" ],
          Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
        }
    })
    console.log(JSON.stringify(response.data))
    
    // Access the _id of the changed document:
    const docId = changeEvent.documentKey._id;
  
    // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
    const serviceName = "mongodb-atlas";
    const databaseName = "asyncDB";
    const collection = context.services.get(serviceName).db(databaseName).collection(changeEvent.ns.coll);
  
    console.log(JSON.stringify(collection))
    // Delete from db after post, since we don't want to keep these on MongoDB side.
    const deleted = await collection.deleteOne({"_id": docId});
      console.log(JSON.stringify(deleted))
    return "Sent"
  } catch(err) {
      console.log("this is error: ", err.message)
        return err.message
    }
};