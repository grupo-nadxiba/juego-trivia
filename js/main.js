/*-----------------------------------------------------------------------------------------------------------------
                                            PRIMER PROYECTO NADXIBA
Juego de trivia, tiene tres secciones: 

1ra.- Bienvenida y muestra boton para iniciar el juego. 
2da.- Donde se  desarrolla el juego; se despliega pregunta, opciones, formulario de la respuesta y botón. 
3ra.- Pide el nombre del jugador, muestra el score final de la sesión y la lista de scores. 

Se utiliza el constructor "construyePregunta" para generar las preguntas-objeto, cada una consta de: pregunta, lista
de respuestas e indice de respuesta correcta; además se utilzan métodos de este mismo constructor para desplegar 
(".prototype.imprime") y evaluar (".prototype.evalua") las preguntas en la sección correspondiente. 

Se utiliza el constructor "construyeScore" para generar los score-objetos que contrendran: nombre del jugador, aciertos
y total  de preguntas mostradas. 

La función "final" se encarga de desplegar la información del score-objeto en la sección tres y también de  guardarlo 
en el local storage. Por último, la función "initPregunta" se ejecuta al inicio del juego y en adelante da la función 
"muestraPregunta" se encarga de evaluar y mostrar la siguinte pregunta (en ese orden).
-------------------------------------------------------------------------------------------------------------------*/

var construyePregunta = function(pregunta, respuestas, indiceCorrecto){
	this.enunciado = pregunta;
  	this.respuestas = respuestas;
  	this.correcta = indiceCorrecto;
};

var construyeScore = function(correctas, totales, nombre){
	this.correctas = correctas;
  	this.totales = totales;
  	this.nombre = nombre;
};

var pregunta1 = new construyePregunta('¿Cuánto es 3 + 5?', [1, 3, 8, 10], 2);
var pregunta2 = new construyePregunta('¿En qué mes estamos?', ['enero', 'febrero', 'agosto','junio'], 3);
var pregunta3 = new construyePregunta('¿De qué color es el caballo blanco de Napoleón?', ['azul', 'blanco', 'amarillo', 'rojo'], 1);
var pregunta4 = new construyePregunta('¿Cuánto es la raiz de 100?', [Math.PI, 10, -42, 'a'], 1);
var pregunta5 = new construyePregunta('¿Cuántos gatos tiene Citla?', [Math.random(), 2, 3100, 8], 1);
var pregunta6 = new construyePretunta('¿Qué es Nadxiba ?', ['Empresa', 'Bar', 'Salón de juegos', 'Café'])

var preguntas = [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6];

construyePregunta.prototype.imprime = function(){
    var titulo = document.querySelector("#enunciado");
    titulo.innerHTML = this.enunciado;
    var titLi= document.getElementById("titList");
    titLi.innerHTML = "Opciones:";
      
    lista = this.respuestas;

    document.getElementById("listOpcs").innerHTML = '';

    for(i=0;i<lista.length;i++){
        var node = document.createElement("LI");
        var opcion = document.createTextNode(lista[i]);
        node.appendChild(opcion);
        document.getElementById("listOpcs").appendChild(node);
    };

};
       
construyePregunta.prototype.evalua = function(respCorrecta){
    n = this.correcta;
    if(respCorrecta === n){
        return ['Acertaste :D', 1];
    }else{
        return ['Fallaste :C', 0] ;
    }
};


var correctas = 0;
var totales = 0;
var selector = 0;

var final = function(correctas, totales){
	alert('Gracias por haber jugado. \n' + 'Puntaje: ' + correctas + ' aciertos de ' + totales + ' preguntas.');
	nombre = prompt('Introduce tu nombre.');
	window[nombre] = new construyeScore(correctas, totales, nombre);
	localStorage.setItem(nombre, JSON.stringify(window[nombre]));
};

//Función que se ejecuta solo una vez al inciar el juego, despliega las preguntas en la página web y
//para evaluar las respués es necesario ejecutar la función "sigPregunta"
var initPregunta = function(){
    selector = Math.floor(preguntas.length*Math.random());
    preguntas[selector].imprime();
    document.getElementById('init').style.display = 'none';
    document.getElementById('sig').style.display = 'block';
    document.getElementById('entrada').style.display = 'block';
};

//Función principal que evalua la respuesta dada por el usuario. después despliega la siguiente pregunta
//y sus opciones. La función se ejecuta estrictatemente en el orden explicado.
var sigPregunta = function(){
    var respCorrecta = document.getElementById("respuesta").value;
    if(0<=respCorrecta && respCorrecta<4 && respCorrecta!=""){
        var n = parseInt(respCorrecta);
        var result = preguntas[selector].evalua(n)
        correctas = correctas + result[1];
        totales++;
        console.log(result[0] + '! Llevas ' + correctas + ' correctas.');
        document.getElementById('respuesta').value = '';
        document.getElementById('respuesta').placeholder = 'Introduce tu respuesta';
        selector = Math.floor(preguntas.length*Math.random());
    }else if(respCorrecta === "salir"){
        final(correctas, totales);
    }else{
    	alert('La respuesta es inválida, escribe una opción válida o "salir" para terminar el juego y da click en SIGUIENTE.');
    }
    preguntas[selector].imprime();
}

document.getElementById('init').onclick = initPregunta;
document.getElementById('sig').onclick = sigPregunta;
