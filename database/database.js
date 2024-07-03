const mongoose = require('mongoose')

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  };

  const createDbConnection = () => {
    mongoose
      .connect('mongodb+srv://root:root@cluster0.p5wso0a.mongodb.net/', 
        
    {  useNewUrlParser: true,
    useUnifiedTopology: true,}
    )
      .then(() => {
        console.log("Mongo is on rock...");
      })
      .catch((error) => console.error(error));
  };

  module.exports = {
    createDbConnection,
  };