import express from "express";
import pool from "../pool.js";

const routes = express.Router();

routes.get("/alimento", (req, res, error) => {
    const sql = "SELECT * FROM alimento";
    pool.query(sql, (error, results, fields) => {
        MensagensDatabase(error, results, res);
    });
});

routes.get("/alimento/:id", (req, res, error) => {
    const sql = "SELECT * FROM alimento WHERE alimento.id_alimento=?"
    const id_alimento = req.params.id;
    pool.query(sql, [id_alimento], (error, results, fields) => {
        if(!error){
            if(results.length <= 0) {
                res.status(404).json({msg: "alimento não encontrado"})
            } else {
                res.status(200).json(results);
            }
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    });
});

routes.get("/alimento/nome/:nome", (req, res, error) => {
    const sql = "SELECT * FROM alimento WHERE alimento.nome=?"
    const nome = req.params.nome;
    pool.query(sql, [nome], (error, results, fields) => {
        MensagensDatabase(error, results, res);
    })
})

routes.post("/alimento", (req, res, error) => {
    const sql = "INSERT INTO alimento( id_tipoAlimento, nome, quantidade, calorias )" + "VALUES (?,?,?,?)"
    const {id_tipoAlimento, nome, quantidade, calorias} = req.body;
    pool.query(sql, [id_tipoAlimento, nome, quantidade, calorias], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            console.log(error)
            res.status(404).json({msg: error});
        }
    });
});

routes.put("/alimento/id/:id", (req, res, error) => {
    const sql = "UPDATE alimento SET id_tipoAlimento=?, nome=?, quantidade=?, calorias=? WHERE id_alimento=?"
    const {id_tipoAlimento, nome, quantidade, calorias} = req.body;
    const id_alimento = req.params.id;
    pool.query(sql, [id_tipoAlimento, nome, quantidade, calorias, id_alimento], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            console.log(error)
            res.status(404).json({msg: error});
        }
    });
});

routes.delete("/alimento/:id", (req, res, error) => {
    const sql = "DELETE FROM alimento WHERE id_alimento=?"
    const id_alimento = req.params.id;
    pool.query(sql, [id_alimento], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            console.log(error)
            res.status(404).json({msg: error});
        }
    });
});

function MensagensDatabase(error, results, res) {
    if (results.length > 0) {
      if (!error) {
        res.status(200).json(results);
      } else {
        console.log(error);
        res.status(404).json({ msg: error });
      }
    } else {
      res.status(404).json({ msg: "sem dados" });
    }
 }

export default routes;