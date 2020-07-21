var DatosActividad = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<actividad tipo="Sopa">\n	\n<!-- Parte generica -->\n
<color_fuente_b>0x000000</color_fuente_b>\n
<color_fuente>0xFFFFFF</color_fuente>\n
<!-- Indica que color de fondo se le pondra al flash (por defecto 0x8993A0) -->\n	
<color_fondo>0x8993A0</color_fondo>\n	
<!-- Indica que color se le pondra a los elementos del flash (por defecto 0x728F61) -->\n	
<color_botones>0xff8a00</color_botones>\n   
<!-- Indica que color de fondo se le pondra al html5 (por defecto 0x7cb139) -->\n
<color_fondo_h>0x7cb139</color_fondo_h>\n	
<!-- Indica que color se le pondra a los elementos del html5 (por defecto 0xFCA800) -->\n
<color_botones_h>0xFCA800</color_botones_h>\n
<!-- Indica el logo personalizado si lo hay -->\n
<logoPersonalizado>no</logoPersonalizado>\n
<franjaPersonalizada>no</franjaPersonalizada>\n	
<!-- Indica si tiene un tiempo maximo para realizar la actividad, estara definido en segundos -->\n	
<tiempo maximo="0">no</tiempo>\n	\n	
<globalFeedback>0</globalFeedback>\n	
<autor>J.s Jaramillo</autor>\n	
<descripcionUsuario>Encuentra las palabras sobre web</descripcionUsuario>\n    
<descripcionUsuarioLimpio>Encuentra las palabras sobre web</descripcionUsuarioLimpio>\n	
<origen_recursos>https://cloud.educaplay.com/recursos/88/2845259/</origen_recursos>\n	\n   
 <!-- Indica en que direcciones se puede generar la sopa de letras : Norte, NorEste , Este, SurEste,Sur,SurOeste, Oeste,NorOeste-->\n


 <direcciones>\n        
<direccion>N</direccion>\n       
<direccion>E</direccion>\n      
<direccion>S</direccion>\n   
<direccion>O</direccion>\n   	
</direcciones>\n 


<!--Indica como se deben mostrar las pistas -->\n   
<pistas>ninguna</pistas>\n
<registro>\n
<!-- Indica el tipo de registro:\n		- script -> registro a traves de un script (php, jsp, etx)\n		- scorm -> registreo a traves de scorp\n		-->\n		<tipo>script</tipo>\n	
<!-- Indica la url del scrip, en caso de que el tipo sea script	-->\n		
<!-- Indica los parametros a pasar al script, en caso de que el tipo sea script	-->\n
<parametros>\n
<!-- La etiqueta nombre contiene el nombre del parametro a pasar -->\n
<!-- La etiqueta valor contiene el valor al que hace referencia el parametro (buscara el nombre de la varible en flash):\n			- SCORE: puntuacion de la actividad, en porcentaje\n			- TIME: tiempo de la actividad, en segundos\n			- URL: direccion de la actividad\n			-->\n			

<parametro id="1">\n
<nombre>book</nombre>\n	
<valor>book</valor>\n	
</parametro>\n	

<parametro id="2">\n
<nombre>hot</nombre>\n
<valor>hot</valor>\n	
</parametro>\n	

<parametro id="3">\n
<nombre>time</nombre>\n
<valor>TIME</valor>\n
</parametro>\n

<parametro id="3">\n
<nombre>url</nombre>\n
<valor>URL</valor>\n
</parametro>\n

</parametros>\n	
</registro>\n    \n
<!-- Parte especifica -->\n	<!-- Indica la forma de completar la frase, 3 opciones:\n	- escribir\n	- arrastrar\n	- clickar\n	-->\n	<titulo>Instrucciones</titulo>\n	
<!-- Indica la forma de realizar la actividad, es decir la ayuda de la actividad -->\n
<descripcion>Intenta resolver la sopa de letras. Para ello busca las palabras escondidas en ella y selecciónalas deslizando el ratón sobre las letras que las componen. Si te atascas y no encuentras más, puedes pulsar en Mostrar Palabra para que te diga una palabra que buscar si ésta no la tienes visible. Si la tuvieras ya visible, te indicará dónde se encuentra escondida esa palabra.Cuantas menos pistas pidas para resolver la actividad, más puntos obtendrás.</descripcion>\n	
<descripcionT>Intenta resolver la sopa de letras. Para ello busca las palabras escondidas en ella y selecciónalas haciendo click sobre la primera letra y después sobre la última letra que las componen. Si te atascas y no encuentras más, puedes pulsar en Mostrar Palabra para que te diga una palabra que buscar si ésta no la tienes visible. Si la tuvieras ya visible, te indicará dónde se encuentra escondida esa palabra.Cuantas menos pistas pidas para resolver la actividad, más puntos obtendrás.</descripcionT>\n	
<enunciado>Sopa de letras</enunciado>\n    
<!-- parametro solo para la importación a ADR -->\n    
<enunciado_edu>Sopa de letras</enunciado_edu>\n    \n    
<botonesOcultos>0</botonesOcultos>\n   	
<palabras>\n    

