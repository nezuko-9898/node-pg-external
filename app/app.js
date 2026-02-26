require('dotenv').config();

const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
   res.send("Node + AWS RDS connected");
});

app.post("/add-user", async (req,res)=>{

   const { name, email } = req.body;

   try {

      const result = await db.query(
        "INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *",
        [name,email]
      );

      res.json(result.rows[0]);

   } catch(err){
      console.log(err);
      res.status(500).send("DB Error");
   }
});

app.listen(process.env.PORT || 3000, ()=>{
   console.log("Server running...");
});