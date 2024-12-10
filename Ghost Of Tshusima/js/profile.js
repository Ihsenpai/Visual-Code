function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    document.getElementById(pageId).classList.remove('hidden');

    const sidebarItems = document.querySelectorAll('.sidebar ul li');
    sidebarItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}

const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        toggleDarkModeButton.src = 'assets/img/dark.png'; // Gambar untuk Dark Mode
    } else {
        toggleDarkModeButton.src = 'assets/img/light.png'; // Gambar untuk Light Mode
    }
});

const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-picture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});