<palabra>\n	   
<valor>spectacular</valor>\n	    
<fila>12</fila>\n   
<columna>0</columna>\n	 
<direccion>E</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>unforgettable</valor>\n	    
<fila>0</fila>\n   
<columna>0</columna>\n	 
<direccion>SE</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>innovative</valor>\n	    
<fila>3</fila>\n   
<columna>0</columna>\n	 
<direccion>E</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>behavior</valor>\n	    
<fila>0</fila>\n   
<columna>1</columna>\n	 
<direccion>E</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>conclusion</valor>\n	    
<fila>0</fila>\n   
<columna>12</columna>\n	 
<direccion>S</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>competition</valor>\n	    
<fila>0</fila>\n   
<columna>11</columna>\n	 
<direccion>S</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>developing</valor>\n	    
<fila>9</fila>\n   
<columna>10</columna>\n	 
<direccion>N</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>movements</valor>\n	    
<fila>10</fila>\n   
<columna>0</columna>\n	 
<direccion>E</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>additional</valor>\n	    
<fila>11</fila>\n   
<columna>0</columna>\n	 
<direccion>E</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>expectations</valor>\n	    
<fila>13</fila>\n   
<columna>0</columna>\n	 
<direccion>E</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>effective</valor>\n	    
<fila>0</fila>\n   
<columna>9</columna>\n	 
<direccion>S</direccion>\n	
<feedback></feedback>\n    
</palabra>\n


<palabra>\n	   
<valor>confident</valor>\n	    
<fila>12</fila>\n   
<columna>6</columna>\n	 
<direccion>N</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>suitable</valor>\n	    
<fila>1</fila>\n   
<columna>0</columna>\n	 
<direccion>S</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>deforestation</valor>\n	    
<fila>14</fila>\n   
<columna>14</columna>\n	 
<direccion>O</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>destruction</valor>\n	    
<fila>14</fila>\n   
<columna>14</columna>\n	 
<direccion>N</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>nervousness</valor>\n	    
<fila>13</fila>\n   
<columna>13</columna>\n	 
<direccion>N</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

<palabra>\n	   
<valor>depth</valor>\n	    
<fila>13</fila>\n   
<columna>12</columna>\n	 
<direccion>NO</direccion>\n	
<feedback></feedback>\n    
</palabra>\n

</palabras>\n    

<numero_filas>15</numero_filas>\n\n\n	
<idioma>\n	
<txtPuntos>Puntos</txtPuntos>\n		
<txtTiempo>Tiempo</txtTiempo>\n		
<txtTiempoRestante>Tiempo Restante</txtTiempoRestante>\n        
<txtMostrarPalabra>Mostrar palabra</txtMostrarPalabra>\n		
<txtRespuestaIncorrecta>Respuesta Incorrecta</txtRespuestaIncorrecta>\n		
<txtTituloActividadNoSuperada>Actividad no superada</txtTituloActividadNoSuperada>\n		
<txtTiempoSuperado>Has superado el tiempo máximo para esta actividad</txtTiempoSuperado>\n    	
<txtSuperadoNumeroIntentos>Has superado el número de intentos de esta actividad</txtSuperadoNumeroIntentos>\n		
<txtTituloActividadSuperada>Respuesta correcta</txtTituloActividadSuperada>\n		
<txtActividadSuperada>Enhorabuena has superado la actividad</txtActividadSuperada>\n		
<txtCerrar>Cerrar</txtCerrar>\n		
<txtActividadNoSuperada>No has superado el porcentaje de aciertos para aprobar esta actividad.</txtActividadNoSuperada>\n        \n		
<instrucciones>Instrucciones</instrucciones>\n		
<comprobar>Comprobar</comprobar>\n		
<txtTituloRespuestaCorrecta>Respuesta correcta</txtTituloRespuestaCorrecta>\n		
<txtBoxRespuestaCorrecta>Enhorabuena has superado la actividad</txtBoxRespuestaCorrecta>\n		
<txtRespuestaCorrecta>Enhorabuena has superado la actividad</txtRespuestaCorrecta>\n		
<nIntentos>Num. Intentos</nIntentos>\n		
<txtAceptar>Aceptar</txtAceptar>\n		
<txtTiempoMaximo>Tiempo máximo</txtTiempoMaximo>\n		
<txtSensible>Sensible</txtSensible>\n		
<txtMayusculasMinusculas>Mayúsculas/Minúsculas</txtMayusculasMinusculas>\n		
<txtAcentos>Acentos</txtAcentos>\n		
<txtComenzar>Comenzar</txtComenzar>\n		
<txtAutor>Autor</txtAutor>\n		
<txtAyuda>Ayuda</txtAyuda>\n		
<txtMostrarMas>Mostrar más</txtMostrarMas>\n		
<txtMostrarMenos>Mostrar menos</txtMostrarMenos>\n		
<txtReiniciar>Reiniciar</txtReiniciar>\n		
<txtVolverJugar>Volver a jugar</txtVolverJugar>\n		
<txtResponder>Responder</txtResponder>\n		
<txtRegistrarse>Registrarse</txtRegistrarse>\n		
<txtAcceder>Acceder</txtAcceder>\n		
<txtCompartirResultado>Compartir resultado</txtCompartirResultado>\n		
<txtAumentar>Aumentar</txtAumentar>\n		
<txtReducir>Reducir</txtReducir>\n		
<txtPantallaCompleta>Pantalla completa</txtPantallaCompleta>\n		
<txtImprimir>Imprimir</txtImprimir>\n		
<txtPistas>Pistas</txtPistas>\n  		
<txtHuecos>Huecos</txtHuecos>\n  		
<txtNoPistas>Sin pistas</txtNoPistas>\n		
<txtInfoAdicional>Contiene información adicional</txtInfoAdicional>\n		
<txtSocial>He obtenido [puntuacion] puntos en [tiempo] min. en la actividad [nomactividad]. ¿Puedes superarlo?</txtSocial>\n	
</idioma>\n\n</actividad>`;