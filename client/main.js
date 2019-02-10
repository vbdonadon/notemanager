import { Template } from 'meteor/templating';
import { Notes } from '../imports/api.js';
import '../imports/startup/accounts-config.js';


import './main.html';
import { Meteor } from 'meteor/meteor';

// Know How : Criar link que direciona ao site do meteor com o tutorial


Template.body.helpers({
  notes(){
    return Notes.find({});
  }
});

Template.note.events({
  'click .close': function(){
    Meteor.call('note.remove', this);
  }
});

Template.add.events({
  'submit .form-group': function AddMethod(){
    event.preventDefault();
    // Get input value;
    let target = event.target;
    let text = target.text.value;

    // Insert note into collection
    Meteor.call('notes.insert', text);

    // Clear form
    target.text.value = '';
  },
})