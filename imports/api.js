import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'(text){
        check(text, String);

        // Check if the user is logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('Not-authorized')
        }

        Notes.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'note.remove'(note){
        check(note._id, String);
        if(note.owner !== Meteor.userId()){
            throw new Meteor.Error('You can delete only your notes')
        } else {
            Notes.remove(note._id);
        }
    }
});
