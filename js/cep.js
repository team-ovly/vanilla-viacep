
const sViaCEP = "https://viacep.com.br/ws/";
const sformat = "/json";

function buscaCep() {
	var sCep = $("#cep").val();
	if (history.pushState) {
		history.pushState(null, null, '#' + sCep);
	} else {
		location.hash = "#" + sCep;
	}
	$.ajax({
		url: createViaCEPUrl(sCep),
		success: onSuccess,
		error: onError
	});
}

function createViaCEPUrl(sCep) {
	return sViaCEP + sCep + sformat;
}

function onSuccess(data) {
	if(data.erro){
		onError();
		return;
	}
	$("input[name='logradouro']").val(data.logradouro);
	$("input[name='bairro']").val(data.logradouro);
	$("input[name='estado']").val(data.uf);
	$("form").show();
	$("#erro").hide();
}

function onError(oError){
	$("form").hide();
	$("#erro").show();
}

function onDigitaCep(){
	var sCep = $("#cep").val();
	var len = sCep.length;
	var bValidLength = ( len == 8 || len == 9 );
	$("button").attr("disabled", !bValidLength);	
}

window.onload = function () {
	if(window.location.hash){
		var sCep = window.location.hash.substring(1);
		$("#cep").val(sCep);
		$.ajax({
			url: createViaCEPUrl(sCep),
			success: onSuccess,
			error: onError
		});
	}
	
}