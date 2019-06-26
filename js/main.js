/*-----------------------------------------------------------------------------------------------------------------
                                            PRIMER PROYECTO NADXIBA
Juego de trivia, tiene tres secciones:

1ra.- Bienvenida y muestra botón para iniciar el juego.
2da.- Donde se desarrolla el juego; se despliega pregunta, opciones, formulario de la respuesta y botón.
3ra.- Pide el nombre del jugador, muestra el score final de la sesión y la lista de scores.

Se utiliza el constructor "construyePregunta" para generar las preguntas-objeto, cada una consta de: pregunta, lista
de respuestas e índice de respuesta correcta; además se utilizan métodos de este mismo constructor para desplegar
(".prototype.imprime") y evaluar (".prototype.evalua") las preguntas en la sección correspondiente.

Se utiliza el constructor "construyeScore" para generar los score-objetos que contendrán: nombre del jugador, aciertos
y total  de preguntas mostradas.

La función "final" se encarga de desplegar la información del score-objeto en la sección tres y también de  guardarlo
en el localStorage. Por último, la función "initPregunta" se ejecuta al inicio del juego y en adelante da la función
"sigPregunta" se encarga de evaluar y mostrar la siguiente pregunta (en ese orden).
-------------------------------------------------------------------------------------------------------------------*/


//// Constructores
preguntas = []

var construyePregunta = function(pregunta, respuestas, indiceCorrecto){
    this.enunciado = pregunta;
    this.respuestas = respuestas;
    this.correcta = indiceCorrecto;
    preguntas.push(this);
};

var construyeScore = function(correctas, totales, nombre){
    this.correctas = correctas;
    this.totales = totales;
    this.nombre = nombre;
};


//// Lista de preguntas
var pregunta1 = new construyePregunta('¿Cuánto es 3 + 5?', [1, 3, 8, 10], 2);
var pregunta2 = new construyePregunta('¿En qué mes estamos?', ['enero', 'febrero', 'agosto','junio'], 3);
var pregunta3 = new construyePregunta('¿De qué color es el caballo blanco de Napoleón?', ['azul', 'blanco', 'amarillo', 'rojo'], 1);
var pregunta4 = new construyePregunta('¿Cuánto es la raiz de 100?', [Math.PI, 10, -42, 'a'], 1);
var pregunta5 = new construyePregunta('¿Cuántos gatos tiene Citla?', [Math.random(), 2, 3100, 8], 1);
var pregunta6 = new construyePregunta('¿Qué es Nadxiba?', ['Empresa', 'Bar', 'Salón de juegos', 'Café'], 0);
var pregunta7 = new construyePregunta('Un gran poder,...', ['...se lo lleva la corriente','...Dios lo ayuda','...conlleva una gran responsabilidad','...whaaaaaaat?'], 2);
var pregunta8 = new construyePregunta('Mítico personaje amigo de todos los niños, que se dice conoció a los dinosaurios.',['Chabelo','El Chavo del 8','Elba Esther Gordillo','Cepillín'], 0);
var pregunta9 = new construyePregunta('¿En qué año se fundo Nadxiba? ', [2020, 2019, 2018, 2017], 1);
var pregunta10 = new construyePregunta('¿Cuántos fundadrores tiene Nadxiba?', [1, 3, 8, 5], 3);
var pregunta11 = new construyePregunta('¿A Mario le gustan los perros?', ['si', 'no', 'si y no', '13'], 0);
var pregunta12 = new construyePregunta('¿De qué carrera son la mayorìa de los fundadores?', ['Fìsica', 'Quìmica', 'Matemàticas', 'No tienen carrera'], 0);
var pregunta13 = new construyePregunta('¿Cuántos planetas hay en el sistema Solar?', [9, 8, 7, 10], 1);
var pregunta14 = new construyePregunta('¿Quién propuso el nombre de la empresa?', ['Mario', 'Manu','Arturo', ' Bryan'], 3);
var pregunta15 = new construyePregunta('¿La empresa tiene futuro?', ['No', 'Sì', 'No sè', 'Tal vez'], 2);


//// Métodos del prototype de construyePregunta
construyePregunta.prototype.imprime = function(){
    // Despliega la pregunta y las opciones en la página web
    var titulo = document.querySelector("#enunciado");
    titulo.innerHTML = this.enunciado;
    var titLi= document.getElementById("titList");
    titLi.innerHTML = "Opciones:";
    var lista = this.respuestas;
    document.getElementById("listOpcs").innerHTML = '';
    for(i=0;i<lista.length;i++){
        var node = document.createElement("LI");
        var opcion = document.createTextNode(lista[i]);
        node.appendChild(opcion);
        document.getElementById("listOpcs").appendChild(node);
    };
};

construyePregunta.prototype.evalua = function(respCorrecta){
    // Evalúa la respuesta introducida por el jugador
    n = this.correcta;
    if(respCorrecta === n){
        return ['Acertaste :D', 1];
    }else{
        return ['Fallaste :C', 0] ;
    }
};


//// Funciones asociadas con los eventos
var correctas = 0;
var totales = 0;
var selector = 0;

var initPregunta = function(){
    // Da inicio al juego, despliega una primer pregunta en la página web y los elementos del DOM necesaarios
    selector = Math.floor(preguntas.length*Math.random());
    preguntas[selector].imprime();
    document.getElementById('init').style.display = 'none';
    document.getElementById('sig').style.display = 'block';
    document.getElementById('entrada').style.display = 'block';
};

var sigPregunta = function(){
    // Valida y evalúa la respuesta introducida por el jugador y despliega una siguiente pregunta
        // ESTRICTAMENTE en ese orden
    var respCorrecta = document.getElementById("respuesta").value;
    if(0<=respCorrecta && respCorrecta<4 && respCorrecta!=""){
        var n = parseInt(respCorrecta);
        var result = preguntas[selector].evalua(n);
        correctas = correctas + result[1];
        totales++;
        console.log(result[0] + '! Llevas ' + correctas + ' correctas.'); // Esto debe hacerlo en alertas o en un apartado de la página web
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

var final = function(correctas, totales){
    // Pide el nombre al jugador y guarda su score
    alert('Gracias por haber jugado. \n' + 'Puntaje: ' + correctas + ' aciertos de ' + totales + ' preguntas.');
    nombre = prompt('Introduce tu nombre.'); // Falta validar el nombre
    window[nombre] = new construyeScore(correctas, totales, nombre);
    localStorage.setItem(nombre, JSON.stringify(window[nombre]));
    // Falta que se despliegue la tabla de scores guardados
//Falta arreglar el error que tiene, no logrè encontrarlo, sin embargo agregue el botòn que faltaba para reiniciar el juego,
//El problema es que no evalùa las preguntas y te regresa al inicio, me tomo un buen rato intentar ver el problema pero fallè y solamente agregue preguntas y el nuevo botòn



};


//// Ligas con eventos en objetos del DOM
document.getElementById('init').onclick = initPregunta;
document.getElementById('sig').onclick = sigPregunta;
document.getElementById('reinit').onclick = initPregunta;
