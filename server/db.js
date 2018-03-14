// const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.uri);


// const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = attributes;

    /*
      attrs._id = {
      type: mongoose.Schema.Types.ObjectId,
      };
    */
    attrs.createdAt = {
        type: Date,
        default: Date.now
    };
    attrs.updatedAt = {
        type: Date,
        default: Date.now
    };
    attrs.version = {
        type: Number,
        default: 0
    };
    let schema = new mongoose.Schema(attrs);
    schema.pre('save', function(next){
        if(this.isNew){
            this.createdAt = this.updatedAt = Date.now();
            this.version = 0;
        }
        else{
            this.updatedAt = Date.now();
            this.version = this.version + 1;
        }
        next();
    });
    return mongoose.model(name, schema);
}

var exp = {
    defineModel: defineModel,
    /*
      sync: () => {
      if( process.env.NODE_ENV !== 'production'){
      return sequelize.sync({force:true});
      }
      else{
      throw new Error('canoot sync() when node_env is set to "production"');
      }
      }
    */
};

// exp.sequelize = sequelize;

module.exports = exp;

