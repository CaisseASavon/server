// api/models/User
module.exports = {
    connection:  [ /*'rabbitCluster',*/ 'mongoServer'],
   // routingKey: [ 'geolocation' ],
    attributes: {
        type:{
            type: 'string',
            enum: ['driver','technician'],
            defaultsTo: 'driver'
        },
        location:{
            type:'array'
        },
        status:{
            type:'boolean',
            defaultsTo: false,
        }
    }
}
