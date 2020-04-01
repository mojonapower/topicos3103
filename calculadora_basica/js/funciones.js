function soloLetras(e)
{
   key = e.keyCode || e.which;
   tecla = String.fromCharCode(key).toLowerCase();
   letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
   //especiales = [8,37,39,46];

   tecla_especial = false;

	if(letras.indexOf(tecla)==-1 && !tecla_especial)
	{
		return false;
	}
}
//function soloNumeros(evt)
function soloNumeros(e)
{
	tecla = (document.all) ? e.keyCode : e.which; 
	if (tecla==8) return true; 
	patron =/^[0-9.]+$/;//este acepta punto(.), si se quiere eliminar borrar el punto despues del 9. 
	te = String.fromCharCode(tecla); 
	return patron.test(te);
}

function validaralpha(e) 
{ 
	tecla = (document.all) ? e.keyCode : e.which; 
	if (tecla==8) return true; 
	patron =/[\ w\w.&ñ]/;//este acepta espacios entre medio, si se quiere eliminar los espacios poner [\w] 
	te = String.fromCharCode(tecla); 
	return patron.test(te);
}

function operacion()
{
	var select=$("#operacion option:selected").val();//text() para texto de select option
	var nro1=document.getElementById('nro1').value;
	var nro2=document.getElementById('nro2').value;
	var nro3=document.getElementById('nro3').value;
	if(nro1=='' || nro2=='' || nro3=='')
	{
		alert('Debe Ingresar los valores!');
	}
	else
	{
	//alert(select);
	if(select==0)
	{
		alert('Debe seleccionar Operación!!!');
	}
	else if(select==1)
	{
		funcion='suma';
	}
	else if(select==2)
	{
		funcion='resta';
	}
	else if(select==3)
	{
		funcion='mult';
	}
	else if(select==4)
	{
		funcion='division';
	}
	if(select > 0)
	{		
		//alert(funcion);
		$.ajax({
		cache: false,
		// puede ser GET, POST
		type: "POST",  							
		// Tipo de retorno
		dataType: "html",
		// pagina php que recibe la llamada
		url: "http://72.14.183.67/ws/operaciones.php",  							
		// datos, ej: $_POST['data']
		data: {
			funcion:funcion,
			n1:nro1,
			n2:nro2,
			n3:nro3,				
		},
		beforeSend: function(){  
                    document.getElementById('divCargando').style.display="block";
                    $("#labelCargando").html('Cargando...');	
		},
		// acciones cuando me retorna algo el PHP
		success: function( msg){
			//console.log(msg);
                        document.getElementById('divCargando').style.display="none";
			if(msg=='error')
			{
				alert('Ha ocurrido un Error.');
			}
			else if(msg=='cero')
			{
				alert('Error!, Nro2 no puede ser cero.');
                                reiniciar();
			}
			else
			{
				document.getElementById('divResultado').style.display="block";
				$("#labelResultado").html('Resultado de la '+$("#operacion option:selected").text()+'='+msg);
				
			}
		},							
		// acciones cuando hay error en comunicacion el el php
		error: function(xhr, status,msg2 ){
			//alert('4');			
			console.log(xhr);
		}
	});//fin ajax
	}//fin else
	}
}

function reiniciar()
{
	document.getElementById('nro1').value='';
	document.getElementById('nro2').value='';
	document.getElementById('nro3').value='';
	$("#operacion").val(0);
	document.getElementById('divResultado').style.display="none";
        document.getElementById('divCargando').style.display="none";
}
