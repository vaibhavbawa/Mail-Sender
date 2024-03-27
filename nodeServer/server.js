const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cors = require('cors');
app.use(cors());

const nodeMailer = require('nodemailer')

let msg = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:'vaibhavbawa1998@gmail.com',
        pass:'ncif riil pgtc fzpn'
    }
})

app.post('/send-email',async (req,res)=>{
try {
        const {email,URL} = req.body;
        console.log("entered Email",email);
        console.log("url",URL)
        if(!email){
            return res.status(400).json({masassge:"email is required"});
        }
        let mailOptions = {
            form:"vaibhavbawa1998@gmail.com",
            to:email,
            subject:"invited",
            text:`Hello your invided to join realtime text editor plases click or copy past follorwing url into your browser ${URL}`
        }
        msg.sendMail(mailOptions,function(error,info){
            if(error){
               console.log(error)
               return res.status(400).json({masassge:error.message,status:'ERROR'});

            }else{
                console.log("emailSend",info.response);
                
                return res.status(200).json({masassge:"email send successfully"});
            }

        })
} catch (error) {
    console.log(error);
    res.status(500).json({masassge:error});
}
})
// importont password
// yrqv pujs diuk hles

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
