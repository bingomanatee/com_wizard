module.exports = {

/* ****** GET ****** */

    on_get_validate: function (rs){
        var self = this;this.on_get_input(rs);
        },

on_get_input: function (rs){
        var self = this;this.models.wizard_state.get_state(function (err, state) {self.on_get_process(rs, state);}, 'wizard_foo', 'beta');
        },

    on_get_process: function (rs){
        var self = this;self.on_get_output(rs,input);
        },

/* ****** POST ****** */

    on_post_validate: function (rs){
        var self = this;this.on_post_input(rs);
        },

    on_post_input: function (rs){
        var self = this;self.on_post_process(rs,rs.req_props);
        },

    on_post_process: function (rs){
        var self = this;self.on_post_output(rs,input);
        },

/* ****** PUT ****** */

/* ****** DELETE ****** */

    a:'a' // last comma
}