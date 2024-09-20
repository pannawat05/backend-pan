const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   user:process.env.MYSQLUSER,
   host:process.env.MYSQLHOST,
   password:process.env.MYSQLPASSWORD,
   database:process.env.MYSQLDATABASE

})
app.get('/student',(req,res) =>{
    db.query("SELECT * FROM react",(err,result) =>{
    if(err){
        console.log(err);
    }
    else{
        res.send(result);
    }
});
});
app.post('/create',(req,res) => {
 const email = req.body.email;
 const name = req.body.name;
 db.query("INSERT INTO react (email,name) VALUES (?,?)",
 [email,name],
 (err,result) => {
    if(err){
        console.log(err);
    }else{
        res.send("value send");
    }
 }
 )
})
app.put("/update", (req, res) => {
    const id = req.body.id;
    const  email = req.body.email;
    db.query(
      "UPDATE react SET email = ? WHERE id = ?",
      [email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM react WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
