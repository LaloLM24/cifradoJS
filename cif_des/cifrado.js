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
 }

 function cifrar()
 {
     var longitudMensaje = calcularLongitud(this.mensaje);
     var longitudLlave = calcularLongitud(this.llave);
     var tamBloque = tamanioBloque(longitudMensaje, longitudLlave);
     var matrizMensaje = matriz(mensaje, tamanioBloque);
     var matrizLlave = matriz(llave, tamanioBloque);
     var mensajeInvertido = invertirMensaje(matrizMensaje, tamanioBloque);
     var mensajeCifrado = XOR(mensajeInvertido, matrizLlave, tamanioBloque);
 }
 // Se calcula la longitud del texto
function calcularLongitud(texto)
{
    var longitud = 0;
    var longitud = texto.length;
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
        tamBloque = raizEntera();
        return tamanioBloque;
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
        tamanioBloque = raizEntera;
        return tamanioBloque;
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

    var matrizResultado = new Array();
    do
    {
        if(texto.length < tamanioMatriz)
        {
            texto = texto + '\u0000';
        }
        else comprobador = true;

    }while(comprobador == false);

    for(var a = 0; a < tamanioBloque; a++ )
    {
        for(var b = 0; b < tamanioBloque; b++)
        {
            matrizResultado [a][b] = texto[contador];
            console.log(matrizResultado [a][b]);
            contador ++;
        }
    }
    return matrizResultado;
 }

 function invertirMensaje(matriz, tamanioBloque)
 {
    var tamBloqueTemp = tamanioBloque - 1;
    var c = tamBloqueTemp;
    var mensajeInvertido = new Array();
    
    for(var a = 0; a < tamanioBloque; a ++)
    {
        for(var b = 0; b < tamanioBloque; b++)
        {
            mensajeInvertido [a][b] = matriz[a][c];
            c --;
        }
        c = tamBloqueTemp;
    }

    return mensajeInvertido;
 }

 function XOR (mensaje, llave, tamanioBloque)
 {
     var mensajeCifrado = "";
     var cadenaString = new Array();
     var cadena = new Array();

     for(var a = 0; a < tamanioBloque; a ++)
     {
         for(var b = 0; b < tamanioBloque; b ++)
         {
            cadena [a][b] = mensaje[a][b] ^ parseInt(llave[a][b]);
            cadenaString [a][b] = cadena[a][b].toString();

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