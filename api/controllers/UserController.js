var rabbitmq = require('sails-rabbitmq');
function UserController() {
    return {
        /*test: function (req, res) {
            var geolocation = Geolocation.create({deviceid: 1, type: 'driver', location: [10,11,12]}).exec(function(err, geolocation) {
               console.log(geolocation);

               rabbitmq.create(geolocation, function() {
                    console.log("coucou");
               });

            } );
        },*/

        drivers: function(req, res) {
            User.find({type:'driver'}).exec(function(err, found) {
                res.json(found);
            });
        },

        technicians: function(req, res) {
            User.find({type:'technician'}).exec(function(err, found) {
                res.json(found);
            });
        },

        updatePosition: function(req, res) {
            console.log('location= '+req.param('location'));
            User.update({id: req.param('id')}, {location: req.param('location')}).exec(function(err, updated) {
                console.log(err);
                return res.json(null);
            });
        },

        updateStatus: function(req, res) {
            var that = this;
            User.update({id: req.param('id')}, {status: req.param('status')}).exec(function(err, updated) {
                if(req.param('status')) {
                  that.findClosestTechnician(req, res);
                } else {
                  return res.json(null);
                }
            });
        },

        findClosestTechnician: function(req, res) {
            var xA = req.param('location')[0];
            var yA =  req.param('location')[0];

            User.find({type:'technician'}).exec(function(err, techs) {
                var closest ;
                var tech;
                for (var i = techs.length - 1; i >= 0; i--) {
                  var xB = techs[i].location[0];
                  var yB = techs[i].location[1];

                  var distance = Math.sqrt((xB - xA)^2+(yB - yA)^2);

                  if(!closest  || distance < closest) {
                      closest = distance;
                      tech = techs[i];
                  }
              };

                res.json(tech);

            });

        }


    }
};

module.exports = UserController();
