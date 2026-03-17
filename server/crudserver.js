import http from "http";
const port = 5001;
const users=[
    {
        id:1,
        name:"ABC",
        email:"abc@gmail.com"
    },
    {
        id:2,
        name:"DEF",
        email:"def@gmail.com"
    },
    {
        id:3,
        name:"GHI",
        email:"ghi@gmail.com"
    }
]

const server = http.createServer((req,res)=>{
     const url = req.url;
     const method = req.method;

     if(url == "/users" && method =="GET" ){
        res.end(JSON.stringify(users));
     }
     else if(url.startsWith("/users/") && method =="GET"){
        const id =url.split("/")[2];
        const user = users.find(u=> u.id == id);

        if(!user){
            res.statusCode=400;
           return res.end(`user id ${id} not found`)
        }

        res.end(JSON.stringify(user))
     }
     else if(url.startsWith("/users/") && method =="PUT"){
          const id = url.split("/")[2];
          let body ="";
          req.on("data",(chunk)=>{
            body = body+chunk;
          })
          req.on("end",()=>{
              const userIndex= users.find(u => u.id == id);
              if(userIndex == -1){
                res.statusCode=400;
                return   res.end(`user id is invalid`);
              }

              const upatedata = JSON.parse(body);
              users[userIndex] = {...users[userIndex],...upatedata};
              res.end(`user id ${id} updated successfully`);
          })

       
     }
     else if(url.startsWith("/users/") && method =="DELETE"){
            const id =url.split("/")[2];
            const indexdata = users.find(u=>u.id==id);
            if(indexdata == -1){
                res.statusCode=400;
                return res.end(`user id is not found`)
            }

            users.splice(indexdata,1);

            
       return res.end(`user is deleted successfully`)
     }
     else if(url == "/createuser" && method =="POST"){
        let body ="";
        res.on("data",(chunk)=>{
            body = body+chunk;
        })
        res.on("end",()=>{
            const data = JSON.parse(body);
            const newUser={
                id:Date.on(),
                name:data.name,
                email:data.email
            }

            if(data.name == null && data.email == null){
                res.statusCode=400;
             return  res.end("name or email is empty");
            }

            users.push(newUser);
            res.statusCode=201;
            res.end(`user id ${newUser} created successfully`)
        })
     }
     else{
        res.statusCode=404;
        res.end("error page")
     }


})

server.listen(port,()=>{
     console.log("Server is running")
})