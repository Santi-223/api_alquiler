const {response} = require('express')


//Importación de los modelos
const Usuario = require('../models/usuario')

//Método GET de la API
const usuarioGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const usuario = await Usuario.find()

    res.json({  //Respuesta en JSON
        usuario
    })   
}

const usuarioPost = async(req, res) => {
    let mensaje = "Inserción exitosa"
    const body = req.body
    try {
        const usuario = new Usuario(body)
        await usuario.save() //Inserta en la colección
    }catch (error) {
        mensaje = error
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const usuarioPut = async(req, res) => {

    const {_id, nombre, password, rol, estado} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Usuario.updateMany({_id: _id}, {$set: {
            nombre: nombre,
            password: password,
            rol: rol,
            estado: estado}});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const usuarioDelete = async (req, res) => {
    const {_id} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.deleteOne({_id: _id})
        mensaje = 'La eliminación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}