
import $ from 'jquery';

$('.btnb').click( function(){
    $(this).toggleClass('active');
    $('.box').toggleClass('open');
});

