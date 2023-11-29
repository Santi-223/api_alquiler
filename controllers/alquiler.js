const { response } = require('express')


//Importación de los modelos
const Alquiler = require('../models/alquiler')

//Método GET de la API
const alquilerGet = async (req, res = response) => {
    const { numero, cantidadDias } = req.query;

    try {
        let alquiler;

        if (numero && cantidadDias) {
            alquiler = await Alquiler.find({ numero: numero, cantidadDias: cantidadDias });
        } else if (numero) {
            alquiler = await Alquiler.find({ numero: numero });
        } else if (cantidadDias) {
            alquiler = await Alquiler.find({ cantidadDias: cantidadDias });
        } else {
            alquiler = await Alquiler.find();
        }

        res.json({ alquiler });

    } catch (error) {
        console.error('Error al buscar alquiler:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


const alquilerPost = async (req, res) => {
    let mensaje = "Inserción exitosa"
    const body = req.body
    try {
        const alquiler = new Alquiler(body)
        await alquiler.save() //Inserta en la colección
    } catch (error) {
        mensaje = error
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const alquilerPut = async (req, res) => {

    const { numero, nombreFinca, direccion, valorAlquiler, cantidadDias } = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Alquiler.updateMany({ numero: numero }, {
            $set: {
                nombreFinca: nombreFinca,
                direccion: direccion,
                valorAlquiler: valorAlquiler,
                cantidadDias: cantidadDias
            }
        });

    } catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const alquilerDelete = async (req, res) => {
    const { numero } = req.body
    let mensaje = ''

    try {
        const alquiler = await Alquiler.deleteOne({ numero: numero })
        mensaje = 'La eliminación se efectuó exitosamente'
    }
    catch (error) {
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    alquilerGet,
    alquilerPost,
    alquilerPut,
    alquilerDelete
}