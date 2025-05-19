document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Validaciones básicas
    if (username.length < 4) {
        errorMessage.textContent = 'El usuario debe tener al menos 4 caracteres';
        errorMessage.style.display = 'block';
        return;
    }
    
    if (password.length < 6) {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el usuario ya existe
    if (users.some(u => u.username === username)) {
        errorMessage.textContent = 'El usuario ya existe';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Verificar si el email ya existe
    if (users.some(u => u.email === email)) {
        errorMessage.textContent = 'El correo ya está registrado';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Agregar nuevo usuario
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Mostrar mensaje de éxito y redirigir
    alert('Registro exitoso! Serás redirigido al login.');
    window.location.href = '../login/login.html';
});