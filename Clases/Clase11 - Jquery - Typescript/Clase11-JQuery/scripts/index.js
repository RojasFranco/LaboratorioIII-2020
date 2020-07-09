$(function(){

    $("#btnOcultar").on("click", function(){
        $("p").css("background-color","red");
        $("p").toggle(3000);
    })




    $("#btnFade").click(function(){
        $("p").fadeToggle(5000);
    })

    $("#btnSlide").click(function(){
        $("p").slideToggle();
    })
})