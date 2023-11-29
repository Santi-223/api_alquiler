const {Router} = require('express')

//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {alquilerGet, alquilerPost, alquilerPut, alquilerDelete} = require('../controllers/alquiler')

route.get('/', alquilerGet) //Listar los datos

route.post('/', alquilerPost) //Insertar Datos

route.put('/', alquilerPut) //Modificar los datos

route.delete('/', alquilerDelete) //Eliminar los datos

module.exports = route