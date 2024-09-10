
const Test = require('../../modules/admin/addlabtest')
const {v4:uuidv4} = require('uuid')
const addtest = async(req,res)=>{
    try{
        console.log('coming')
        const {lab_uuid,test_name,description,price,duration,sample_type,type,included_tests}=req.body;

        if(!lab_uuid || !test_name || !description || !price || !duration || !sample_type || !type ){
            return res.status(400).json({error:'All fields are required'})
        }

        if(!['Test','Profile'].includes(type)){
            return res.status(400).json({error:'invalid type, please define the type'})
        }
        if(type==='Test'){
            let generateduuid = uuidv4()
            const newtest = new Test({
                test_uuid:generateduuid,
                lab_uuid,
                test_name:test_name,
                description:description,
                price:price,
                duration:duration,
                sample_type:sample_type,
                type:type
            })

            const testadded = await newtest.save()
            return res.status(200).json({message:'test created succefully',test:testadded})
        }
        if(type === 'Profile'){
            if(!included_tests || !Array.isArray(included_tests) || included_tests.length === 0){
                return res.status(400).json({
                    error:'please provide included test'
                })
            }

            let testuuids=[]
            for(let test of included_tests){
                let testuuid;
                if(typeof test ==='string'){
                  const existingtest = await Test.findOne({test_uuid:test,type:'Test'})
                  if(!existingtest){
                    return res.json({error:'test with uuid not found'})
                  }
                  testuuid = test
                }
                else{
                    let generateduuid = uuidv4()
                    console.log('coming')
                    console.log(generateduuid)
                    const newtest = new Test({
                        test_uuid:generateduuid,
                        lab_uuid,
                        test_name:test_name,
                        description:description,
                        price:price,
                        duration:duration,
                        sample_type:sample_type,
                        type:type,
                    });
                    const savedtest = await newtest.save();
    
                    testuuid = savedtest.test_uuid;
                }
                testuuids.push(testuuid)
            }
            let generateduuid = uuidv4()
            const profile = new Test({
                test_uuid:generateduuid,
                lab_uuid,
                test_name,
                description,
                price,
                duration,
                sample_type,
                type:'Profile',
                included_tests:testuuids,
            });
            const savedprofile = await profile.save();
            return res.status(200).json({
                message:'profile created successfully',
                profile:savedprofile,
            })
        }

    }
    catch(error){
        res.status(500).json({error:'server error',message:error})
    }
}

module.exports=addtest