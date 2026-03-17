import http from "http";
import os from "os";

let body ="";
let data =[];
const server = http.createServer((req,res)=>{
    const url = req.url;
    
    const data = {
        name:"xyz",
        rollno:"12"
    }
    if(url == "/"){
        res.write("Home page");
    }
    else if(url == "/about" && req.method=="GET"){
        res.write("about page");
    }
      else if(url == "/senddata" && req.method=="POST"){
             
              req.on("data",(chunk)=>{
                  body = body + chunk;
              })
              req.on("end",()=>{
                console.log(body,"data recieved")
                data.push(body)
                res.end(body+"data recieved")
              })
    }
      else if(url == "/viewdata" && req.method=="GET"){
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(data));
    }
      else if(url == "/system" && req.method=="GET"){
        const systemdata ={
            platform:os.platform(),
            Arch:os.arch(),
            cpu:os.cpus().length,
            totalRam:(os.totalmem()/1024**3).toFixed(2),
            freemem:(os.freemem()/1024**3).toFixed(2)
        }
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(systemdata));
    }
     else if(url == "/data"){
        
        res.write(JSON.stringify(data));
    }
    else{
        res.statusCode=404;
        res.end("page not found");
    }
    res.end()
})

server.listen(3000,()=>{
    console.log("server is running")
});