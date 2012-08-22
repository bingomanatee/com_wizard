var _ = require('underscore');
var util = require('util');
var fs = require('fs');
var path = require('path');
var NE = require('nuby-express');
var validate_admin = require('validate_admin');

/* ***************** CLOSURE ************* */

/* ***************** MODULE *********** */

module.exports = {

    /* *************** GET RESPONSE METHODS ************** */

    on_get_validate:function (rs) {

        var self = this;
        if (!validate_admin(rs, 'get', this)){
            return;
        }

        this.on_get_input(rs);
    },

    on_get_input:function (rs) {
        var self = this;
        this.on_get_process(rs, rs.req_props);
    },

    on_get_process:function (rs, input) {
        var self = this;
        this.on_output(rs, input);
    },

    // note - there is no "on_get_output()' function because on_output is the normal output for get

    _on_get_error_go: true,




 

    a: true
}