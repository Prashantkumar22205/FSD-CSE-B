import http from "http"
import os from "os"

let userdata = [];
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url == "/" && method == "GET"){
        res.end("Home page")
    }
    else if(url == "/contact" && method == "GET"){
        res.end("Contact page");
    }
    else if(url == "/system" && method == "GET"){
        const sysdata = {
            platform:os.platform(),
            architecture:os.arch(),
            cpu_length:os.cpus().length,
            TotalMemmory:(os.totalmem())/1024**3,
            FreeMemmory:(os.freemem())/1024**3,
        }
        res.write("system info");
        res.end(JSON.stringify(sysdata));
    }
    else if(url == "/senddata" && method=="POST"){
            let body=""
        req.on("data",(chunk)=>{
             body += chunk;
        })
        req.on("end",()=>{
            console.log(body,"Data send successfully")
            userdata.push(body);
            res.end(JSON.stringify(body))
        })
    }
    else if(url=="/viewdata" && method=="GET"){
          res.setHeader("Content-Type","application/json")
          res.end(JSON.stringify(userdata))
    }
    else{
        res.statusCode=404;
        res.end("page is not found")
    }

})

server.listen(3000,()=>{
    console.log("server is running")
})