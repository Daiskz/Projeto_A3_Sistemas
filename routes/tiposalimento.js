import express from "express";
import pool from "../pool.js";

const routes = express.Router();

routes.get("/tiposalimento", (req, res, error) => {
    const sql = "SELECT * FROM tiposAlimento";
    pool.query(sql, (error, results, fields) => {
        MensagensDatabase(error, results, res);
    });
});

routes.get("/tiposalimento/:id", (req, res, error) => {
    const sql = "SELECT * FROM tiposalimento WHERE tiposalimento.id_tipoAlimento=?"
    const id_tipoAlimento = req.params.id;
    pool.query(sql, [id_tipoAlimento], (error, results, fields) => {
        if(!error){
            if(results.length <= 0) {
                res.status(404).json({msg: "tipo de alimento não encontrado"})
            } else {
                res.status(200).json(results);
            }
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    });
});

routes.get("/tiposalimento/nome/:nome", (req, res, error) => {
    const sql = "SELECT * FROM tiposalimento WHERE tiposalimento.nome=?"
    const nome = req.params.nome;
    pool.query(sql, [nome], (error, results, fields) => {
        MensagensDatabase(error, results, res);
    })
})

routes.post("/tiposalimento", (req, res, error) => {
    const sql = "INSERT INTO tiposalimento( id_tipoAlimento, nome )" + "VALUES (?,?)"
    const {id_tipoAlimento, nome} = req.body;
    pool.query(sql, [id_tipoAlimento, nome], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            console.log(error)
            res.status(404).json({msg: error});
        }
    });
});

routes.put("/tiposalimento/id/:id", (req, res, error) => {
    const sql = "UPDATE tiposalimento SET nome=? WHERE id_tipoAlimento=?"
    const id_tipoAlimento = req.params.id;
    const {nome} = req.body;
    pool.query(sql, [nome, id_tipoAlimento], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            console.log(error)
            res.status(404).json({msg: error});
        }
    });
});

routes.delete("/tiposalimento/:id", (req, res, error) => {
    const sql = "DELETE FROM tiposalimento WHERE id_tipoAlimento=?"
    const id_tipoAlimento = req.params.id;
    pool.query(sql, [id_tipoAlimento], (error, results, fields) => {
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