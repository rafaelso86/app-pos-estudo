//Lógica com o banco de dados
var db;
var shortName = 'Anotacao';
var version = '1.0';
var displayName = 'Anotacao';
var maxSize = 65535;

function inicializarBanco(){
    if(!window.openDatabase){
        alert('O Navegador não possui suporte a SQL');
        return;
    }

    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(function(tx){
        tx.executeSql('Create table if not exists Anotacoes(id integer not null primary key autoincrement, conteudo text not null, published date)',
        {}, function(){}, errorHandler);
        ), errorHandler, function();
    }
}

function _GET(nome, urlEntrada){
    if(urlEntrada != null){
        urlEntrada = urlEntrada.slice(43);
        var url = urlEntrada.replace('?', '');
        var itens = url.split('&');
        for(n in itens){
            if(itens[n].match(nome)){
                return decodeURIComponent(itens[n].replace(nome+'=', ''));
            }
        }

        return null;
    }
}