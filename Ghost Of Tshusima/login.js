document.getElementById('enter-button').addEventListener('click', function() {
    const popup = document.getElementById('loginPopup');
    popup.classList.add('show'); // Tambahkan kelas show untuk menampilkan popup
});

// Menutup popup saat mengklik di luar login-container
window.onclick = function(event) {
    const popup = document.getElementById('loginPopup');
    if (event.target === popup) {
        popup.classList.remove('show'); // Hapus kelas show untuk menyembunyikan popup
    }
};