const express=require('express')
const app=express()
const bcrypt=require('bcryptjs')
app.use(express.json())
require('./db_connect')
const User=require('./User')

app.post('/user',async(req,res)=>{
    const {nom,email,mot_passe}=req.body
    if (nom=="" | email=="" | mot_passe=="" ) {
        res.json('please entre all information')
    }else{
        try{

            const salt=await bcrypt.genSalt(10)
            const hashPassword=await bcrypt.hash(req.body.mot_passe,salt)
            req.body.mot_passe=hashPassword;
            const nuser=await new User(req.body)
            nuser.save()
            res.json(nuser)
        }catch (error){
            res.json(error)
        }
        
    }
})
app.get('/user',async(req,res)=>{
    // const users= User.find().then(resp=>res.json(resp))
    const user=User.find({"_id":"2"}).then(resp=>res.status(200).json(resp)).catch(resp=>res.status(404).json(resp))
    // res.json(users)
})
app.post('/login',async (req,res)=>{
    const {email,mot_passe}=req.body
    if (email=="" | mot_passe=="") {
        res.json('please entre all information')
    } 
    const user=await User.findOne({email:email})
    if (!user) {
        res.json("email errone")
            
    }
   
    if (!(await bcrypt.compare(mot_passe,user.mot_passe))) {
        res.json('password errone');
    }
    res.json("logged in")
})
app.listen(3000,()=>console.log('connected'))

