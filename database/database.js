const mongoose = require('mongoose')
const medicalshop = require('../modules/admin/addshop')
const labs = require('../modules/admin/addlabs')
const medicine = require('../modules/admin/addmedicine')
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  };

  const createindexes = async ()=>{
    try{
        await  medicalshop.createIndexes({name:'text',address:'text'})
        await labs.createIndexes({name:'text',testsOffered:'text'})
        await medicine.createIndexes({name:'text'});
        console.log('indexes created')
    }
    catch(error){
      console.log(error)
    }
  }

  const createDbConnection = () => {
    mongoose
      .connect('mongodb+srv://root:root@cluster0.p5wso0a.mongodb.net/', 
        
    {  useNewUrlParser: true,
    useUnifiedTopology: true,}
    )
      .then(async() => {
        console.log("Mongo is on rock...");
        await createindexes();
      })
      .catch((error) => console.error(error));
  };

  module.exports = {
    createDbConnection,
  };