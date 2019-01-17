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
 * Função para encontrar a 'ocorrencia' e substituir pela 'substituta'
 *
 */
var mudaArquivoparaC = function (frase) {
    frase = adicionaAbreChaves(frase);
    frase = adicionaFechaChaves(frase);
    frase = adicionaTiposDeVariaveis(frase);
    frase = adicionaAtribuidores(frase);
    frase = removerFrasesInutesis(frase);
    return frase;
}

/**
 * Função para encontrar a 'ocorrencia' e substituir pela 'substituta'
 *
 */
var substituiOcorrencia = function (frase, ocorrencia, substituta) {
    return frase.replace(ocorrencia, substituta);
}

/**
 * Função para colocar o '{' nos lugares apropriados
 *
 */
var adicionaAbreChaves = function (frase) {
    caractere = '{';
    frase = substituiOcorrencia(frase, /inicio/g, caractere);
    frase = substituiOcorrencia(frase, /entao/g, caractere);
    frase = substituiOcorrencia(frase, /faca/g, caractere);
    return frase;
}

/**
 * Função para colocar o '}' nos lugares apropriados
 *
 */
var adicionaFechaChaves = function (frase) {
    caractere = '}';
    frase = substituiOcorrencia(frase, /fim;/g, caractere);
    frase = substituiOcorrencia(frase, /fim-enquanto;/g, caractere);
    frase = substituiOcorrencia(frase, /senao/g, caractere + 'senao');
    return frase;
}

/**
 * Função para colocar os nomes das váriaveis
 *
 */
var adicionaTiposDeVariaveis = function (frase) {
    frase = substituiOcorrencia(frase, /inteiro:/g, 'int');
    frase = substituiOcorrencia(frase, /real:/g, 'float');
    frase = substituiOcorrencia(frase, /caractere:/g, 'char');
    frase = substituiOcorrencia(frase, /logico:/g, 'bool');
    return frase;
}

/**
 * Função para mudar os atribuidores
 *
 */
var adicionaAtribuidores = function (frase) {
    frase = substituiOcorrencia(frase, /=/g, '==');
    frase = substituiOcorrencia(frase, /<-/g, '=');
    frase = substituiOcorrencia(frase, /<>/g, '!=');
    frase = substituiOcorrencia(frase, /E/g, '&&');
    frase = substituiOcorrencia(frase, /OU/g, '||');
    frase = substituiOcorrencia(frase, /NAO/g, '!');
    return frase;
}

var removerFrasesInutesis = function (frase) {
    frase = substituiOcorrencia(frase, /(^\{...*\})/g, '');
    return frase;   
}