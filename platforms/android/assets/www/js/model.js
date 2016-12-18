//Conexão com o SQLite
var db;
var shortName = 'Anotacao';
var version = '1.0';
var displayName = 'Anotacao';
var maxSize = 65535;

function inicializarBanco(){
	if(!window.openDatabase){
		alert('O navegador não possui suporte a SQL');
		return;
	}

	db = openDatabase(shortName, version, displayName, maxSize);
	db.transaction(function(tx){
		tx.executeSql('create table if not exists Anotacoes(id integer not null primary key autoincrement, conteudo text not null, published date)',
		[], function(){}, errorHandler);
	}, errorHandler, function(){});
}

function gravarNoBanco(anotacao){
	inicializarBanco();
	db.transaction(function(transaction){
		transaction.executeSql('insert into Anotacoes(conteudo, published) values(?,?)',
		[anotacao.conteudo, anotacao.published], function(){},
		errorHandler);
	},errorHandler,successCallBackInserir);
}

function successCallBackInserir(){
	alert('Anotação inserida no banco de com sucesso!');
	VoltarIndex();
}

function errorHandler(error){
	alert('Código do erro: ' + error.code);
}

function listaDeValores(){
	inicializarBanco();
	db.transaction(function(transaction){
		transaction.executeSql('select * from Anotacoes', [], mostrarRegistros, errorHandler);
	});
	return;
}

function visualizarAnotacao(id){
	db.transaction(function(transaction){
		transaction.executeSql('select * from Anotacoes where id= ?', [id], mostrarAnotacao, errorHandler);
	});
}

function apagarAnotacao(){
	var url = $('#visualizarAnotacao').attr('data-url');
	var id = _GET('id', url);
	if(!window.openDatabase){
		alert('O navegador não suporta SQLite.');
		return;
	}

	db.transaction(function(transaction){
		transaction.executeSql('delete from Anotacoes where id = ?', [id], successCallBackDeletar, errorHandler);
	}, errorHandler, nullHandler);
	listaDeValores();
	return false;
}

function successCallBackDeletar(){
	alert('Anotação deletada com sucesso');
		return;
}
function nullHandler(){}