exports = async function(changeEvent) {
  try {
    
    const data = JSON.parse(changeEvent.fullDocument.data);
    const methodName = changeEvent.fullDocument.methodName;
    
    const response = await context.http.post({
        url: `https://api.sallinggroup.com/v1-test/mobile-platform-services/${methodName}`,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": [ "application/text" ],
          Authorization: [ `Bearer ${context.values.get("gateway-key-value")}` ]
        }
    })
    
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
