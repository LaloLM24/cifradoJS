/*
 * Algoritmo de cifrado realizado por:
 * Eduardo López Melo
 */

 class cifrado
 { 

     constructor(mensaje, llave)
     {
        this.mensaje = mensaje;
        this.llave = llave;
     }
 

 get cifrado()
 {
     var longitudMensaje = calcularLongitud(this.mensaje);
     var longitudLlave = calcularLongitud(this.llave);
     var tamBloque = tamanioBloque(longitudMensaje, longitudLlave);
     var matrizMensaje =  new Array();
     matrizMensaje = matriz(this.mensaje, tamBloque);
     var matrizLlave = new Array();
     matrizLlave = matriz(this.llave, tamBloque);
     var mensajeInvertido = new Array ();
     mensajeInvertido = invertirMensaje(matrizMensaje, tamBloque);
     var mensajeCifrado = new Array();
     mensajeCifrado = XOR(mensajeInvertido, matrizLlave, tamBloque);
    return mensajeCifrado;
    }

}
 // Se calcula la longitud del texto
function calcularLongitud(texto)
{
    var longitud = 0;
    var longitud = texto.length;
    console.log(longitud);
    return longitud;
}

/*
 * Se calcula la longitud del mensaje 
 * y se calcula la longitud de la llave
 */

function tamanioBloque(longMensaje, longLlave)
{
    var tamBloque = 0;
    var raizDecimal = 0.0;
    var raizEntera = 0;
    var comprobacion = false;

    if (longMensaje>=longLlave)
    {
        do
        {
            raizDecimal = Math.sqrt(longMensaje);
            raizEntera = parseInt(Math.sqrt(longMensaje));
            
            if (raizDecimal != raizEntera)
            {
                longMensaje ++;    
            }
            else
            {
                comprobacion = true;
            }
        }while(comprobacion == false);
        tamBloque = raizEntera;
        console.log(tamBloque);
        return tamBloque;
    }
    else
    {
        do
        {
            raizDecimal = Math.sqrt(longLlave);
            raizEntera = parseInt(Math.sqrt(longLlave));

            if(raizDecimal>raizEntera)
            {
                longLlave ++;
            }
            else
            {
                comprobacion = true;
            }
        }while(comprobacion == false);
        tamBloque = raizEntera;
        console.log(tamBloque);
        return tamBloque;
    }

}

/*
 * Se crea una matrriz con el 
 * tamaño de bloque estipulado
 */

 function matriz(texto, tamanioBloque)
 {
    var tamanioMatriz = tamanioBloque * tamanioBloque;
    var contador = 0;
    var comprobador = false;
    var matrizResultado = new Array(2);

    do
    {
        if(texto.length < tamanioMatriz)
        {
            texto = texto + '\u0000';
        }
        else comprobador = true;

    }while(comprobador == false);
    console.log(texto);
    for(var a = 0; a < tamanioBloque; a++ )
    {
        matrizResultado[a] = new Array (tamanioBloque);
        for(var b = 0; b < tamanioBloque; b++)
        {
            matrizResultado [a][b] = texto[contador];
            console.log(a +" " +  matrizResultado [a][b]);
            contador ++;
        }
    }
    return matrizResultado;
 }

 function invertirMensaje(matriz, tamanioBloque)
 {
    var tamBloqueTemp = tamanioBloque - 1;
    var c = tamBloqueTemp;
    var mensajeInvertido = new Array(2);
    
    for(var a = 0; a < tamanioBloque; a ++)
    {
        mensajeInvertido[a] = new Array (tamanioBloque);
        for(var b = 0; b < tamanioBloque; b++)
        {
            mensajeInvertido [a][b] = matriz[a][c];
            console.log(a + " "+mensajeInvertido[a][b]);
            c --;
        }
        c = tamBloqueTemp;
    }

    return mensajeInvertido;
 }

 function XOR (mensaje, llave, tamanioBloque)
 {
     var mensajeCifrado = "";
     var cadenaString = new Array(2);
     var cadena = new Array(2);

     for(var a = 0; a < tamanioBloque; a ++)
     {
         cadenaString[a] = new Array(tamanioBloque);
         cadena [a] = new Array(tamanioBloque);
         for(var b = 0; b < tamanioBloque; b ++)
         {
            cadena [a][b] = mensaje[a][b].charCodeAt() ^ llave[a][b].charCodeAt();
            cadenaString [a][b] = cadena[a][b].toString();
            console.log("cadena " + cadena[a][b]);
            if(cadenaString[a][b] == "0")
            {
                cadenaString[a][b] = "000";
            }
            else if(cadenaString[a][b].length == 1)
            {
                cadenaString[a][b] = "00" + cadenaString[a][b];
            }
            else if(cadenaString[a][b].length == 2)
            {
                cadenaString[a][b] = "0"+ cadenaString[a][b];
            }

            mensajeCifrado = mensajeCifrado + cadenaString[a][b];
         }
     }

     console.log("El mensaje cifrado es:  "  + mensajeCifrado);
     return mensajeCifrado;
 }


function principal()
 {
    var str = "";
    var ref = "abcdefghijklmnñopqrstuvwxyz";
    for (var i=0; i<9; i++)
    {
    str += ref.charAt(Math.floor(Math.random()*ref.length));
    }    

    console.log(str);
    var mensajeParaCifrar = document.getElementById('mensaje').value;
    console.log(mensajeParaCifrar);
    var ocultar = new cifrado(mensajeParaCifrar, str );
    var convertir = 
    {
        "mes" : ocultar.cifrado,
        "key" : ocultar.llave
    }

    var json =  JSON.stringify(convertir);
    // console.log(json);
    //console.log(JSON.stringify(convertir));
    document.getElementById('resultado').innerHTML = json;
 }
