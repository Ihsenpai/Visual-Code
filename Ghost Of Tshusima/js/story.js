document.addEventListener('DOMContentLoaded', () => {
    const epilogVideo = document.getElementById('epilogVideo');
    const epilogButtons = document.getElementById('epilog-buttons');

    epilogVideo.addEventListener('ended', () => {
        epilogButtons.classList.remove('hidden');
    });
});

function button1Action() {
    alert('Button 1 clicked!');
}

function button2Action() {
    alert('Button 2 clicked!');
}
