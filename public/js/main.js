var tempoInicial = $("#tempo-digitacao").text();

$(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(/\S+/).length - 1;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

var campoFrase = $(".campo-digitacao");

function inicializaContadores() {
  campoFrase.on("input", function () {
    var conteudo = campoFrase.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
    
    $("#botao-reiniciar").attr("disabled", true);
    
  });
}

function inicializaCronometro() {
  var tempoRestante = $("#tempo-digitacao").text();
  campoFrase.one("focus", function () {
    var cronometroID = setInterval(function () {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        campoFrase.attr("disabled", true);
        clearInterval(cronometroID);
        $("#botao-reiniciar").attr("disabled", false);
      }
      
    }, 1000);
  });
}

function reiniciaJogo() {
  campoFrase.attr("disabled", false);
  campoFrase.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
}





