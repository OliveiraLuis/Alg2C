window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let fileSelected = document.getElementById('arquivoCodigo');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            let fileExtension = /text.*/;
            //Get the file object
            let fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                let fileReader = new FileReader();
                fileReader.onload = function (e) {
                    let fileContents = document.getElementById('filecontents');
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
let mudaArquivoparaC = function (texto) {
    texto = adicionaFuncaoMain(texto);
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
let substituiOcorrencia = function (texto, ocorrencia, substituta) {
    return texto.replace(ocorrencia, substituta);
}

/**
 * Função para colocar o '{' nos lugares apropriados
 *
 */
let adicionaAbreChaves = function (texto) {
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
let adicionaFechaChaves = function (texto) {
    caractere = '}';
    texto = substituiOcorrencia(texto, /fim;/g, caractere);
    texto = substituiOcorrencia(texto, /fim-enquanto;/g, caractere);
    texto = substituiOcorrencia(texto, /fim-se;/g, caractere);
    texto = substituiOcorrencia(texto, /fim-funcao;/g, caractere);
    texto = substituiOcorrencia(texto, /fim-procedimento;/g, caractere);
    texto = substituiOcorrencia(texto, /senao/g, caractere + 'senao');
    return texto;
}

/**
 * Função para colocar os nomes dos tipos das váriaveis
 *
 */
let adicionaTiposDeVariaveis = function (texto) {
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
let adicionaAtribuidores = function (texto) {
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
let removerFrasesInutesis = function (texto) {
    texto = substituiOcorrencia(texto, /{.*}/g, '');
    texto = substituiOcorrencia(texto, /(fim-algoritmo).*/g, '');
    return texto;
}

/**
 * Função para adicionar main
 *
 */
let adicionaFuncaoMain = function (texto) {
    return substituiOcorrencia(texto, /^\s*(algoritmo).*/g, 'int main()');
}

