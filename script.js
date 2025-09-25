const portada = document.getElementById('portada');
const libro = document.getElementById('libro');
const abrirMenu = document.getElementById('abrirMenu');
const paginas = document.querySelectorAll('.pagina');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const controles = document.getElementById('controles');

let paginaActual = 0;

// Inicializamos animaciones
paginas.forEach((p, i) => {
  p.style.transition = 'transform 0.8s ease, box-shadow 0.5s ease';
  p.style.transformStyle = 'preserve-3d';
  p.style.backfaceVisibility = 'hidden';
});

// Abrir libro con rebote
abrirMenu.addEventListener('click', () => {
  portada.style.display = 'none';
  libro.style.display = 'block';
  controles.style.display = 'flex';

  libro.style.opacity = 0;
  libro.style.transform = 'scale(0.7) rotate(-5deg)';
  setTimeout(() => {
    libro.style.transition = 'all 0.6s ease';
    libro.style.opacity = 1;
    libro.style.transform = 'scale(1) rotate(0deg)';
  }, 50);

  mostrarPagina(paginaActual);
});

// Mostrar página con giro y sombra
function mostrarPagina(index) {
  paginas.forEach((p, i) => {
    if (i < index) {
      p.style.transform = "rotateY(-180deg)";
      p.style.boxShadow = "-10px 0 25px rgba(0,0,0,0.6)";
    } else {
      p.style.transform = "rotateY(0deg)";
      p.style.boxShadow = "10px 0 25px rgba(0,0,0,0.4)";
    }
    p.style.zIndex = paginas.length - i;
  });
}

// Brillo al pasar página
function efectoBrillo(pagina) {
  pagina.style.boxShadow = "0 0 60px rgba(255,255,255,0.5)";
  setTimeout(() => {
    pagina.style.boxShadow = "";
  }, 300);
}

// Función pasar página con perspectiva
function pasarPagina(direccion) {
  const pagina = paginas[paginaActual];
  if (direccion === 'next' && paginaActual < paginas.length - 1) {
    paginaActual++;
    libro.style.transform = 'perspective(1200px) rotateY(-15deg)';
  } else if (direccion === 'prev' && paginaActual > 0) {
    paginaActual--;
    libro.style.transform = 'perspective(1200px) rotateY(15deg)';
  } else {
    return;
  }

  setTimeout(() => {
    libro.style.transform = 'perspective(1200px) rotateY(0deg)';
    mostrarPagina(paginaActual);
    efectoBrillo(paginas[paginaActual]);
  }, 200);
}

next.addEventListener('click', () => pasarPagina('next'));
prev.addEventListener('click', () => pasarPagina('prev'));

