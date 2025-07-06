// Datos para generar usuarios aleatorios
const nombresM = [
    "Alejandro", "Carlos", "Diego", "Eduardo", "Fernando", "Gabriel", "Hugo", "Ignacio",
    "Javier", "Luis", "Manuel", "Nicolas", "Oscar", "Pablo", "Ricardo", "Sebastian",
    "Tomas", "Victor", "William", "Xavier", "Andres", "Bruno", "Cesar", "Daniel",
    "Emilio", "Francisco", "Gonzalo", "Hector", "Ivan", "Jorge"
];

const nombresF = [
    "Alejandra", "Beatriz", "Carmen", "Diana", "Elena", "Fernanda", "Gabriela", "Helena",
    "Isabel", "Julia", "Laura", "Maria", "Natalia", "Olivia", "Patricia", "Rosa",
    "Sofia", "Teresa", "Valentina", "Ximena", "Andrea", "Camila", "Daniela", "Esperanza",
    "Fatima", "Gloria", "Ingrid", "Jimena", "Karla", "Lucia"
];

const apellidos = [
    "Garcia", "Rodriguez", "Martinez", "Lopez", "Gonzalez", "Perez", "Sanchez", "Ramirez",
    "Cruz", "Flores", "Gomez", "Morales", "Vazquez", "Jimenez", "Hernandez", "Castillo",
    "Torres", "Rivera", "Vargas", "Ramos", "Romero", "Fernandez", "Ruiz", "Diaz",
    "Moreno", "Gutierrez", "Ortiz", "Chavez", "Mendoza", "Silva", "Castro", "Herrera"
];

const palabrasPassword = [
    "Casa", "Amor", "Vida", "Sol", "Luna", "Mar", "Cielo", "Tierra", "Fuego", "Agua",
    "Paz", "Luz", "Noche", "Dia", "Flor", "Rosa", "Azul", "Verde", "Rojo", "Oro",
    "Plata", "Estrella", "Corazon", "Alma", "Sueno", "Tiempo", "Mundo", "Feliz",
    "Libre", "Fuerte", "Dulce", "Nuevo", "Grande", "Bello", "Bueno", "Mejor"
];

// Variables globales
let deferredPrompt;
let usuariosGenerados = [];

// Funciones principales
function generarNombreCompleto() {
    const esHombre = Math.random() < 0.5;
    const nombre = esHombre ? 
        nombresM[Math.floor(Math.random() * nombresM.length)] :
        nombresF[Math.floor(Math.random() * nombresF.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    return { nombre, apellido };
}

function generarCorreo(nombre, apellido) {
    const nombreClean = nombre.toLowerCase().replace(/\s/g, '');
    const apellidoClean = apellido.toLowerCase().replace(/\s/g, '');
    const cantidadNumeros = Math.floor(Math.random() * 4) + 3; // 3-6 números
    const numeros = Array.from({length: cantidadNumeros}, () => Math.floor(Math.random() * 10)).join('');
    
    const formatos = [
        `${nombreClean}.${apellidoClean}${numeros}@hotmail.com`,
        `${nombreClean}${apellidoClean}${numeros}@hotmail.com`,
        `${nombreClean[0]}${apellidoClean}${numeros}@hotmail.com`,
        `${nombreClean}.${apellidoClean[0]}${numeros}@hotmail.com`
    ];
    
    return formatos[Math.floor(Math.random() * formatos.length)];
}

function generarPasswordHumanizada() {
    const numPalabras = Math.floor(Math.random() * 2) + 2; // 2-3 palabras
    const palabrasSeleccionadas = [];
    
    for (let i = 0; i < numPalabras; i++) {
        const palabra = palabrasPassword[Math.floor(Math.random() * palabrasPassword.length)];
        if (!palabrasSeleccionadas.includes(palabra)) {
            palabrasSeleccionadas.push(palabra);
        }
    }
    
    const numeros = Array.from({length: Math.floor(Math.random() * 3) + 2}, () => Math.floor(Math.random() * 10)).join('');
    const simbolos = ['.', '@'];
    const simbolo1 = simbolos[Math.floor(Math.random() * simbolos.length)];
    const simbolo2 = simbolos[Math.floor(Math.random() * simbolos.length)];
    
    const formatos = [
        `${palabrasSeleccionadas[0]}${simbolo1}${palabrasSeleccionadas[1]}${simbolo2}${numeros}`,
        `${palabrasSeleccionadas[0]}${numeros}${simbolo1}${palabrasSeleccionadas[1]}`,
        `${numeros}${simbolo1}${palabrasSeleccionadas[0]}${simbolo2}${palabrasSeleccionadas[1]}`,
        `${palabrasSeleccionadas[0]}${simbolo1}${numeros}${simbolo2}${palabrasSeleccionadas[1]}`
    ];
    
    if (palabrasSeleccionadas.length === 3) {
        formatos.push(
            `${palabrasSeleccionadas[0]}${simbolo1}${palabrasSeleccionadas[1]}${simbolo2}${palabrasSeleccionadas[2]}${numeros}`,
            `${palabrasSeleccionadas[0]}${numeros}${simbolo1}${palabrasSeleccionadas[1]}${simbolo2}${palabrasSeleccionadas[2]}`
        );
    }
    
    return formatos[Math.floor(Math.random() * formatos.length)];
}

function generarUsuario() {
    const { nombre, apellido } = generarNombreCompleto();
    const correo = generarCorreo(nombre, apellido);
    const password = generarPasswordHumanizada();
    
    return {
        nombreCompleto: `${nombre} ${apellido}`,
        correo,
        password,
        timestamp: new Date().toLocaleString()
    };
}

function mostrarUsuario(usuario, index) {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = `
        <h3><span class="emoji">👤</span>Usuario ${index + 1}</h3>
        <div class="user-info">
            <div class="info-item">
                <span class="info-label">Nombre:</span>
                <span class="info-value">${usuario.nombreCompleto}</span>
                <button class="copy-btn" onclick="copiarTexto('${usuario.nombreCompleto}')">📋</button>
            </div>
            <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${usuario.correo}</span>
                <button class="copy-btn" onclick="copiarTexto('${usuario.correo}')">📋</button>
            </div>
            <div class="info-item">
                <span class="info-label">Password:</span>
                <span class="info-value">${usuario.password}</span>
                <button class="copy-btn" onclick="copiarTexto('${usuario.password}')">📋</button>
            </div>
        </div>
    `;
    
    return userCard;
}

function copiarTexto(texto) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            mostrarNotificacion('¡Copiado al portapapeles! 📋');
        }).catch(() => {
            copiarTextoFallback(texto);
        });
    } else {
        copiarTextoFallback(texto);
    }
}

