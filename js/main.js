import {monumentos} from "../json/monumentos.js";

document.getElementById("search").addEventListener('submit', function (event){
    event.preventDefault();
    filterMonuments();
});

document.getElementById("buttonrestart").addEventListener('click', restartPage);

document.addEventListener('DOMContentLoaded', showAll);

/**
 * Construye un array de monumentos estructurado.
 * Devolvera un array de materiales que contienen 
 * localizaciones y estos a su vez contienen monumentos.
 * @param {Array} monumentos 
 * @returns {Array}
 */
function buildTree(monumentos)
{
    let materials = [];
    monumentos.forEach(monumento =>{

        let material = materials.find(mat=>mat.name==monumento.MATERIAL);

        if(!material)
        {
            material={
                name:monumento.MATERIAL,
                locations:[]
            }
            materials.push(material);
        }

        let location = material.locations.find(loc=>loc.name==monumento.UBICACION);

        if(!location)
        {
            location={
                name:monumento.UBICACION,
                monuments:[]
            }
            material.locations.push(location);
        }
        
        location.monuments.push(monumento)
    })
    return materials;
}


/**
 * Crea la estructura DOM de la lista
 * @param {Array} materials 
 */
function createList(materials)
{

    let container = document.getElementById("insertmonu");

    materials.forEach(material =>{
        let materialcard = document.createElement("div");
        let materialname = document.createElement("div");
        let materiallocations = document.createElement("div");

        materialname.textContent=material.name;
        materialcard.classList.add("material");
        materialname.classList.add("material-name")
        materialcard.appendChild(materialname);
        materialcard.appendChild(materiallocations);

        container.appendChild(materialcard);

        material.locations.forEach(location =>{
            let locationcard = document.createElement("div");
            let locationname = document.createElement("div");
            let locationmonuments = document.createElement("div");

            locationname.textContent=location.name;
            locationcard.classList.add("location");
            locationname.classList.add("location-name");
            locationcard.appendChild(locationname);
            locationcard.appendChild(locationmonuments);

            materiallocations.appendChild(locationcard);
            locationmonuments.classList.add("cards");

            let elements=location.monuments.map(createMonument);

            elements.forEach(element=>{
                locationmonuments.appendChild(element)
            })

            /*location.monuments.forEach(monument=>{
                let monumentcard= createMonument(monument);
                locationmonuments.appendChild(monumentcard)
            })*/
        })
    })

}

/**
 * Crea la tarjeta de un monumento
 * @param {Object} monumento 
 * @returns {HTMLElement}
 */
function createMonument(monumento)
{
    let monumentoCard = document.createElement("div");

    // Creamos nodo del nombre 

    let nombre = document.createElement("div");
    let casetext = document.createElement("p");
    var nombretext=document.createTextNode("Nombre");
    casetext.classList.add("pname");
    var distrito = document.createTextNode(monumento.NOMBRE);
    if(monumento.NOMBRE != "SIN TITULO" && monumento.NOMBRE !="SIN T\u00cdTULO")
    {
        casetext.appendChild(nombretext);
        monumentoCard.appendChild(casetext);
        nombre.appendChild(distrito);
        monumentoCard.appendChild(nombre);   
    }

    // Creamos nodo del autor

    let autor = document.createElement("div");
    casetext = document.createElement("p");
    nombretext=document.createTextNode("Autor");
    casetext.classList.add("pautor");
    distrito = document.createTextNode(monumento.AUTOR);

    casetext.appendChild(nombretext);
    monumentoCard.appendChild(casetext);
    autor.appendChild(distrito);
    monumentoCard.appendChild(autor);
    

    // Creamos nodo del procautor

    let procautor = document.createElement("div");
    casetext = document.createElement("p");
    nombretext=document.createTextNode("Proautor");
    casetext.classList.add("pproautor");
    distrito = document.createTextNode(monumento.PROCAUTOR);
    if(monumento.PROCAUTOR != null)
    {
        casetext.appendChild(nombretext);
        monumentoCard.appendChild(casetext);
        procautor.appendChild(distrito);
        monumentoCard.appendChild(procautor);
    }

    monumentoCard.classList.add("card");
    return monumentoCard;
}
/**
 * Reinicia la busqueda
 */
function restartPage()
{
    document.getElementById("material").value = "";
    document.getElementById("location").value = "";
    showAll();
}

//---------------------------FILTROS-------------------------------
/**
 * Muestra todos los resultados
 */
function showAll()
{
    let tree = buildTree(monumentos)
    clearList()
    createList(tree);
}

/**
 * Filtra y muestra los monumentos en la pagina
 */
function filterMonuments()
{
    let material = document.getElementById("material").value.toLowerCase();
    let location = document.getElementById("location").value.toLowerCase();

    if(material || location)
    {
        let filtered = monumentos.filter(monument=>{
        if(material && monument.MATERIAL.toLowerCase().includes(material))
        {
            return true;
        }
        if(location && monument.UBICACION.toLowerCase().includes(location))
        {
            return true;
        }

        return false;
        
        })
        let tree = buildTree(filtered);
        clearList();
        createList(tree);
    }
    else
    {
        clearList();
    }
    

    
    /*let filtered = monumentos.filter(monument=>{
        if(material || location)
        {
            if(material && monument.MATERIAL.toLowerCase().includes(material))
            {
                return true;
            }
            if(location && monument.UBICACION.toLowerCase().includes(location))
            {
                return true;
            }

            return false;
        }
        else
        {
            return true;
        }
        
    })*/
}

/**
 * Elimina todos los resultados en la lista
 */
function clearList()
{
    let container = document.getElementById("insertmonu");
    while(container.hasChildNodes())
    {
        container.removeChild(container.firstChild);
    }
}