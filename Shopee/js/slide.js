// var i = 1;
// var slideLength = document.getElementsByTagName("slide").length;
// setInterval(function(){
//     console.log(i);
//     var slide = document.querySelector("#slide" + i);
//     slide.checked = true;
//     i++;
//     if(i > slideLength) i = 1;
// },2000);
$(document).ready(function(){
    function slideAds(){
        var i = 0;
        var slideLength = $("input[name='slide']").length;
        $("input[name='slide']").change(function(){
            if($(this).is(":checked")){
            i = $(this).index();
            }
        }); 
        setInterval(function(){     
            var slide = $("input[name='slide']").eq(i);
            slide.click();
            i++;
            if(i > slideLength-1) i = 0;
        },3000);
    }
    function slideMall(){
        var j = 0;
        var slideLength = $("input[name='slidemall']").length;
        $("input[name='slidemall']").change(function(){
            if($(this).is(":checked")){
             j= $(this).index();
            }
        }); 
        setInterval(function(){     
            var slide = $("input[name='slidemall']").eq(j);
            slide.click();
            j++;
            if(j > slideLength-1) j = 0;
        },3000);
    }
    slideAds();
    slideMall();
});