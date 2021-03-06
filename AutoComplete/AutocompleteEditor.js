﻿define([
 'underscore',
 'jquery',
 'backbone',
 'backbone_forms',
 'jqueryui',
], function (
 _, $, Backbone, Form, config
) {
    'use strict';
    return Form.editors.AutocompleteEditor = Form.editors.Base.extend({

        previousValue: '',

        events: {
            'hide': "hasChanged"
        },
        template: '<div><input type="text" id="<%=id%>" value="<%=value%>"/></div>',
        
        initialize: function (options) {
            Form.editors.Base.prototype.initialize.call(this, options);
            this.template = options.template || this.template;
            if (options.schema.options) {
                this.autocompleteSource = options.schema.options;
            }
            this.options = options;
        },
        
          getValue: function() {
           return this.$el.find('#' + this.id ).val() ;
          },

        render: function () {

            
            var $el = _.template(
                this.template, { id: this.id,value:this.options.model.get(this.options.schema.name) 
}            );
            this.setElement($el);
            var _this = this;
            _(function () {
                var optionsJquery = _this.autocompleteSource;
                _this.$el.find('#' + _this.id).autocomplete(optionsJquery);
                _this.$el.find('#' + _this.id).addClass(_this.options.schema.editorClass) ;
                if (_this.options.schema.editorAttrs && _this.options.schema.editorAttrs.disabled) {
                    _this.$el.find('#' + _this.id).prop('disabled', true);
            }
            }).defer();

            return this;
        },

    });
});
