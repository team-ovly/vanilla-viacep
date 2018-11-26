
const sViaCEP = "https://viacep.com.br/ws/";
const sformat = "/json";

function buscaCep() {
	var sCep = $("#cep").val();
	if (history.pushState) {
		history.pushState(null, null, '#' + sCep);
	} else {
		location.hash = "#" + sCep;
	}
	$.get(createViaCEPUrl(sCep), onSuccess);
}

function createViaCEPUrl(sCep) {
	return sViaCEP + sCep + sformat;
}

function onSuccess(data) {
	$("input[name='cep']").val(data.cep);
	$("input[name='logradouro']").val(data.logradouro);
	$("input[name='bairro']").val(data.logradouro);
	$("input[name='estado']").val(data.uf);
	$("form").show();
}

window.onload = function () {
	if(window.location.hash){
		var sCep = window.location.hash.substring(1);
		$("#cep").val(sCep);
		$.get(createViaCEPUrl(sCep), onSuccess);
	}
	
}