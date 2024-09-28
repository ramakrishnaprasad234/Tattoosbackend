const userLocationSchema = require('../../modules/useradress')

const usercreateAdress = async (req,res) =>{
    try{
        const  {user_uuid,street,city,state,postalCode,country,longitude,latitude} = req.body
        const useradress = new userLocationSchema({
            user_uuid ,
            address:{
                street,
                 city,
                 state,
                 postalCode,
                 country
            },
            coordinates:{
                type:'Point',
                coordinates:[longitude,latitude]
            }
        });

        await useradress.save();
        res.status(200).json({
            message:'Location save successfully',
            location:useradress
        })
    }

    catch(error){
        res.status(500).json({
            error:error
        })
    }
}



const getuseradress = async(req,res)=>{
    try{
        const {user_uuid} = req.params

        const useradress = await userLocationSchema.findOne({
            user_uuid:user_uuid
        })

        return res.status(200).json({
            message:'success',
            data:useradress
        })
    }
    catch(error){
        res.status(500).json({
            message:'error',
            error:error
        })
    }
}

    const useradressupdate = async(req,res)=>{
        try{
            const {user_uuid,street,city,state,postalCode,country,longitude,latitude} = req.body
            const locationupdate = await userLocationSchema.findOneAndUpdate({user_uuid:user_uuid},{
                address:{
                    street,
                     city,
                     state,
                     postalCode,
                     country
                },
                coordinates:{
                    type:'Point',
                    coordinates:[longitude,latitude]
                }
            },
        {new:true}
        );

        if(!locationupdate){
            return res.status(400).json({
                message:'user not found'
            })
        }

        return res.status(200).json({
            message:'updated successfully',
            data:locationupdate
        })
        }
        catch(error){
            return res.status(500).json({error:error})
        }
    }


    const useradressdelete = async(req,res)=>{
        try{
            const{user_uuid}= req.params
            const deleteditems = await userLocationSchema.findOneAndDelete({user_uuid:user_uuid})

            if(!deleteditems){
                return res.status(400).json({
                    message:'user not found'
                })
            }

            return res.status(200).json({
                message:'location deleted succussfully'
            })
        }
        catch(error){
            return res.status(500).json({
                error:error
            })
        }
    }

module.exports ={usercreateAdress,getuseradress,useradressupdate,useradressdelete}