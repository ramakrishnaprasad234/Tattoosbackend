const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    user_uuid:{
        type:String,
        required:true
    },
    lab_uuid:{
        type:String,
        required:true
    },
    test:[
        {
            test_uuid:{
                type:String,
                required:true
            },
            test_name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            type:{
                type:String,
                enum:['Test','Profile'],
                required:true
            },
            sub_test:[
                {
                    sub_test_uuid:{
                        type:String,
                        required:true
                    },
                    sub_test_name:{
                        type:String,
                        required:true
                    },
                    sub_test_price:{
                        type:Number,
                        required:true
                    },
                },
            ],
            // totalitems:{
            //     type:String,
            //     required:true
            // },
            totalprice:{
                type:Number,
                required:true
            }

        }
    ],
    totalitems:{type:Number,required:true},
    totalprice:{type:Number,required:true}
});

    cart.path('test').validate(function (tests){
    return tests.every((test)=>{
        if(test.type==='Profile'){
            return test.sub_test && test.sub_test.length > 0;
        }else if(test.type === 'Test'){
            return !test.sub_test || test.sub_test.length === 0;
        }
        return true;
    });
},)



const labcart = mongoose.model('labcart',cart)

module.exports = labcart