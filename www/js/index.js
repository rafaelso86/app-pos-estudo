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