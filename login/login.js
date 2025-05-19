document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 1. Obtener valores del formulario
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // 2. Validaciones básicas
    if (!username || !password) {
        errorMessage.textContent = 'Por favor complete todos los campos';
        errorMessage.style.display = 'block';
        return;
    }

    // 3. Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 4. Buscar usuario (seguro, no almacena contraseña en texto plano)
    const user = users.find(u => {
        // En un sistema real, aquí iría comparación con contraseña encriptada
        return u.username.toLowerCase() === username.toLowerCase() && u.password === password;
    });
    
    // 5. Manejo de resultados
    if (user) {
        // Guardar sesión sin contraseña por seguridad
        const userSession = {
            username: user.username,
            email: user.email,
            // Puedes agregar más datos seguros del usuario
            timestamp: new Date().getTime()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        
        // Redirigir con retraso para mejor experiencia de usuario
        errorMessage.style.display = 'none';
        document.getElementById('login-form').reset();
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 500);
        
    } else {
        errorMessage.textContent = 'Credenciales incorrectas. Intente nuevamente';
        errorMessage.style.display = 'block';
        
        // Limpiar campo de contraseña
        document.getElementById('password').value = '';
    }
});

// Verificación de sesión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Verificar si la sesión es "reciente" (menos de 8 horas)
        const sessionDuration = new Date().getTime() - currentUser.timestamp;
        const eightHours = 8 * 60 * 60 * 1000;
        
        if (sessionDuration < eightHours) {
            window.location.href = '../index.html';
        } else {
            // Sesión expirada
            localStorage.removeItem('currentUser');
        }
    }
});