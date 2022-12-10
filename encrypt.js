const bcrypt = require('bcrypt')

const salt = 'papa'

bcrypt.hash('3104_writer',salt,function(err,hash){
        console.log(hash)
    })

bcrypt.hash('3104_writer',salt,function(err,hash){
        console.log(hash)
    })


bcrypt.compare('3104_writer',"$2b$10$x8nyf0HJE7lAdpetn2ofQ.yjN6fqne0MbNeZ3BXL7FRjiAwXobKUO",function(err,result){
    if(result){
        console.log('fine')
    }
})