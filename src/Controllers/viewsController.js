import fs from 'fs'
import config from '../Configs/config.js';

export class viewsController {


homeView = (req,res) => {
    res.render("home",{title: "Home", style :"home.css"})
}

realTimeProductView = (req, res) => {
    const productsData = JSON.parse(fs.readFileSync(`${config.DIRNAME}/Mocks/productos.json`, 'utf8'));
    res.render('realTimeProducts', { title: "RealTimePRoducts", products: productsData, style :"home.css" });
}

}



