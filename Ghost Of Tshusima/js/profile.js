// Fungsi untuk menampilkan halaman
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');

    const sidebarItems = document.querySelectorAll('.sidebar ul li');
    sidebarItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}

// Load profile data
function loadProfile() {
    fetch('auth/get_profile.php')
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                const profile = data.data;
                document.getElementById('username').value = profile.username || '';
                document.getElementById('name').value = profile.name || '';
                document.getElementById('email').value = profile.email || '';
                document.getElementById('bio').value = profile.bio || '';
                document.getElementById('birthday').value = profile.birthday || '';
                document.getElementById('country').value = profile.country || '';
                document.getElementById('phone').value = profile.phone || '';
                
                if(profile.profile_picture) {
                    document.getElementById('profile-picture').src = profile.profile_picture;
                }
            } else {
                alert('Failed to load profile: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading profile');
        });
}

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        let url = '';
        
        switch(this.id) {
            case 'general-form':
                url = 'auth/update_profile.php';
                break;
            case 'password-form':
                if(formData.get('new_password') !== formData.get('repeat_password')) {
                    alert('New passwords do not match');
                    return;
                }
                url = 'auth/update_password.php';
                break;
            case 'info-form':
                url = 'auth/update_profile.php';
                break;
        }
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if(data.success && this.id === 'password-form') {
                this.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error updating profile');
        });
    });
});

// Handle profile picture upload
document.getElementById('upload-button').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if(file) {
        const formData = new FormData();
        formData.append('profile_picture', file);
        
        fetch('auth/update_profile_picture.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Update gambar profil langsung tanpa refresh
                document.getElementById('profile-picture').src = data.path;
                
                // Update gambar di navbar juga
                const navbarProfileImg = document.getElementById('navbar-profile-img');
                if(navbarProfileImg) {
                    navbarProfileImg.src = data.path;
                }
                
                // Update gambar di mini profile jika ada
                const miniProfilePic = document.getElementById('mini-profile-pic');
                if(miniProfilePic) {
                    miniProfilePic.src = data.path;
                }
            }
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading profile picture');
        });
    }
});

// Dark mode toggle
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleDarkModeButton.src = 'assets/img/dark.png';
    } else {
        toggleDarkModeButton.src = 'assets/img/light.png';
    }
});

// Load profile when page loads
document.addEventListener('DOMContentLoaded', loadProfile);

// Handle reset profile
document.getElementById('reset-profile').addEventListener('click', function() {
    if(confirm('Are you sure you want to reset all profile data? This cannot be undone.')) {
        fetch('auth/reset_profile.php')
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    // Reset gambar ke default
                    document.getElementById('profile-picture').src = 'assets/img/6522516.png';
                    
                    // Reset form fields
                    document.getElementById('name').value = '';
                    document.getElementById('bio').value = '';
                    document.getElementById('birthday').value = '';
                    document.getElementById('country').value = '';
                    document.getElementById('phone').value = '';
                    
                    // Update navbar dan mini profile jika ada
                    const navbarProfileImg = document.getElementById('navbar-profile-img');
                    if(navbarProfileImg) {
                        navbarProfileImg.src = 'assets/img/6522516.png';
                    }
                    
                    const miniProfilePic = document.getElementById('mini-profile-pic');
                    if(miniProfilePic) {
                        miniProfilePic.src = 'assets/img/6522516.png';
                    }
                    
                    alert('Profile has been reset successfully');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error resetting profile');
            });
    }
});
