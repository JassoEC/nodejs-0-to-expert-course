import http from 'http'
import fs  from 'fs'

const server = http.createServer((req, res) => {
  if(req.url === '/'){
    const file = fs.readFileSync('./public/index.html')
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end(file)
    return;
  }
  
  if(req.url?.includes('js')  ){
    res.writeHead(200,{'Content-Type':'application/javascript'})
  }else if(req.url?.includes('css')){
    res.writeHead(200,{'Content-Type':'text/css'})
  }
  
  const filePath = `./public${req.url}`

  if(fs.existsSync(filePath)){
    const file = fs.readFileSync(`./public${req.url}`,'utf-8')
    res.end(file)

  }
})


server.listen(8080, () => {
  console.log('Server is running on port 8080')
})