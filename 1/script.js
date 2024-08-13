function toggleIcon() {
    const iconFirst = document.getElementById('iconContainerFirst');
    const iconLast = document.getElementById('iconContainerLast');

    if (iconFirst.style.display === 'none') {
        iconFirst.style.display = 'flex';
        iconLast.style.display = 'none';
    } else {
        iconFirst.style.display = 'none';
        iconLast.style.display = 'flex';
    }
}

