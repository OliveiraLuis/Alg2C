window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('arquivoCodigo');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('filecontents');
                    fileContents.innerText = mudaArquivoparaC(fileReader.result);
                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }
}

/**
 * Chamada das funções para tratar do texto de entrada
 *
 */
var mudaArquivoparaC = function (texto) {
    texto = adicionaAbreChaves(texto);
    texto = adicionaFechaChaves(texto);
    texto = adicionaTiposDeVariaveis(texto);
    texto = adicionaAtribuidores(texto);
    texto = removerFrasesInutesis(texto);
    return texto;
}

/**
 * Função para encontrar a 'ocorrencia' no 'texto' e substituir pela 'substituta'
 *
 */
var substituiOcorrencia = function (texto, ocorrencia, substituta) {
    return texto.replace(ocorrencia, substituta);
}

/**
 * Função para colocar o '{' nos lugares apropriados
 *
 */
var adicionaAbreChaves = function (texto) {
    caractere = '{';
    texto = substituiOcorrencia(texto, /inicio/g, caractere);
    texto = substituiOcorrencia(texto, /entao/g, caractere);
    texto = substituiOcorrencia(texto, /faca/g, caractere);
    return texto;
}

/**
 * Função para colocar o '}' nos lugares apropriados
 *
 */
var adicionaFechaChaves = function (texto) {
    caractere = '}';
    texto = substituiOcorrencia(texto, /fim;/g, caractere);
    texto = substituiOcorrencia(texto, /fim-enquanto;/g, caractere);
    texto = substituiOcorrencia(texto, /senao/g, caractere + 'senao');
    return texto;
}

/**
 * Função para colocar os nomes dos tipos das váriaveis
 *
 */
var adicionaTiposDeVariaveis = function (texto) {
    texto = substituiOcorrencia(texto, /inteiro:/g, 'int');
    texto = substituiOcorrencia(texto, /real:/g, 'float');
    texto = substituiOcorrencia(texto, /caractere:/g, 'char');
    texto = substituiOcorrencia(texto, /logico:/g, 'bool');
    return texto;
}

/**
 * Função para mudar os atribuidores
 *
 */
var adicionaAtribuidores = function (texto) {
    texto = substituiOcorrencia(texto, / = /g, '==');
    texto = substituiOcorrencia(texto, /<-/g, '=');
    texto = substituiOcorrencia(texto, /<>/g, '!=');
    texto = substituiOcorrencia(texto, /E/g, '&&');
    texto = substituiOcorrencia(texto, /OU/g, '||');
    texto = substituiOcorrencia(texto, /NAO/g, '!');
    return texto;
}

/**
 * Função para retirar partes que não serão úteis
 *
 */
var removerFrasesInutesis = function (texto) {
    texto = substituiOcorrencia(texto, /{.*}/g, '');
    return texto;   
}