function copiarTextoFallback(texto) {
    const textArea = document.createElement('textarea');
    textArea.value = texto;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        mostrarNotificacion('¡Copiado al portapapeles! 📋');
    } catch (err) {
        mostrarNotificacion('Error al copiar 😞');
    }
    
    document.body.removeChild(textArea);
}

function mostrarNotificacion(mensaje) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = mensaje;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function limpiarResultados() {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '';
    usuariosGenerados = [];
    document.getElementById('clearBtn').style.display = 'none';
}

function mostrarCargando() {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '<div class="loading">Generando usuarios...</div>';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Generar un usuario
    document.getElementById('generateOne').addEventListener('click', function() {
        mostrarCargando();
        
        setTimeout(() => {
            const usuario = generarUsuario();
            usuariosGenerados.push(usuario);
            
            const resultados = document.getElementById('resultados');
            resultados.innerHTML = '';
            resultados.appendChild(mostrarUsuario(usuario, 0));
            
            document.getElementById('clearBtn').style.display = 'block';
        }, 500);
    });
    
    // Generar múltiples usuarios
    document.getElementById('generateMultiple').addEventListener('click', function() {
        const cantidad = parseInt(document.getElementById('cantidad').value);
        
        if (!cantidad || cantidad < 1 || cantidad > 50) {
            mostrarNotificacion('Por favor ingresa un número entre 1 y 50 🔢');
            return;
        }
        
        mostrarCargando();
        
        setTimeout(() => {
            const resultados = document.getElementById('resultados');
            resultados.innerHTML = '';
            usuariosGenerados = [];
            
            for (let i = 0; i < cantidad; i++) {
                const usuario = generarUsuario();
                usuariosGenerados.push(usuario);
                resultados.appendChild(mostrarUsuario(usuario, i));
            }
            
            document.getElementById('clearBtn').style.display = 'block';
            mostrarNotificacion(`¡${cantidad} usuarios generados! 🎉`);
        }, 800);
    });
    
    // Limpiar resultados
    document.getElementById('clearBtn').addEventListener('click', limpiarResultados);
    
    // Manejar instalación PWA
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        const installPrompt = document.createElement('div');
        installPrompt.className = 'install-prompt';
        installPrompt.innerHTML = `
            <div>📱 ¡Instala esta app en tu teléfono!</div>
            <button class="install-btn" onclick="instalarApp()">Instalar App</button>
        `;
        
        document.querySelector('.content').insertBefore(installPrompt, document.querySelector('.button-group'));
    });
    
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(() => console.log('Error al registrar Service Worker'));
    }
});

function instalarApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                mostrarNotificacion('¡App instalada correctamente! 🎉');
                document.querySelector('.install-prompt').remove();
            }
            deferredPrompt = null;
        });
    }
}

// Agregar estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
