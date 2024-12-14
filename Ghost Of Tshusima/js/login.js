document.getElementById('enter-button').addEventListener('click', function() {
    const popup = document.getElementById('loginPopup');
    popup.classList.add('show');
});

window.onclick = function(event) {
    const popup = document.getElementById('loginPopup');
    if (event.target === popup) {
        popup.classList.remove('show');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Cek jika user sudah login
    fetch('auth/check_session.php')
        .then(response => response.json())
        .then(data => {
            if(data.authenticated) {
                window.location.href = 'home.html';
            }
        });

    const loginForm = document.querySelector('#loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        const formData = new FormData(this);
        
        fetch('auth/login_process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'home.html';
            } else {
                alert(data.message || 'Login failed. Please check your username and password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    });
});