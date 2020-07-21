function crear() {
    var tamMaximoAncho = $('#wrapper').width();
    var tamMaximoAlto  = $('#wrapper').height();
    tamCasillaAncho    = parseInt(tamMaximoAncho / numFilas);
    tamCasillaAlto     = parseInt(tamMaximoAlto / numFilas);
    if (tamCasillaAncho >= tamCasillaAlto) {
        tamCasilla = tamCasillaAlto;
        tamMaximo  = tamMaximoAlto;
    }
    else {
        tamCasilla = tamCasillaAncho;
        tamMaximo  = tamMaximoAncho;
    }
    $('#scroller').width(tamCasilla * numFilas);
    $('#scroller').addClass('unselectable');
    miLienzo = $('#lienzo');
    var px   = 0;
    var py   = 0;
    for (i = 0; i < numFilas; i++) {
        if (i < 10)var ix = "0" + i; else var ix = i;
        for (j = 0; j < numFilas; j++) {
            pxt = px + "px";
            pyt = py + "px";
            if (j < 10)var jy = "0" + j; else var jy = j;
            var div = $("<div>", {id: "c" + ix + "_" + jy, "class": "casilla", "unselectable": "on", css: {"left": pxt, "top": pyt}});
            miLienzo.append(div);
            px           = px + (tamCasilla);
            var tamLetra = tamCasilla - 11;
            if (tamLetra < 7) tamLetra = 7;
            if (tamLetra > 21) tamLetra = 21;
            $("#c" + ix + "_" + jy).css({"width": tamCasilla + "px", "height": tamCasilla + "px", "font-size": tamLetra + "px", "line-height": tamCasilla + "px"});
        }
        px = 0;
        py = py + (tamCasilla);
    }
    var altoLienzo = tamCasilla * numFilas;
    $('#lienzo').height(altoLienzo);
    setTimeout(function () {
        var margenX = ($("#wrapper").width() - $("#scroller").width()) / 2;
        $('#scroller').css("left", margenX);
    }, 1000);
    if ($('#all').width() < 600) {
        $('#info').removeClass('visible');
        $('#info').addClass('oculto');
    }
    else {$("#btnPistas").hide();}
    if (!is_touch_device()) {
        $("#infoZoom").hide();
        $(".zoomScroller").hide();
    }
    cargar();
}
function cargar() {
    for (k = 0; k < pa.length; k++) {
        fila      = fi[k];
        columna   = co[k];
        direccion = di[k];
        palabra   = pa[k];
        if (k < 10)var kz = "0" + k; else var kz = k;
        if (columna < 10)var columnax = "0" + columna; else columnax = columna;
        if (fila < 10)var filay = "0" + fila; else filay = fila;
        if (direccion == "E") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna + i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "SE") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila + i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna + i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "S") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila + i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "SO") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila + i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna - i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "O") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna - i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "NO") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila - i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna - i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "N") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila - i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "NE") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila - i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna + i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
    }
    rellenar();
}
function rellenar() {
    var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (i = 0; i < numFilas; i++) {
        if (i < 10)var ix = "0" + i; else var ix = i;
        for (j = 0; j < numFilas; j++) {
            var aleatorio = parseInt(Math.random() * 100);
            while (aleatorio >= letras.length - 1) {aleatorio = parseInt(Math.random() * 100);}
            if (j < 10)var jy = "0" + j; else var jy = j;
            if ($("#c" + ix + "_" + jy).html() == "") $("#c" + ix + "_" + jy).html(letras[aleatorio]);
        }
    }
    cargarPistas();
    if (is_touch_device()) {$(".casilla").bind("click", controlaInicio);}
    else {
        $(".casilla").mousedown(controlaInicio);
        $(".casilla").mouseup(controlaFinal);
    }
}
function cargarPistas() {
    var ol = $("<ol>");
    for (k = 0; k < pa.length; k++) {
        if (k < 10)var kx = "0" + k; else var kx = k;
        palabra = pa[k];
        var li  = $("<li>");
        var div = $("<div>", {id: "divPista" + kx, "class": "cajaPista"});
        if (pistas == "palabra") $(div).html(palabra);
        if (pistas == "ninguna") $(div).html("????");
        if (pistas == "asteriscos") {
            var asteriscos = "";
            for (p = 0; p < palabra.length; p++) {asteriscos += "_";}
            $(div).html(asteriscos);
        }
        $(li).append(div);
        $(ol).append(li);
    }
    $("#contenidoPista").append(ol);
};function extraerDatos() {
    tipo_actividad              = "Sopa";
    numero_intentos             = "noDefinido";
    sensible_mayusculas         = "noDefinido";
    sensible_acentos            = "noDefinido";
    sensible_mayusculas_ocultar = "si";
    sensible_acentos_ocultar    = "si";
    try {origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;} catch (e) {origen_recursos = "";}
    if (origen_recursos) {rutaRecursos = origen_recursos;}
    try {botonReinicio = xmlDoc.getElementsByTagName("boton_reiniciar")[0].childNodes[0].nodeValue;} catch (e) {botonReinicio = 'visible';}
    try {
        colorFuente    = xmlDoc.getElementsByTagName("color_fuente")[0].childNodes[0].nodeValue;
        colorFuenteB   = xmlDoc.getElementsByTagName("color_fuente_b")[0].childNodes[0].nodeValue;
        colorFuenteInt = colorFuente.substring(2, colorFuente.length);
        colorFuente    = "#" + colorFuente.substring(2, colorFuente.length);
        colorFuenteB   = "#" + colorFuenteB.substring(2, colorFuenteB.length);
    } catch (e) {
        colorFuente  = "#FFFFFF";
        colorFuenteB = "#111111";
    }
    colorFondo    = xmlDoc.getElementsByTagName("color_fondo_h")[0].childNodes[0].nodeValue;
    colorFondoInt = colorFondo.substring(2, colorFondo.length);
    colorFondo    = "#" + colorFondo.substring(2, colorFondo.length);
    colorBotones  = xmlDoc.getElementsByTagName("color_botones_h")[0].childNodes[0].nodeValue;
    colorBotones  = colorBotones.substring(2, colorBotones.length);
    try {logoPersonalizado = xmlDoc.getElementsByTagName("logoPersonalizado")[0].childNodes[0].nodeValue;} catch (e) {logoPersonalizado = "";}
    try {franjaPersonalizada = xmlDoc.getElementsByTagName("franjaPersonalizada")[0].childNodes[0].nodeValue;} catch (e) {franjaPersonalizada = "";}
    tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
    if (tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value; else if (tiempo == "no") tiempo = 0;
    globalFeedback = xmlDoc.getElementsByTagName("globalFeedback")[0].childNodes[0].nodeValue;
    if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {autor = '';} else {autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;}
    descripcionUsuario         = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;
    registro                   = xmlDoc.getElementsByTagName("registro")[0];
    descripcion                = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
    descripcionT               = xmlDoc.getElementsByTagName("descripcionT")[0].childNodes[0].nodeValue;
    enunciado                  = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
    numFilas                   = xmlDoc.getElementsByTagName("numero_filas")[0].childNodes[0].nodeValue;
    pistas                     = xmlDoc.getElementsByTagName("pistas")[0].childNodes[0].nodeValue;
    var idioma                 = xmlDoc.getElementsByTagName("idioma")[0];
    instrucciones              = idioma.getElementsByTagName("instrucciones")[0].childNodes[0].nodeValue;
    txtPuntos                  = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
    txtTiempo                  = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
    txtTiempoRestante          = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
    comprobar                  = idioma.getElementsByTagName("comprobar")[0].childNodes[0].nodeValue;
    txtRespuestaIncorrecta     = "";
    txtActNoSuperada           = "";
    txtTiempoSuperado          = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
    txtCerrar                  = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
    txtTituloRespuestaCorrecta = idioma.getElementsByTagName("txtTituloRespuestaCorrecta")[0].childNodes[0].nodeValue;
    txtRespuestaCorrecta       = idioma.getElementsByTagName("txtRespuestaCorrecta")[0].childNodes[0].nodeValue;
    txtBoxRespuestaCorrecta    = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
    txtActividadNoSuperada     = idioma.getElementsByTagName("txtActividadNoSuperada")[0].childNodes[0].nodeValue;
    txtMostrarPalabra          = idioma.getElementsByTagName("txtMostrarPalabra")[0].childNodes[0].nodeValue;
    txtAceptar                 = idioma.getElementsByTagName("txtAceptar")[0].childNodes[0].nodeValue;
    txtTiempoMaximo            = idioma.getElementsByTagName("txtTiempoMaximo")[0].childNodes[0].nodeValue;
    txtSensible                = idioma.getElementsByTagName("txtSensible")[0].childNodes[0].nodeValue;
    txtMayusculasMinusculas    = idioma.getElementsByTagName("txtMayusculasMinusculas")[0].childNodes[0].nodeValue;
    txtAcentos                 = idioma.getElementsByTagName("txtAcentos")[0].childNodes[0].nodeValue;
    txtComenzar                = idioma.getElementsByTagName("txtComenzar")[0].childNodes[0].nodeValue;
    txtAutor                   = idioma.getElementsByTagName("txtAutor")[0].childNodes[0].nodeValue;
    txtAyuda                   = idioma.getElementsByTagName("txtAyuda")[0].childNodes[0].nodeValue;
    txtMostrarMas              = idioma.getElementsByTagName("txtMostrarMas")[0].childNodes[0].nodeValue;
    txtMostrarMenos            = idioma.getElementsByTagName("txtMostrarMenos")[0].childNodes[0].nodeValue;
    txtReiniciar               = idioma.getElementsByTagName("txtReiniciar")[0].childNodes[0].nodeValue;
    txtVolverJugar             = idioma.getElementsByTagName("txtVolverJugar")[0].childNodes[0].nodeValue;
    txtRegistrarse             = idioma.getElementsByTagName("txtRegistrarse")[0].childNodes[0].nodeValue;
    txtAcceder                 = idioma.getElementsByTagName("txtAcceder")[0].childNodes[0].nodeValue;
    txtCompartirResultado      = idioma.getElementsByTagName("txtCompartirResultado")[0].childNodes[0].nodeValue;
    txtAumentar                = idioma.getElementsByTagName("txtAumentar")[0].childNodes[0].nodeValue;
    txtReducir                 = idioma.getElementsByTagName("txtReducir")[0].childNodes[0].nodeValue;
    txtImprimir                = idioma.getElementsByTagName("txtImprimir")[0].childNodes[0].nodeValue;
    txtPantallaCompleta        = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
    txtPistas                  = idioma.getElementsByTagName("txtPistas")[0].childNodes[0].nodeValue;
    txtInfoAdicional           = idioma.getElementsByTagName("txtInfoAdicional")[0].childNodes[0].nodeValue;
    txtSocial                  = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
    botonesOcultos             = xmlDoc.getElementsByTagName("botonesOcultos")[0].childNodes[0].nodeValue;
    pa                         = [];
    fi                         = [];
    co                         = [];
    di                         = [];
    fe                         = [];
    var palab                  = xmlDoc.getElementsByTagName("palabra");
    for (var i = 0; i < palab.length; i++) {
        pa[i] = palab[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue;
        fi[i] = parseInt(palab[i].getElementsByTagName("fila")[0].childNodes[0].nodeValue);
        co[i] = parseInt(palab[i].getElementsByTagName("columna")[0].childNodes[0].nodeValue);
        di[i] = palab[i].getElementsByTagName("direccion")[0].childNodes[0].nodeValue;
        if (globalFeedback == 1) {
            if (palab[i].getElementsByTagName("feedback")[0].childNodes[0] != undefined) {fe[i] = palab[i].getElementsByTagName("feedback")[0].childNodes[0].nodeValue;}
        }
    }
}
function inicializarElementos() {
    inicializarColores();
    inicializarEventosPrincipales();
    inicializarPantallaInicial();
    inicializarPista();
    inicializarParametros();
    inicializarPuntosSopa();
    inicializarTituloAct();
    inicializarBtnMostrar();
    inicializarBtnsAyuda();
    inicializarAlertaCorrecta();
    inicializarAlertaIncorrecta();
    inicializarRecargar();
    inicializarAyuda();
    inicializarAyudaTactil();
    inicializarZoom();
    inicializarRegistro();
}
function inicializarEventosPrincipales() {
    $(window).resize(function () {redimensionar("redi");});
}
function inicializarPista() {
    $('#btnCerrar').click(function (e) {
        e.preventDefault();
        desactivarPista();
    });
    idTimeout = "pista";
    $("#btnPistas").text(txtPistas);
    $("#btnPistas").click(function (e) {
        e.preventDefault();
        activarPista();
    });
}
function desactivarPista() {
    $('#info').removeClass('visible');
    $('#info').addClass('oculto');
    $('#shadow').removeClass('visible');
    $('#shadow').addClass('oculto');
}
function activarPista() {
    $('#info').removeClass('oculto');
    $('#info').addClass('visible');
    $('#shadow').removeClass('oculto');
    $('#shadow').addClass('visible');
}
function inicializarPuntosSopa() {$("#numPuntos").html("0");}
function inicializarBtnMostrar() {
    $('#btnMostrar').text(txtMostrarPalabra);
    $('#btnMostrar').click(function (e) {
        e.preventDefault();
        mostrar();
    });
}
function inicializarAyudaTactil() {
    if (is_touch_device()) {$('#pantallaAyuda').text(descripcionT);}
}
function inicializarBtnsAyuda() {if (botonesOcultos == 1) $("#btnMostrar").css("visibility", "hidden");};respuestasXAPI = new Array();
function inicializarVariablesXapi() {
    respuestasXAPI = new Array();
    servidor       = location.protocol + "//" + window.location.host
    registroURL    = registro.getElementsByTagName("url")[0].childNodes[0].nodeValue;
    time           = registroURL.split("t=");
    t              = time[1].split("&");
    t              = t[0];
    if (typeof(emailAutor) === "undefined") {emailAutor = "mailto:exportacion@example.com";}
    if (typeof(userNombre) === "undefined") {userNombre = "Anonimo";}
    if (typeof(userEmail) === "undefined") {userEmail = "anonimo@example.com";}
    if (typeof(mParent) === "undefined") {mParent = document.location.href;}
    if (typeof(grouping) === "undefined") {
        var d    = new Date();
        var n    = d.getTime();
        grouping = "id:" + n + "/" + Math.random();
    }
    if (userNombre == " ") {userNombre = "Anonimo";}
    if (userEmail == "") {userEmail = "anonimo@example.com";}
    if (typeof(idAutor) === "undefined" || idAutor == "") {idAutor = "0";}
    if (typeof(idUser) === "undefined" || idUser == "") {idUser = "0";}
}
function inicializarCorregir() {
    window.onbeforeunload = function () {}
    if (userNombre == " ") {userNombre = "Anonimo";}
    if (userEmail == "") {userEmail = "anonimo@example.com";}
}
function inicializarXapi() {
    var stmt = {"actor": {"objectType": "Agent", "openid": "id:" + idUser, "name": "" + userNombre}, "verb": {"id": "http://adlnet.gov/expapi/verbs/initialized"}, "object": {"id": mParent, "objectType": "Activity", "definition": {"name": {"es": enunciado}, "type": "https://www.educaplay.com/es/actividad/sopa.htm", "extensions": {"info:limitetiempo": tiempo, "info:pistas": pistas, "info:intentos": numero_intentos,}},}, "context": {"contextActivities": {"grouping": [{"id": grouping}]}, "instructor": {"name": autor, "openid": "id:" + idAutor, "objectType": "Agent"},}};
    $.ajax({type: "POST", url: servidor + "/xapi.php?action=guardar&t=" + t + "&idActividad=" + idActividad, data: stmt, success: function (msg) {console.log(msg);}, error: function () {}})
}
function completarXapi(tipoFinal, puntos, tiempoReg) {
    var result = 0;
    if (tipoFinal == "OK") {result = 1;}
    var tiempoR = tiempoReg.split(":");
    var tiemp   = parseInt(tiempoR[0] * 60) + parseInt(tiempoR[1]);
    if (tiempo != 0) {tiemp = tiempo - tiemp;}
    tiemp = "PT" + tiemp + "S"
    stmt  = {"actor": {"objectType": "Agent", "openid": "id:" + idUser, "name": "" + userNombre}, "verb": {"id": "http://adlnet.gov/expapi/verbs/completed"}, "object": {"id": mParent, "objectType": "Activity", "definition": {"name": {"es": enunciado}, "type": "https://www.educaplay.com/es/actividad/sopa.htm", "extensions": {"info:limitetiempo": tiempo, "info:pistas": pistas, "info:intentos": numero_intentos,}},}, "result": {"success": result, "score": {"raw": puntos, "min": 0, "max": 100,}, "duration": tiemp}, "context": {"contextActivities": {"grouping": [{"id": grouping}]}, "instructor": {"name": autor, "openid": "id:" + idAutor, "objectType": "Agent"},},};
}
function responderEscritaXapi(npistas, correcta, testrespondida, exito) {
    var stmt1 = {"object": {"objectType": "Activity", "id": mParent, "definition": {"name": {"es": correcta}, "type": "https://www.educaplay.com/es/actividad/sopa.htm", "extensions": {"pistas": npistas,}, "interactionType": "fill-in", "correctResponsesPattern": [correcta],}}, "result": {"response": testrespondida, "success": exito,},}
    respuestasXAPI.push(stmt1);
};function comenzar() {
    inicializarVariablesXapi();
    $('#contentPreActividad').hide();
    $('#contentAct').css('top', 0);
    idInterval = setInterval(contador, 1000);
    if (is_touch_device()) {
        var myScroll;
        myScroll = setTimeout(function () {new iScroll('wrapper', {zoom: true})}, 2000);
    }
}
var escala         = 1;
var escalaAnterior = 1;
var controlZoom    = 0;
function redimensionar(tipo) {
    if (tipo == "redi") {
        var tamMaximoAncho = $('#wrapper').width();
        var tamMaximoAlto  = $('#wrapper').height();
        tamCasillaAncho    = parseInt(tamMaximoAncho / numFilas);
        tamCasillaAlto     = parseInt(tamMaximoAlto / numFilas);
        if (tamCasillaAncho >= tamCasillaAlto) {
            tamCasilla = tamCasillaAlto;
            tamMaximo  = tamMaximoAlto;
        }
        else {
            tamCasilla = tamCasillaAncho;
            tamMaximo  = tamMaximoAncho;
        }
        $('#scroller').width(tamCasilla * numFilas);
        $('#scroller').addClass('unselectable');
        var px = 0;
        var py = 0;
        for (i = 0; i < numFilas; i++) {
            if (i < 10)var ix = "0" + i; else var ix = i;
            for (j = 0; j < numFilas; j++) {
                pxt = px + "px";
                pyt = py + "px";
                if (j < 10)var jy = "0" + j; else var jy = j;
                $("#c" + ix + "_" + jy).css({"top": pyt, "left": pxt});
                px           = px + (tamCasilla);
                var tamLetra = tamCasilla - 11;
                if (tamLetra < 7) tamLetra = 7;
                if (tamLetra > 21) tamLetra = 21;
                $("#c" + ix + "_" + jy).css({"width": tamCasilla + "px", "height": tamCasilla + "px", "font-size": tamLetra + "px", "line-height": tamCasilla + "px"});
            }
            px = 0;
            py = py + (tamCasilla);
        }
        var altoLienzo = tamCasilla * numFilas;
        $('#lienzo').height(altoLienzo);
        setTimeout(function () {
            var margenX = ($("#wrapper").width() - $("#scroller").width()) / 2;
            $('#scroller').css("left", margenX);
        }, 500);
        if ($('#all').width() < 600) {
            $('#info').removeClass('visible');
            $('#info').addClass('oculto');
            $("#btnPistas").show();
            $("#infoZoom").show();
            $(".zoomScroller").show();
        }
        else {$("#btnPistas").hide();}
        if (!is_touch_device()) {
            $("#infoZoom").hide();
            $(".zoomScroller").hide();
        }
        setTimeout(function () {
            for (l = 0; l < pa.length; l++) {
                if (l < 10)var lx = "0" + l; else var lx = l;
                if ($("#linea" + lx).length != 0) {
                    fila      = fi[l];
                    columna   = co[l];
                    direccion = di[l];
                    palabra   = pa[l];
                    if (fila < 10)var filax0 = "0" + fila; else var filax0 = fila;
                    if (columna < 10)var columnax0 = "0" + columna; else var columnax0 = columna;
                    var inicio = "c" + filax0 + "_" + columnax0;
                    if ((direccion == "S") || (direccion == "E") || (direccion == "NE") || (direccion == "SE")) {
                        filax    = filax0;
                        columnax = columnax0;
                    }
                    if (direccion == "SO") {
                        var filax = fila + palabra.length - 1;
                        if (filax < 10)var filax = "0" + filax;
                        var columnax = columna - palabra.length + 1;
                        if (columnax < 10)var columnax = "0" + columnax;
                    }
                    if (direccion == "O") {
                        var columnax = columna - palabra.length + 1;
                        if (columnax < 10)var columnax = "0" + columnax;
                        filax = filax0;
                    }
                    if (direccion == "NO") {
                        var filax = fila - palabra.length + 1;
                        if (filax < 10)var filax = "0" + filax;
                        var columnax = columna - palabra.length + 1;
                        if (columnax < 10)var columnax = "0" + columnax;
                    }
                    if (direccion == "N") {
                        var filax = fila - palabra.length + 1;
                        if (filax < 10)var filax = "0" + filax;
                        columnax = columnax0;
                    }
                    var final = "c" + filax + "_" + columnax;
                    if ((direccion == "S") || (direccion == "E") || (direccion == "NE") || (direccion == "SE")) comienzo = inicio; else comienzo = final;
                    var anchura = tamCasilla * palabra.length;
                    if ((direccion == "NO") || (direccion == "NE") || (direccion == "SO") || (direccion == "SE")) anchura = tamCasilla * Math.SQRT2 * palabra.length;
                    $("#linea" + lx).css({"left": $("#" + comienzo).css("left"), "top": $("#" + comienzo).css("top"), "width": anchura, "height": tamCasilla - 6});
                }
            }
        }, 300);
        $(".vertical").css("margin-top", -(tamCasilla + 4));
        $(".diagonal").css("margin-top", -((tamCasilla / 2) + 4));
        $(".diagonal").css("margin-left", -(((tamCasilla / 2) + 4) / 2));
        $(".diagonalInvertida").css("margin-top", (tamCasilla / 2) - 2);
        $(".diagonalInvertida").css("margin-left", ((tamCasilla / 2) + 4) / 2);
        cargarDescripcionInicio();
    }
    if (tipo == "encaja") {
        controlZoom = 1;
        $('#encajarEnPantalla').addClass('disable');
        $('#zoomDown').addClass('disable');
        $('#zoomUp').removeClass('disable');
        escalaAnterior = escala;
        escala         = 1;
        var margenX    = ($("#wrapper").width() - $("#scroller").width()) / 2;
        $('#scroller').css("left", margenX);
        if (escala != escalaAnterior) {
            var zoom = parseInt(100 * escala);
            $('#infoZoom').html(zoom + "%");
            $('#infoZoom').fadeIn(500);
            setTimeout(function () {$('#infoZoom').fadeOut(500)}, 2000);
        }
        actualX = 0;
        actualY = 0;
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualX + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualX + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualX + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualX + ")");
    }
    if (tipo == "up") {
        controlZoom = 1;
        $('#encajarEnPantalla').removeClass('disable');
        $('#zoomDown').removeClass('disable');
        if (escala >= 4.9) $('#zoomUp').addClass('disable');
        if (escala != 5) {
            escalaAnterior = escala;
            escala         = escala + 0.1;
            if (escala >= 5) escala = 5;
            if (escala != escalaAnterior) {
                var zoom = parseInt(100 * escala);
                $('#infoZoom').html(zoom + "%");
                $('#infoZoom').fadeIn(500);
                setTimeout(function () {$('#infoZoom').fadeOut(500)}, 2000);
            }
            $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualY + "px)");
            $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
        }
    }
    if (tipo == "down") {
        controlZoom = 1;
        if (escala == 1.1) {
            $('#encajarEnPantalla').addClass('disable');
            $('#zoomDown').addClass('disable');
        }
        $('#zoomUp').removeClass('disable');
        if (escala != 1) {
            escalaAnterior = escala;
            escala         = escala - 0.1;
            if (escala <= 1) escala = 1;
            if (escala != escalaAnterior) {
                var zoom = parseInt(100 * escala);
                $('#infoZoom').html(zoom + "%");
                $('#infoZoom').fadeIn(500);
                setTimeout(function () {$('#infoZoom').fadeOut(500)}, 2000);
            }
            $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualY + "px)");
            $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            var limX = (($('#scroller').width() * escala - $('#scroller').width()) / 2) - (($('#wrapper').width() - $('#scroller').width()) / 2);
            if ($('#wrapper').width() > $('#scroller').width() * escala) limX = 0;
            var limY  = ($('#scroller').height() * escala - $('#scroller').height()) / 2;
            var limYB = (($('#scroller').height() * escala - $('#scroller').height()) / 2) + ($('#scroller').height() - $('#wrapper').height());
            if (actualX >= limX) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "px," + actualY + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + actualY + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + actualY + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + actualY + ")");
                actualX = limX;
            }
            else if (actualX < -limX) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "px," + actualY + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + actualY + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + actualY + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + actualY + ")");
                actualX = -limX;
            }
            if (actualY >= limY) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + limY + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + limY + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + limY + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + limY + ")");
                actualY = limY;
            }
            else if (actualY < -limYB) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + (-limYB) + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + (-limYB) + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + (-limYB) + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + (-limYB) + ")");
                actualY = -limYB;
            }
            if (escala < 1) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + ",0px,0px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
                actualX = 0;
                actualY = 0;
            }
        }
    }
}
var activadoMover = 0;
var actualX       = 0;
var actualY       = 0;
var moviX         = 0;
var moviY         = 0;
function capturarCoordenadasInicio(ev) {
    $('body').addClass('cursorGrabbing');
    var matrizInicioMoz = "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualY + "px)";
    var matrizInicio    = "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")";
    $('#scroller').css("-moz-transform", matrizInicioMoz);
    $('#scroller').css("-ms-transform", matrizInicio);
    $('#scroller').css("-o-transform", matrizInicio);
    $('#scroller').css("-webkit-transform", matrizInicio);
    if (activadoMover == 1) activadoMover = 0; else activadoMover = 1;
    inicioX = ev.clientX;
    inicioY = ev.clientY;
}
function pararDesplazamiento(ev) {
    $('body').removeClass('cursorGrabbing');
    activadoMover = 0;
    var matriz    = $('#scroller').css("-moz-transform");
    if (matriz == undefined) matriz = $('#scroller').css("-ms-transform");
    if (matriz == undefined) matriz = $('#scroller').css("-o-transform");
    if (matriz == undefined) matriz = $('#scroller').css("-webkit-transform");
    var arrayMatriz = matriz.split(',');
    trasX           = parseInt(arrayMatriz[4]);
    trasY           = parseInt(arrayMatriz[5]);
    actualX         = trasX;
    actualY         = trasY;
    var limX        = (($('#scroller').width() * escala - $('#scroller').width()) / 2) - (($('#wrapper').width() - $('#scroller').width()) / 2);
    if ($('#wrapper').width() > $('#scroller').width() * escala) limX = 0;
    var limY  = ($('#scroller').height() * escala - $('#scroller').height()) / 2;
    var limYB = (($('#scroller').height() * escala - $('#scroller').height()) / 2) + ($('#scroller').height() - $('#wrapper').height());
    if (trasX >= limX) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "px," + moviY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + moviY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + moviY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + moviY + ")");
        moviX   = limX;
        actualX = limX;
    }
    else if (trasX < -limX) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "px," + moviY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + moviY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + moviY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + moviY + ")");
        moviX   = -limX;
        actualX = -limX;
    }
    if (trasY >= limY) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "px," + limY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + limY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + limY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + limY + ")");
        moviY   = limY;
        actualY = limY;
    }
    else if (trasY < -limYB) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "px," + (-limYB) + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + (-limYB) + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + (-limYB) + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + (-limYB) + ")");
        moviY   = -limYB;
        actualY = -limYB;
    }
    if (escala < 1) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + ",0px,0px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
        actualX = 0;
        actualY = 0;
    }
}
function desplazarLienzo(ev) {
    var movX = ev.clientX;
    var movY = ev.clientY;
    if (activadoMover == 1) {
        moviX = movX - inicioX + actualX;
        moviY = movY - inicioY + actualY;
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "px," + moviY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + moviY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + moviY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + moviY + ")");
    }
}
function controlaInicio(e) {
    idIni   = e.target.getAttribute("id");
    fInicio = parseInt(idIni.substring(1, 3), 10);
    cInicio = parseInt(idIni.substring(4, 6), 10);
    $("#c" + idIni.substring(1, 3) + "_" + idIni.substring(4, 6)).addClass("activo");
    if (is_touch_device()) {
        $(".casilla").unbind("click");
        $(".casilla").bind("click", controlaMov);
    }
    else {$(".casilla").bind("mouseover", controlaMov);}
    $(".casilla").removeClass("incorrecto");
    palabraActiva = $("#c" + idIni.substring(1, 3) + "_" + idIni.substring(4, 6)).html();
}
var dire = "";
function controlaMov(e) {
    idFin  = e.target.getAttribute("id");
    fFinal = parseInt(idFin.substring(1, 3), 10);
    cFinal = parseInt(idFin.substring(4, 6), 10);
    if (fInicio == fFinal) {
        $(".casilla").removeClass("activo");
        if (fInicio < 10)var fIniciox = "0" + fInicio; else var fIniciox = fInicio;
        if (cInicio <= cFinal) {
            dire          = "E";
            palabraActiva = "";
            for (i = cInicio; i <= cFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + fIniciox + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + fIniciox + "_" + ix).html();
            }
        }
        else if (cInicio > cFinal) {
            dire          = "O";
            palabraActiva = "";
            for (i = cInicio; i >= cFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + fIniciox + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + fIniciox + "_" + ix).html();
            }
        }
        idFinO = "c" + fIniciox + "_" + ix;
    }
    if (cInicio == cFinal) {
        dire = "vertical";
        $(".casilla").removeClass("activo");
        if (cInicio < 10)var cIniciox = "0" + cInicio; else var cIniciox = cInicio;
        if (fInicio <= fFinal) {
            dire          = "S";
            palabraActiva = "";
            for (i = fInicio; i <= fFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + ix + "_" + cIniciox).addClass("activo");
                palabraActiva += $("#c" + ix + "_" + cIniciox).html();
            }
        }
        else if (fInicio > fFinal) {
            dire          = "N";
            palabraActiva = "";
            for (i = fInicio; i >= fFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + ix + "_" + cIniciox).addClass("activo");
                palabraActiva += $("#c" + ix + "_" + cIniciox).html();
            }
        }
        idFinO = "c" + ix + "_" + cIniciox;
    }
    if (Math.abs(cInicio - cFinal) == Math.abs(fInicio - fFinal)) {
        dire = "diagonal";
        $(".casilla").removeClass("activo");
        if ((fInicio <= fFinal) && (cInicio <= cFinal)) {
            dire          = "SE";
            palabraActiva = "";
            for (i = cInicio; i <= cFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio + (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        else if ((fInicio <= fFinal) && (cInicio > cFinal)) {
            dire          = "SO";
            palabraActiva = "";
            for (i = cInicio; i >= cFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio - (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        else if ((fInicio > fFinal) && (cInicio <= cFinal)) {
            dire          = "NE";
            palabraActiva = "";
            for (i = cInicio; i <= cFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio - (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        else if ((fInicio > fFinal) && (cInicio > cFinal)) {
            dire          = "NO";
            palabraActiva = "";
            for (i = cInicio; i >= cFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio + (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        idFinO = "c" + jx + "_" + ix;
    }
    if (is_touch_device()) {
        controlaFinal();
        $(".casilla").unbind("click");
        $(".casilla").bind("click", controlaInicio);
    }
}
var controlAciertos = [];
var final           = 0;
function controlaFinal() {
    $(".casilla").unbind("mouseover");
    for (k = 0; k < pa.length; k++) {
        if (k < 10)var kx = "0" + k; else var kx = k;
        var pai = "";
        for (m = 0; m < pa[k].length; m++) {pai += pa[k].substring(pa[k].length - m - 1, pa[k].length - m);}
        if ((pa[k] == palabraActiva) || (pai == palabraActiva)) {
            $(".activo").removeClass("incorrecto");
            $(".activo").addClass("correcto");
            if (controlAciertos[k] == undefined) {
                $("#divPista" + kx).addClass("correcto");
                $("#divPista" + kx).html(pa[k]);
                actualizaPuntos(k);
                dibujaLinea(idIni, idFinO, pai.length, "acierto", dire, kx);
            }
            controlAciertos[k] = 1;
            final              = "";
            for (l = 0; l < pa.length; l++) {
                if (controlAciertos[l] == undefined) {
                    final = 0;
                    break;
                }
                else final = 1;
            }
            console.log(arrayMitad)
            if (final == 1) {
                for (i = 0; i < pa.length; i++) {
                    pistaUtilizada = 0;
                    if (controlAciertos[i] == 1) {
                        for (j = 0; j < arrayMitad.length; j++) {if (arrayMitad[j] = i) {pistaUtilizada = 1}}
                        responderEscritaXapi(pistaUtilizada, pa[i], pa[i], 1)
                    }
                    else {responderEscritaXapi(pistaUtilizada, pa[i], "", 0)}
                }
                if (puntosReg >= 50) {
                    completarXapi('OK', puntosReg, tiempoReg)
                    cargarPantallaFinal('OK');
                }
                else {
                    completarXapi('KO', puntosReg, tiempoReg)
                    cargarPantallaFinal('noSuperada');
                }
            }
            break;
        }
        else {
            $(".activo").addClass("incorrecto");
            setTimeout(function () {$(".incorrecto").removeClass("incorrecto");}, 1000);
        }
    }
    $(".casilla").removeClass("activo");
}
function dibujaLinea(ini, fin, longitud, malBien, direccion, palabra) {
    var comienzo = "";
    if (direccion == "N") {
        direccion = "vertical";
        comienzo  = fin;
    }
    else if (direccion == "S") {
        direccion = "vertical";
        comienzo  = ini;
    }
    else if (direccion == "E") {
        direccion = "horizontal";
        comienzo  = ini;
    }
    else if (direccion == "O") {
        direccion = "horizontal";
        comienzo  = fin;
    }
    else if (direccion == "NO") {
        direccion = "diagonal";
        comienzo  = fin;
    }
    else if (direccion == "SO") {
        direccion = "diagonalInvertida";
        comienzo  = fin;
    }
    else if (direccion == "NE") {
        direccion = "diagonalInvertida";
        comienzo  = ini;
    }
    else if (direccion == "SE") {
        direccion = "diagonal";
        comienzo  = ini;
    }
    var anchura = tamCasilla * longitud;
    if (direccion.substring(0, 8) == "diagonal") anchura = tamCasilla * Math.SQRT2 * longitud;
    var div = $("<div>", {id: "linea" + palabra, "class": "line " + malBien + " " + direccion, css: {"left": $("#" + comienzo).css("left"), "top": $("#" + comienzo).css("top"), "width": anchura, "height": tamCasilla - 6}});
    $("#lienzo").append(div);
    $(".vertical").css("margin-top", -(tamCasilla - 8));
    $(".diagonal").css("margin-top", -((tamCasilla / 3) + 4));
    $(".diagonal").css("margin-left", -(((tamCasilla / 2) + 4) / 2));
    $(".diagonalInvertida").css("margin-top", (tamCasilla / 2) - 2);
    $(".diagonalInvertida").css("margin-left", ((tamCasilla / 2) + 4) / 2);
}
var puntosReg  = 0;
var arrayMitad = new Array()
function actualizaPuntos(num) {
    var puntosSumar = Math.floor(100 / pa.length);
    if ((puntosMitad == 1) && (palabraMitad == num)) {
        arrayMitad.push(num);
        puntosSumar = Math.round(puntosSumar / 2);
        puntosMitad = 0;
    }
    var puntosActuales = parseInt(puntosReg);
    var puntosTotales  = parseInt(puntosSumar + puntosActuales);
    if (puntosTotales > 100) puntosTotales = 100;
    if ((100 - puntosTotales) < puntosSumar) puntosTotales = 100;
    puntosReg = puntosTotales;
    $("#numPuntos").html(puntosTotales);
}
var puntosMitad  = 0;
var palabraMitad = -1;
function mostrar() {
    $(".casilla").removeClass("incorrecto");
    if ($('#all').width() <= 600) {
        activarPista();
        setTimeout(desactivarPista, 2000);
    }
    for (k = 0; k < pa.length; k++) {
        fila      = fi[k];
        columna   = co[k];
        direccion = di[k];
        palabra   = pa[k];
        if (k < 10)var kx = "0" + k; else var kx = k;
        if (($("#divPista" + kx).html() != pa[k]) && (controlAciertos[k] == undefined)) {
            $("#divPista" + kx).html(pa[k]);
            puntosMitad  = 1;
            palabraMitad = k;
            break;
        }
        else if (controlAciertos[k] == undefined) {
            $("#divPista" + kx).addClass("incorrectoF");
            controlAciertos[k] = 0;
            if (columna < 10)var columnax = "0" + columna; else columnax = columna;
            if (fila < 10)var filay = "0" + fila; else filay = fila;
            var ini = "c" + filay + "_" + columnax;
            if (direccion == "E") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna + i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "SE") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila + i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna + i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "S") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila + i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "SO") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila + i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna - i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "O") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna - i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "NO") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila - i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna - i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "N") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila - i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "NE") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila - i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna + i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            var fin = "c" + filax + "_" + columnay;
            dibujaLinea(ini, fin, palabra.length, "fallo", direccion, kx);
            final = "";
            for (l = 0; l < pa.length; l++) {
                if (controlAciertos[l] == undefined) {
                    final = 0;
                    break;
                }
                else final = 1;
            }
            if (final == 1) {
                for (i = 0; i < pa.length; i++) {
                    for (i = 0; i < pa.length; i++) {
                        pistaUtilizada = 0;
                        if (controlAciertos[i] == 1) {
                            for (j = 0; j < arrayMitad.length; j++) {if (arrayMitad[j] = i) {pistaUtilizada = 1}}
                            responderEscritaXapi(pistaUtilizada, pa[i], pa[i], 1)
                        }
                        else {responderEscritaXapi(pistaUtilizada, pa[i], "", 0)}
                    }
                }
                if (puntosReg >= 50) {
                    completarXapi('OK', puntosReg, tiempoReg);
                    cargarPantallaFinal('OK');
                }
                else {
                    completarXapi('KO', puntosReg, tiempoReg)
                    cargarPantallaFinal('noSuperada');
                }
            }
            break;
        }
    }
}
function completarPantallaFinal() {
    for (k = 0; k < pa.length; k++) {
        crearElementosFinal(k);
        $('#numRespuesta_' + k).html(k + 1);
        if (k < 10) kx = "0" + k; else kx = k;
        $('#pCorrecta_' + k).html(pa[k]);
        if (controlAciertos[k] != 1) $("#contentRespuesta_" + k).addClass('respuestaIncorrecta');
    }
    $('.accordionButton').click(function () {
        $('.accordionButton').removeClass('on');
        $('.accordionContent').slideUp('slow');
        if ($(this).next().is(':hidden') == true) {
            $(this).addClass('on');
            $(this).next().slideDown('slow');
            cargarFinal(this);
        }
    });
    $('.accordionContent').hide();
}
function crearElementosFinal(k) {
    var cadenaHTML = "";
    cadenaHTML += "<li>";
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {cadenaHTML += "<div class='accordionButton' id='accordion_" + k + "'>";}
    }
    cadenaHTML += "<div class='contentRespuesta' id='contentRespuesta_" + k + "'>";
    cadenaHTML += "<span class='numRespuesta' id='numRespuesta_" + k + "'></span>";
    cadenaHTML += "<span class='txtRespuesta'><span id='pCorrecta_" + k + "'></span></span>";
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {cadenaHTML += "<span title='" + txtInfoAdicional + "' class='iExtraInfo'></span>";}
    }
    cadenaHTML += "</div>";
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {cadenaHTML += "</div>";}
    }
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {
            cadenaHTML += "<div class='accordionContent'>";
            cadenaHTML += "<div class='contentInfoRespuesta'>";
            cadenaHTML += "<div class='txtExtraInfo' id='txtExtraInfo_" + k + "'></div>";
            cadenaHTML += "</div>";
            cadenaHTML += "</div>";
        }
    }
    cadenaHTML += "</li>";
    $("#listaFinal").html($("#listaFinal").html() + cadenaHTML);
}
function cargarFinal(enlace) {
    var idAccordion = $(enlace).attr('id');
    var k           = parseInt(idAccordion.substring(10, 13), 10);
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {$("#txtExtraInfo_" + k).html(fe[k]);}
    }
}