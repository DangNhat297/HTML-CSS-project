$(document).ready(function(){
    $('.ontop').click(function(){
        $('html,body').animate({scrollTop: 0});
    });
    $('.showfilm').hide();
    $('button.playfilm').click(function(){
        $('.showfilm').slideDown('slow');
        $(this).slideUp();
        $(document).on('click','ul.episode__picker li', function(){
            $('ul.episode__picker li').removeClass("active");
            $(this).addClass("active");
            var data = $(this).find('a').data("episode");
            $("#player iframe").attr("src" , "https://www.recentstatus.com/gd/?id=" + data);
            return false;
        });
        $('ul.episode__picker li:first-child a').trigger('click');
    });
    
});