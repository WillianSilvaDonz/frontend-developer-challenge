$(document).ready(function(){
    
    var carregarProdutos = function(url){
        if(!url){
            url = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
        }
        console.log(url);
        $.ajax({
            url: url,
            method: "GET",
            success: function(result){
                if(result.products.length > 0){
                    var html = '';
                    result.products.map(function( item ){
                        html += '<div class="card">';
                        html += '<img src="https:'+item.image+'" alt="'+item.name+'" />';
                        html += '<div class="title text-gray text-left"><h4>'+item.name+'</h4></div>';
                        html += '<div class="description text-gray text-left"><p>'+item.description+'</p></div>';
                        html += '<div class="price"><p class="price-before text-gray text-left">De: R$ '+formatNumber(item.oldPrice)+'</p><p class="price-after text-gray text-left">Por: R$ '+formatNumber(item.price)+'</p><p class="price-portion text-gray text-left">ou '+item.installments.count+'x de R$ '+formatNumber(item.installments.value)+'</p></div><div class="footer-card"><button class="btn btn-comprar text-gray">Comprar</button></div>';
                        html += '</div>';

                        $("#body-container .cards").append(html);
                        html = '';
                    });
                    console.log(result);
                    $('#add-product-plus').attr('data-url', 'https://'+result.nextPage);
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    carregarProdutos("");

    $("#add-product-plus").on('click', function(){
        $("#body-container .cards").html("");
        var url = $('#add-product-plus').attr('data-url');
        console.log('seila: '+url);
        carregarProdutos(url);
    });

    $("#input-email").on('change', function(){
        validacaoEmail($("#input-email").val());
    });

    $("#enviar-newletter").on('click', function(){
        validacaoEmail($("#input-email").val());
        return false;
    });
});

function validacaoEmail(field) {
    usuario = field.substring(0, field.indexOf("@"));
    dominio = field.substring(field.indexOf("@")+ 1, field.length);
     
    if ((usuario.length >=1) &&
        (dominio.length >=3) && 
        (usuario.search("@")==-1) && 
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) && 
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&      
        (dominio.indexOf(".") >=1)&& 
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        //document.getElementById("msgemail").innerHTML="E-mail válido";
        $("#msgemail").html("");
        $("#enviar-newletter").removeAttr('disabled');
    }
    else{
        $("#msgemail").html("<font color='red'>E-mail inválido </font>");
        $("#enviar-newletter").attr('disabled', 'disabled');
        //alert("E-mail invalido");
    }
}

function formatNumber(value) {
    value = convertToFloatNumber(value);
    return value.formatMoney(2, ',', '.');
}

 //transforma a entrada em número float
var convertToFloatNumber = function(value) {
    value = value.toString();
    if (value.indexOf('.') !== -1 && value.indexOf(',') !== -1) {
        if (value.indexOf('.') <  value.indexOf(',')) {
            //inglês
            return parseFloat(value.replace(/,/gi,''));
        } else {
            //português
            return parseFloat(value.replace(/./gi,'').replace(/,/gi,'.'));
        }      
    } else {
        return parseFloat(value);
    }
}

//prototype para formatar a saída  
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};