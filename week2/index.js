// creating a new http server using express

 const express = require('express') ;

const app = express();
const port = 3000;

const sum =(num)=>{
let ans = 0;
for (let i = 0; i<num; i++) ans += i;
return ans;
}

app.get('/', (req, res) => {
    const query = parseInt(req.query.num);
    if (isNaN(query) || query < 0) {
      return res.sendStatus(400); 
    }
    const result = sum(query);
    res.send(result.toString()); 

});


app.listen(port);
