$(document).ready(function(){
  //$('.button-collapse').sideNav({ menuWidth: 300, // Default is 240 edge: 'right', // Choose the horizontal origin closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor });
  $('.materialboxed').materialbox();
  $('ul.tabs').tabs();
  $('.modal-trigger').leanModal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5 , // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    ready: function() { console.log('Ready'); }, // Callback for Modal open
    complete: function() { console.log('Closed'); } // Callback for Modal close
  });
  $(".button-collapse").sideNav();
});
