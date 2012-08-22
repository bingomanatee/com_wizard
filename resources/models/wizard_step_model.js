var NE = require('nuby-express');
var mm = NE.deps.support.mongoose_model;
var mongoose = NE.deps.mongoose;
var util = require('util');
var _ = require('underscore');
var ObjectId = mongoose.Schema.Types.ObjectId;

var step_schema = new mongoose.Schema({
    wizard: ObjectId,
    title:String,
    bc_title: String,
    name: String,
    notes: String,
    content_type: {type: String, enum: ['text', 'html', 'json']},
    content: String,
    order: Number
});

var _model = mm.create(
    step_schema,
    {
        name:"wizard_step"
    }
);

module.exports = function () {
    return _model;
}
