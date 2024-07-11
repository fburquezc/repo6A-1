let xhttp; // para AJAX
let btnAlmacenar = document.getElementById("btnAlmacenar");
let btnListar = document.getElementById("btnListar");
let listaAlumnos = document.getElementById("listaRegistros");

btnAlmacenar.addEventListener("click", almacenarNuevaPersona);
btnListar.addEventListener("click", listarPersonasSesion);



//leemos las personas y las almasenamos en sessionStorage
listarPersonas();




function almacenarNuevaPersona(evt) {
    evt.preventDefault();

    let obj = {
        nombre: document.getElementById("nombre").value,
        grupo: document.getElementById("grupo").value
    }

    let JsonData = JSON.stringify(obj);

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = procesarAlmacenamiento;

    xhttp.open("POST", "almacenar.php", true);
    xhttp.send(JsonData);
}

function procesarAlmacenamiento() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log("R = " + xhttp.responseText);
        if (xhttp.responseText == "1") {
            listarPersonas();
            alert("Almacenado con Exito!!!!");
        } else {
            alert("Error al almacenar....");
        }
    }
}

function listarPersonas() {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = procesarListado;

    xhttp.open("GET", "listar.php", true);
    xhttp.send();
}

function procesarListado() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

        let registros = JSON.parse(xhttp.responseText);

        console.log(registros);

        let strPersonas = JSON.stringify(registros);  //hecemos texto los registros

        sessionStorage.setItem("personas",strPersonas);

    }
}

function listarPersonasSesion(){

    let strPersonas = sessionStorage.getItem("personas");

    let registros = JSON.parse(strPersonas);

    let listaRegistros = document.getElementById("listaRegistros");
    let ptrSelect = document.getElementById("cbRegistros");

        listaRegistros.innerHTML = "";

        if (registros.length > 0) {
            let ul = document.createElement("ul");
            ul.setAttribute("id","listaAlumnos");
            registros.forEach(registro => {
                let li = document.createElement("li");
                li.setAttribute("class","itemAlumno");
                li.setAttribute("idItem",registro.id);
                li.textContent = `${registro.nombre} - ${registro.grupo}`;
                ul.appendChild(li);

                //select
                let op = document.createElement('option');
                op.value = registro.id;
                op.textContent = `${registro.nombre}`;

                ptrSelect.appendChild(op);
            });

            listaRegistros.appendChild(ul);
        } else {
            listaRegistros.textContent = "No hay registros.";
        }
}


/***** click en lista */

listaAlumnos.addEventListener("click",function(evt){

    console.log(evt);

    console.log(evt.target);

    if(evt.target.classList.contains("itemAlumno")){

        console.log(evt.target.attributes.iditem.value);

        console.log(evt.target.innerText);

    }

   

});