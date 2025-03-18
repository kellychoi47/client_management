const express=require("express");
const cors=require("cors");
const {Pool}=require("pg");
const bodyParser=require("body-parser");

const app=express();
const port=process.env.PORT || 3006;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

require("dotenv").config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    max: 10
});

pool.on("connect", () => {
    console.log("Connected to client_master Database Successfully!");
});

app.listen(port, () => {
    console.log(`Server is running successfully on port: ${port}`);
});

// GET all clients
app.get("/client",(req,res)=>{
    const sql="SELECT * FROM client";
    pool.query(sql,(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result.rows);
    });
});

// GET a client by ID
app.get("/client/:clientid", (req,res)=>{
    const clientId=Number(req.params.clientid);
    const sql="SELECT * FROM client WHERE clientid=$1"; 
    pool.query (sql, [clientId],(err,result) =>{
        if(err) return res.json(err);
        return res.status(200).json(result.rows[0]);
    });
});

// CREATE a new client
app.post("/client",(req,res)=>{ 
    const {company_name,contact_name,email}=req.body;
    const sql="INSERT INTO client(company_name,contact_name,email) VALUES($1,$2,$3) RETURNING *"; 
    pool.query(sql,[company_name,contact_name,email],(err,result)=>{
        if(err) return res. json(err);
        return res.status (201).json (result.rows);
    });
});

// UPDATE a client
app.patch("/client/:clientid", (req,res)=>{
    const clientId=Number(req.params.clientid); 
    const {company_name, contact_name, email}=req.body
    const sql="UPDATE client SET company_name=$1,contact_name=$2, email=$3 WHERE clientid=$4 RETURNING *";
    pool.query (sql, [company_name, contact_name, email, clientId], (err, result) =>{
        if(err) return res.json(err);
        return res.status (200).send(`client is Updated successfully for clientid: ${clientId}`);
    });
});

// DELETE a client
app.delete("/client/:clientid", (req,res) =>{
    const clientId=Number (req.params. clientid); 
    const sql="DELETE FROM client WHERE clientid=$1 RETURNING *";
    pool.query (sql, [clientId], (err,result)=>{
        if(err) return res.json(err);
        return res.status (200).send(`client is Deleted successfully for clientid: ${clientId}`)
    });
});
