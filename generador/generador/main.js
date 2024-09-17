let cantidad=document.getElementById("cantidad");
let botton=document.getElementById("generar");
let contraseña= document.getElementById("contrasena");
let reset= document.getElementById("reset");
let copiar = document.getElementById("copiar");

let feedback = document.createElement("p");
feedback.classList.add('retro');
contraseña.insertAdjacentElement('afterend',feedback);

const cadenaCaracteres="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;':,./<>?";

const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minus = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";
const especial= "!@#$%^&*()_+[]{}|;':,./<>?";

cantidad.addEventListener("input", function(){
    if(cantidad.value<0){
        cantidad.value='';

    }
})

function generar (){
    botton.addEventListener("click", ()=>{
        let valor=cantidad.value;
        let num_valor=parseInt (valor);
        console.log(typeof valor);
        console.log(typeof num_valor);
        console.log('La cantidad de caracteres actual es:' + valor);
        if(num_valor < 8){
            alert('La cantidad de caracteres debe ser mínimo 8');
            contraseña.value='';
        } else{

        let key='';
        reset.style.display="block";
        copiar.style.display="block";

        for(let cuenta=0; cuenta<num_valor;cuenta++){
            
            let aleatoryChar = cadenaCaracteres[Math.floor(Math.random() * cadenaCaracteres.length)];
            console.log(aleatoryChar);

            key+=aleatoryChar; 

        }

        contraseña.value=key;
        console.log('Contraseña: '+ key);

         // Verificar la fortaleza de la contraseña
         let hasMayus = validation(key, mayus);
         let hasMinus = validation(key, minus);
         let hasNum = validation(key, num);
         let hasEspecial = validation(key, especial);
 
         let tiposPresentes = 0;
 
         if (hasMayus) tiposPresentes++;
         if (hasMinus) tiposPresentes++;
         if (hasNum) tiposPresentes++;
         if (hasEspecial) tiposPresentes++;
 
         let esFuerte = tiposPresentes === 4;
         let esMedia = tiposPresentes === 3;
         let esBaja = tiposPresentes === 2;

        

        if(esFuerte){
            feedback.textContent="La contraseña es fuerte";
            feedback.style.color="#A2CA71";
        } else if(esMedia){
            feedback.textContent="La seguridad de la contraseña es media";
            feedback.style.color="#FF6600"
        } else if(esBaja){
            feedback.textContent="La contraseña es débil"
            feedback.style.color="red";
        }else{
            feedback.textContent="La contraseña es muy débil"
            feedback.style.color="red";
        }
    
        }
    }
    )
    
}

 // Función para copiar la contraseña al portapapeles
 copiar.addEventListener("click", () => {
    navigator.clipboard.writeText(contraseña.value)
        .then(() => {
            alert('Contraseña copiada al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar la contraseña: ', err);
        });
});

reset.addEventListener("click", ()=>{
        contraseña.value='';
        cantidad.value='';
        feedback.textContent='';
        copiar.style.display="none";
       
    })



generar();


function validation (str, set){
    for(let char of str) {
        if(set.includes(char)){
            return true;
        }
    }
    return false;

}
