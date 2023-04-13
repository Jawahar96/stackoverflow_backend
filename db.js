const mongoose=require('mongoose');


// const url='mongodb:localhost:27017//Jawa:y4Jejj21qIF3ytLRde@stackoverflow.l7ed7t0.mongodb.net/?retryWrites=true&w=majority';
// const url ='mongodb+srv://jawaharsabesan:orbjpkBx7BF6OFxW@cluster0.n6dtkg8.mongodb.net/?retryWrites=true&w=majority'
 const url='mongodb://ac-cdpanzd-shard-00-00.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-01.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-02.l7ed7t0.mongodb.net:27017/?ssl=true&replicaSet=atlas-trokem-shard-0&retryWrites=true&w=majority'
// const url='mongodb://Jawahar:mMGRWMBMsVYrMEoB@ac-cdpanzd-shard-00-00.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-01.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-02.l7ed7t0.mongodb.net:27017 /?ssl=true&replicaSet=atlas-trokem-shard-0&authSource=admin&retryWrites=true&w=majority'
module.exports.connect=()=>{
    mongoose
    .connect(url)
    .then((res)=>console.log("MongoDB is connected Successfully"))
    .catch((err)=>console.log("Error occured",err)) 
};

