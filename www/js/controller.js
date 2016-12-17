function gravarAnotacao(){
	anotacao = new Object();
	anotacao.conteudo = document.getElementById('conteudo').value;
	anotacao.published = new Date();
	gravarNoBanco(anotacao);
}

function mostrarRegistros(transaction, result){
	var listaAnotacoes = document.getElementById('listaAnotacoes');
	var lista = '';

	if(result != null && result.rows != null){
		for(var i = 0; i < result.rows.length; i++){
			var row = result.rows.item(i);
			lista = lista + '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">';
			lista = lista + '<div class="ui-btn-inner ui-li"></div class="ui-btn-text">';
			lista = lista + '<a class="ui-link-inherit" href="visualizarAnotacao.html?id=' + row.id + '">';
			lista = lista + '<h4 class="ui-li-heading">' + row.conteudo + '</h4>';
			lista = lista + '<p class="ui-li-desc">' + row.published + '</p>';
			lista = lista + '</a></div></div></li>';
		}

		listaAnotacoes.innerHTML = lista;	
	}
}

function mostrarAnotacao(transaction, result){
	var anotacao = '<strong>ID: </strong>' + result.rows.item(0).id + '<br/>';
	anotacao = anotacao + '<strong>Conteudo</strong>' + result.rows.item(0).conteudo + '<br/>';
	anotacao = anotacao + '<strong>Data Criação: <strong>' + result.rows.item(0).published + '<br/>';
	var detalheAnotacao = document.getElementById('detalhesAnotacao');
	detalhesAnotacao.innerHTML = anotacao;
}

$(document).on('pageshow', function(){
	var url = $('#visualizarAnotacao').attr('data-url');
	if(_GET('id', url) != null)
		visualizarAnotacao(_GET('id', url));
	else
		listaDeValores();
});