var _ = require('underscore');
var util = require('util');
var fs = require('fs');
var path = require('path');
var NE = require('nuby-express');
var validate_admin = require('validate_admin');

/**
 * Note - this template was designed with the mongoose_model class API in mind.
 *
 * Given that Nuby-Express does not mandate any particular repository there is no
 * way to get in front of any and all APIS you might want to use, so you should
 * take care to modify the model's API calls to meet the needs of your backend.
 *
 * Specifically, "Put" (update) is a surgical operation requiring attention to what you can update.
 *
 */
/* ***************** CLOSURE ************* */

/* ***************** MODULE *********** */

/**
 *
 * Security note - there is no security on these REST methods as written here.
 * Add checks in the validate methods to limit access to your data.
 *
 * Remember an unsecured REST system is a wide open orifice into your entire database!
 *
 */
module.exports = {

    model: function(){
        return this.models['wizard'];
    },

    /* *************** GET RESPONSE METHODS ************** */

    on_get_validate:function (rs) {

        var self = this;
        if (!validate_admin(rs, 'get', this)){
            return;
        }

        if (rs.req_props._id){
            this.on_get_one_validate(rs);
        } else {
            this.on_get_input(rs);
        }
    },

    on_get_input:function (rs) {
        var self = this;
        this.on_get_process(rs, rs.req_props);
    },

    on_get_process:function (rs, input) {
        var self = this;
/**
 * Note - the fetch method will most likely require alteration,
 * to accommodate pagination,
 * limit field access, etc.
 */
        this.model().all(function(err, items){
            if (err){
                self.on_get_error(rs, err);
            } else {
                rs.send(items);
            }
        })
    },

    on_get_one_validate: function(rs){
        var self = this;
        this.on_get_one_input(rs);
    },

    on_get_one_input: function(rs){
        var self = this;
        this.model().get(rs.req_props._id, function(err, item){
            if(err){
                self.on_get_error(rs, err);
            } else {
                self.on_get_one_process(rs, item);
            }

        })
    },

    on_get_one_process: function(rs, item){
        var self = this;
        rs.send(item.toJSON ? item.toJSON : item);
        // self.on_get_one_output(rs, item);
    },

    /**
     * REST actions typically do NOT have output methods -
     * sending raw obects out through rs.send is usually sufficient.
     */

    _on_get_error_go: true,



    /* *************** POST RESPONSE METHODS ************** */

    on_post_validate:function (rs) {

        var self = this;
        if (!validate_admin(rs, 'post', this)){
            return;
        }

        var self = this;
        this.on_post_input(rs);
    },

    on_post_input:function (rs) {
        var self = this;
        this.on_post_process(rs, rs.req_props);
    },

    on_post_process:function (rs, input) {
        var self = this;
        this.model().add(input, function(err, output){
            if (err){
                self.emit('process_error',rs, err);
            } else {
                rs.send(output);
            }

        })
    },

    _on_post_error_go: true,

    /* *************** PUT RESPONSE METHODS ************** */

    on_put_validate:function(rs) {

        var self = this;
        if (!validate_admin(rs, 'put', this)){
            return;
        }

        var self = this;
        this.on_put_input(rs);
    },

    on_put_input:function(rs) {
        var self = this;

        this.on_put_process(rs, rs.req_props);
        },

    on_put_process:function (rs, item) {
        var self = this;

        this.model().revise(item, function(err, result){
        rs.send(result.toJSON());
        })
    },

    _on_put_error_go: true,
 
    /* *************** DELETE RESPONSE METHODS ************** */

    on_delete_validate:function (rs) {

        var self = this;
        if (!validate_admin(rs, 'delete', this)){
            return;
        }

        var self = this;
        this.on_delete_input(rs);
    },

    on_delete_input:function (rs) {
        var self = this;
        this.on_delete_process(rs, rs.req_props);
    },

    on_delete_process:function (rs, input) {
        var self = this;
        this.model().delete(rs.req_props._id, function(err, deleted){
            if (deleted){
                rs.send(deleted);
            } else {
                rs.send({_id: rs.req_props._id, deleted: true});
            }
        })
    },

     _on_delete_error_go: true
}