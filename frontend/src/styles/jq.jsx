
import $ from 'jquery';

$('.btnb').click( function(){
    $(this).toggleClass('active');
    $('.box').toggleClass('open');
})

$('.log').click( function(){
    $(this).toggleClass('nactive');
    $('.box').toggleClass('close');
})

