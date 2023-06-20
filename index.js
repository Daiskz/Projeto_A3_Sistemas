import express from "express";

import pool from "./pool.js";
import routeAlimento from "./routes/alimento.js";
import routetiposAlimento from "./routes/tiposalimento.js"
import routeCalculo from "./routes/calculo.js"

const app = express();
app.use(express.json());
app.use(routeAlimento);
app.use(routetiposAlimento);
app.use(routeCalculo);

const port = 3000;

app.listen(port, () => {
    console.log("Servidor está ativo na porta", port);
});