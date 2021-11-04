$(document).ready(function(){
    $('.togglepassword').click(function(e){
        e.preventDefault();
        if('password' == $('input[name="password"]').attr('type')){
            $('input[name="password"]').prop('type', 'text');
            $(this).html('<i class="fas fa-eye"></i>');
        }else{
            $('input[name="password"]').prop('type', 'password');
            $(this).html('<i class="fas fa-eye-slash"></i>');
        }
    });
    $('form.form-login input').on('blur', function(){
        if($(this).val() == ''){
            $(this).addClass('warning');
        } else {
            $(this).removeClass('warning');
        }
    })
});