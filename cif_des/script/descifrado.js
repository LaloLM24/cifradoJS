class descifrado
{
    constructor(mensajeCifrado, llave)
    {
        this.mensajeCifrado = mensajeCifrado;
        this.llave = llave;
    }

    get descifrado()
    {
        var tamBloque = tamanioDeBloque(this.mensajeCifrado);
        var mensajeEnBloque = new Array();
        mensajeEnBloque = mensajeCifradoEnBloques(this.mensajeCifrado, tamBloque);
        var llaveEnBloque = new Array();
        llaveEnBloque = llaveBloque(this.llave,tamBloque );
        var mensajeXOR = new Array();
        mensajeXOR = XOR (mensajeEnBloque, llaveEnBloque, tamBloque);
        var mensajeDescifrado = ordenamiento(mensajeXOR, tamBloque);
        return mensajeDescifrado;
    }

}

function tamanioDeBloque(texto)
{
    var tamanioMensaje = texto.length;
    tamanioMensaje = tamanioMensaje /3;
    var tamanioBloque = Math.sqrt(tamanioMensaje);
    return tamanioBloque;
}

function mensajeCifradoEnBloques(mensajeCifrado, tamanioDeBloque)
{
    var mensajeEnBloque = new Array(2);
    var contador = 0;
    var contador2 = 3;
    for(var a = 0; a < tamanioDeBloque; a++)
    {
        mensajeEnBloque[a] = new Array(tamanioDeBloque);
        for(var b = 0; b<tamanioDeBloque; b++)
        {
            mensajeEnBloque[a][b] = parseInt(mensajeCifrado.substring(contador,contador2));
            contador = contador + 3;
            contador2 = contador2 + 3;
            console.log (mensajeEnBloque[a][b]);
        }
    }
    return mensajeEnBloque;
}

function llaveBloque(llave, tamanioBloque)
{
   var tamanioMatriz = tamanioBloque * tamanioBloque;
   var contador = 0;
   var comprobador = false;
   var matrizResultado = new Array(2);

   do
   {
       if(llave.length < tamanioMatriz)
       {
           llave = llave + '\u0000';
       }
       else comprobador = true;

   }while(comprobador == false);
   console.log(llave);
   for(var a = 0; a < tamanioBloque; a++ )
   {
       matrizResultado[a] = new Array (tamanioBloque);
       for(var b = 0; b < tamanioBloque; b++)
       {
           matrizResultado [a][b] = llave[contador];
           console.log(a +" " +  matrizResultado [a][b]);
           contador ++;
       }
   }
   return matrizResultado;
}


function XOR (mensaje, llave, tamanioBloque)
{
    var mensajeDescifrado = "";
    var cadenaCaracteres = new Array(2);
    var cadena = new Array(2);

    for(var a = 0; a < tamanioBloque; a ++)
    {
        cadenaCaracteres[a] = new Array(tamanioBloque);
        cadena [a] = new Array(tamanioBloque);
        for(var b = 0; b < tamanioBloque; b ++)
        {
           cadena [a][b] = mensaje[a][b] ^ llave[a][b].charCodeAt();
           cadenaCaracteres [a][b] = String.fromCharCode(cadena[a][b]);
           console.log("cadena " + cadena[a][b] + " " + cadenaCaracteres[a][b]);
        }
    }
  
    return cadenaCaracteres;
}

function ordenamiento (matrizNoOrdenada, tamBloque)
{
    var ordenado = "";
    var temporal = tamBloque - 1;
    var final = new Array(2);
    for(var a = 0; a < tamBloque; a++)
    {
        final[a] = new Array(tamBloque);
        for(var b = 0; b < tamBloque; b++)
        {
            final[a][b] = matrizNoOrdenada[a][temporal];
            temporal --;
            ordenado = ordenado + final[a][b];
        }
        temporal = tamBloque - 1;
    }

    console.log("Mensaje descifrado es: " + ordenado);
    return ordenado;
}

function principal()
{
    /*
    var descifrar = new descifrado("006148004011144027120113004", "hñiañhxqa");
    descifrar.descifrado;
    */
   var mensajeParaDescifrar = document.getElementById('entrada').value;
   var json = JSON.parse(mensajeParaDescifrar);
   var mes = json.mes;
   var key = json.key;
   var descifrar = new descifrado(mes, key);
   var res = descifrar.descifrado;
   document.getElementById('resultado').innerHTML = res;

}