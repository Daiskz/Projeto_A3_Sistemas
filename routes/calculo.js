import express from "express";

const routes = express.Router();

routes.post("/imc", async (req, res) => {
    var altura = req.body.altura;
    var peso = req.body.peso;
    var idade = req.body.idade;
    var genero = req.body.genero;
    var imc = Math.round(peso/(Math.pow(altura, 2)));

    let calorias
    let resultado
    let caloriasFinal
    
    switch(genero){
        case "masculino":
            calorias = 66.5+(5*(altura*100))+(13.8*peso)-(6.8*idade)
            caloriasFinal = calorias+(calorias*(20/100))
            resultado = {
                manterPeso: caloriasFinal+" kcal/d",
                ganharPeso: caloriasFinal+500+" kcal/d",
                perderPeso: caloriasFinal-500+" kcal/d"
            }
            break
        case "feminino": 
            calorias = 655.1+(1.8*(altura*100))+(9.5*peso)-(4.7*idade)
            caloriasFinal = calorias+(calorias*(20/100))
            resultado = {
                manterPeso: caloriasFinal+" kcal/d",
                ganharPeso: caloriasFinal+500+" kcal/d",
                perderPeso: caloriasFinal-500+" kcal/d"
            }
            break
        default:
            resultado = {
                erro: "Por favor, insira seu genero"
            }
            break
    }

    if(imc<16.9){
        return res.json({
            message: "Muito abaixo do peso",
            resultado,
            imc
        })
    }
    if(imc>16.9&&imc<=18.4){
        return res.json({
            message: "Abaixo do peso",
            resultado,
            imc
        })
    }
    if(imc>=18.5&&imc<=24.9){
        return res.json({
            message: "Peso normal",
            resultado,
            imc
        })
    }
    if(imc>=25&&imc<=29.9){
        return res.json({
            message: "Acima do peso",
            resultado,
            imc
        })
    }
    if(imc>=30&&imc<=34.9){
        return res.json({
            message: "Obesidade grau I",
            resultado,
            imc
        })
    }
    if(imc>=35&&imc<=40){
        return res.json({
            message: "Obesidade grau II",
            resultado,
            imc
        })
    }
    if(imc>40){
        return res.json({
            message: "Obesidade grau III",
            resultado,
            imc
        })
    }
})

export default routes;