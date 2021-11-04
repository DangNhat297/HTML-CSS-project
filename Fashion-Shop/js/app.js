$(document).ready(function(){
    $('.form-search').hide();
    $('.icon-search').click(function(){
        $('.form-search').slideToggle("slow");
    });
    $('.close-form').click(function(){
        $('.form-search').slideUp("slow");
    });
    // setInterval(function (){
    //     var now = new Date();
    //     var hour = now.getHours();
    //     var minute = now.getMinutes();
    //     var second = now.getSeconds();
    //     if(hour < 10) hour = '0' + hour;
    //     if(minute < 10) minute = '0' + minute;
    //     if(second < 10) second = '0' + second;
    //     $('.time.hour').text(hour)
    //     $('.time.minute').text(minute);
    //     $('.time.second').text(second);
    // }, 1000);
    function quantityProduct(){
        $('.btn-quantity.sub').click(function(){
            var input = parseInt($('input.btn-quantity').val());
            $('input.btn-quantity').val(input-1);
            if(input <= 1) $('input.btn-quantity').val(1);
        });
        $('.btn-quantity.add').click(function(){
            var input = parseInt($('input.btn-quantity').val());
            $('input.btn-quantity').val(input+1);
        });
    }
    quantityProduct();
    function cartQuantity(){
        $('.cart-quantity__button.sub').click(function(){
            var input = parseInt($(this).next().val());
            $(this).next().val(input-1);
            if(input <= 1) $(this).next().val(1);
        });
        $('.cart-quantity__button.add').click(function(){
            var input = parseInt($(this).prev().val());
            $(this).prev().val(input+1);
        });
    }
    cartQuantity()
    $('.category-search').find('input').keyup(function(){
        var _this = $(this);
        $('.category-list__item').each(function(index, value){
            if($(value).text().toLowerCase().trim().includes($(_this).val().toLowerCase().trim())){
                $(value).show();
            } else {
                $(value).hide();
            }
        });
    });
    function shareSocial(){
        var currentLocation = window.location;
        $('.facebook').find('a').attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + currentLocation);
        $('.twitter').find('a').attr("href", "https://twitter.com/share?url=" + currentLocation);
        $('.pinterest').find('a').attr("href", "https://pinterest.com/pin/create/link/?url=" + currentLocation);
        $('.messenger').find('a').click(function(){
            var dummy = document.createElement('input'),
            text = window.location.href;
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            $(this).parent().after('<span>Đã sao chép url vào bộ nhớ tạm!</span>');
            setTimeout(function(){
                $('.messenger').find('a').parent().next().fadeOut(300, function(){
                    $(this).remove();
                });
            },2000);
            return false;
        });
    }
    shareSocial();
    $('.social_share').find('li:not(:last-child)').find('a').click(function(){
        window.open(this.href);
        return false;
    });
    $('.togglepass').click(function(){
        $(this).toggleClass('show');
        if($(this).hasClass('show')){
            $(this).prev().attr('type','text');
        } else {
            $(this).prev().attr('type','password');
        }
    });
    $('.product-button button:first-child').click(function(){
        return false;
    });
    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.label-file-custom').html('<i class="fas fa-file-upload"></i> ' + fileName);
    }); 
    $('.output-image').hide();
    // $('.range').css('background-size', $('.range').val() + '%');
    // $('.range').mousemove(function(){
    //     var rangeValue = $('.range').val();
    //     $('.range').css('background-size', rangeValue + '%');
    // });
    $('#price_range').slider({
        range:true,
        min:1000,
        max:65000,
        values:[1000, 65000],
        step:500,
        stop:function(event, ui)
        {
            $('#price_show').html(ui.values[0] + '-' + ui.values[1]);
            $('#hidden_minimum_price').val(ui.values[0]);
            $('#hidden_maximum_price').val(ui.values[1]);
        }
    });
    $('.filter-category-search').find('input').keyup(function(){
        var _this = $(this);
        $('.filter-category__item label').each(function(index, value){
            if($(value).text().toLowerCase().trim().includes($(_this).val().toLowerCase().trim())){
                $(value).parent().show();
            } else {
                $(value).parent().hide();
            }
        });
    });
    
});
function loadFile(event){
    $('.output-image').show();
    $('.output-image').attr('src', URL.createObjectURL(event.target.files[0]));
}
