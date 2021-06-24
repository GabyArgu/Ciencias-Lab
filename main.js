const input = document.querySelector("input"); 
const btn = document.querySelector("button"); 

const inicio = document.getElementById("contenedorP"); 
const error = document.getElementById("contenedor0"); 
const correcto = document.getElementById("contenedor1"); 

const btnagain = document.getElementsByClassName("btntryagain"); 
const mensaje0 = document.getElementById("mensaje0"); 
const mensaje1 = document.getElementById("mensaje1"); 


initialForm() 

//Agregar un espacio automatico en el Input con Jquery (Habilitar Delete y Suprimir)

$(document).ready(Principal);
    function Principal(){
        let flag1 = true;

        $(document).on('keydown','[id=cardinput]',function(e){
            flag1 = true;

          if (e.keyCode == 8 || e.keyCode == 46) {
              flag1 = false;
          }
          
            if($(this).val().length == 4 && flag1) {
                $(this).val($(this).val()+" ");
            }
          
          if($(this).val().length == 9 && flag1) {
                $(this).val($(this).val()+" ");
            }
          
          if($(this).val().length == 14 && flag1) {
                $(this).val($(this).val()+" ");
            }
        });
    }

//Eliminar demás formularios   

function initialForm() {
    error.classList.add("desaparecer");
    correcto.classList.add("desaparecer");
}

//Limitar la cantidad de digitos ingresados permitidos

input.addEventListener('input',function(){
    
    if (input.value.length > 14) {
        input.value = input.value.slice(0,19); 
    }
  })

//Función eliminar Espacios Array

Array.prototype.clean = function( deleteValue ) {
    for ( let i = 0, j = this.length ; i < j; i++ ) {
      if ( this[ i ] == deleteValue ) {
        this.splice( i, 1 );
        i--;
      }
    }
    return this;
  };

//Función de Validar ya los digitos de la tarjeta

function validar() {
    
    //Pasos:

    //Guardo en esta variable el patrón que estoy ocupando
    let pattern = /[0-9, ]{15,}/;

        //Si lo ingresado en el "input" cumple el patron se ejecuta esto
        if (pattern.test(input.value)) {
 
            //Declaro el tipo de boton, del boton comprobar, como "Button" ya que antes estaba en "Submit" y eso me daria error
            btn.setAttribute("type", "button");

            //Obtener Array de los digitos ingresados y eliminar espacios en blanco.
            let arraycard = Array.from(input.value);
            arraycard.clean(" ");

            //Convertir Array obtenido en un Array Númerico, y de paso darle vuelta con Array.reverse()
            arraycard = Array.from(arraycard, Number).reverse()

            //Obtener los digitos ingresados para mostrarlos posteriormente en las pantallas de carga.
            let numeros = Array.from(input.value);
            numeros.clean(" ");

            //Inicia algoritmo de luhn

            //Reviso digito por digito con un for, y solo veo los numero impares
            for (let i = 1; i < arraycard.length; i+=2) {

                //Guardo en esta variable, el numero de la tarjeta que se esta evaluando
                let impar = arraycard[i]

                //Lo multiplico x2, y sustituyo el mismo numero, con el nuevo resultado
                arraycard[i]=impar*2;

                //Si el nuevo resultado es mayor a 10, se ejecuta esto

                //Codigo que no se toca -->
                if (arraycard[i]>=10) {
                    let xs = String(arraycard[i])
                    let suma = 0;
                    
                    //Suma de Dígitos de los Números mayores a 10.
                    xs = xs.split('').forEach(xs => suma += parseInt(xs));

                    //Vuelvo a sustituir el numero antiguo por el nuevo numero
                    arraycard[i]=suma;
                    
                }
                
            }

            //Suma de todos los nuevos numeros del Array
            let suma2 = 0;
            arraycard.forEach (function(sumarraycard){
                suma2 += sumarraycard;
            });


            let cardnumber = "";

            //Mostrar los números de la tarjeta censurados en las pantallas de carga
            for (let i = 0; i < numeros.length; i++) { //Reviso la longitud de la cantidad de digitos
                
                if (numeros.length==16 && i>11) { //Si son 16 digitos, terminara de censurar los digitos en el digito 12, ya que recuerda que empieza a contar desde 0, por eso alli dice 11.
                    cardnumber = cardnumber+numeros[i]
                } else if (numeros.length==15 && i>10) { //Si son 15 digitos, termina de censurar en el digito 11, misma logica de arriba.
                    cardnumber = cardnumber+numeros[i]
                } else {
                    cardnumber = cardnumber+"#"; //Codigo para censurar digitos
                };
            }

            //Condición para saber que pantalla mostrar
            if (suma2%10==0) { //Si el numero final es multiplo de 10, se muestra esto
                inicio.classList.add("desaparecer")
                error.classList.add("desaparecer")
                correcto.classList.remove("desaparecer")
                correcto.classList.add("animacion")

                mensaje1.innerText = cardnumber;

            } else { //Si no te sale la pantalla de error
                inicio.classList.add("desaparecer")
                correcto.classList.add("desaparecer")
                error.classList.remove("desaparecer")
                error.classList.add("animacion")

                mensaje0.innerText = cardnumber;
            }
        }
    }

//Boton Volver a Intentar, te devuelve a la pantalla inicial

function again() {
    input.value="";
    inicio.classList.remove("desaparecer")
    correcto.classList.add("desaparecer")
    error.classList.add("desaparecer")
    btn.setAttribute("type", "submit");    
}