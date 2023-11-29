const {Schema, model} = require('mongoose')

const alquilerSchema = Schema({

    numero: {
        type: Number,
        unique: true,
        required: [true, 'El numero del alquiler es obligatorio']
    },

    nombreFinca: {
        type: String,
        required: [true, 'El nombre del alquiler es obligatorio']
    },

    direccion: {
        type: String,
        required: [true, 'La dirección del cliente es obligatoria'],

    },

    valorAlquiler: {
        type: Number,
        required: [true, 'El valor del alquiler es obligatorio']
    },

    cantidadDias: {
        type: Number,
        default: false,
        required: [true, 'La cantidad de dias del alquiler es obligatoria']
    },
})

//Exportar la función UsuarioSchema
module.exports = model('alquilerFincas',alquilerSchema)