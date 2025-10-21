const inputNombre = document.getElementById("nombre");
const botonBuscar = document.getElementById("buscar");
const info = document.getElementById("info");
const imagen = document.getElementById("imagen");

async function obtenerImagen(nombre) {
  const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
  const personajes = await res.json();
  const encontrado = personajes.find(p => p.name.toLowerCase() === nombre.toLowerCase());
  return encontrado ? encontrado.image : "https://akabab.github.io/starwars-api/api/images/placeholder.jpg";
};

async function buscarPersonaje() {
  try {
    const nombre = inputNombre.value.trim().toLowerCase();

    // obtengo todos los personajes de akabab
    const respuesta = await fetch("https://akabab.github.io/starwars-api/api/all.json");
    const datos = await respuesta.json();

    // buscamos por nombre (coincidencia exacta o parcial)
    const personaje = datos.find(p => p.name.toLowerCase().includes(nombre));

    if (!personaje) {
      info.innerText = "Personaje no encontrado.";
      imagen.src = "";
      imagen.style.border = "none";
      return;
    }

    info.innerText = `Nombre: ${personaje.name}\nAltura: ${personaje.height}m\nGénero: ${personaje.gender}`;
    imagen.src = personaje.image;
    imagen.style.border = "5px solid black";
    imagen.onerror = () => {
      imagen.src = "https://akabab.github.io/starwars-api/api/images/placeholder.jpg";
    };

  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}



async function obtenerId(nombre) {
  const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
  const personajes = await res.json();
  const encontrado = personajes.find(p => p.name.toLowerCase() === nombre.toLowerCase());
  return encontrado ? encontrado.id : 1; // 1 = Luke Skywalker (por defecto)
}

botonBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  buscarPersonaje();
});
