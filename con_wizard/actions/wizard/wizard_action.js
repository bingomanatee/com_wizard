var util = require('util')

module.exports = {

    on_validate: function(rs){

        if (!rs.has_content('name')){
            return on_validate_error(rs, 'no name');
        }

        this.on_input(rs);
    },

    on_input: function(rs){
        var self = this;
        this.models.wizard.get_name(rs.req_props.name, function(err, wizard){
            if (err){
                self.on_input_error(rs, err);
            } else if (wizard){
                self.models.wizard_step.find({wizard: wizard._id}).asc('order').exec(function(err, steps){
                    if (err){
                        self.on_input_error(rs, err);
                    } else {
                        self.on_process(rs, wizard, steps);
                    }

                })
            } else {
                self.on_input_error(rs, new Error('cannot find wizard', + rs.req_props._id));
            }
        })
    },

    on_process: function(rs, wizard, steps){
        console.log('wizard: %s, steps: %s', util.inspect(wizard), util.inspect(steps))
        this.on_output(rs, {wizard: wizard, steps: steps});

    }

}