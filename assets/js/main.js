$(document).ready(function () {
    var music = document.getElementById('valentines-music');

    // --- Animación del Sobre ---
    $('.valentines-day').click(function () {
        if (music.paused) {
            music.play();
        }
        $('.envelope').css({ 'animation': 'fall 3s linear 1' }).fadeOut(800, function () {
            $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();
            $('#card').css({ 'visibility': 'visible', 'opacity': 0, 'transform': 'scale(0.1)' }).animate({ 'opacity': 1 }, {
                duration: 1000,
                step: function (now) {
                    var scale = 1 + Math.sin(now * Math.PI) * 0.1;
                    $(this).css('transform', 'scale(' + scale + ')');
                }
            });
        });
    });

    // --- Lógica de Paginación ---
    const pages = $('.page');
    const prevBtn = $('#prev-page');
    const nextBtn = $('#next-page');
    let currentPageIndex = 0;
    const totalPages = pages.length;

    function updatePage() {
        pages.hide();
        pages.eq(currentPageIndex).show();
        prevBtn.toggle(currentPageIndex > 0);
        nextBtn.toggle(currentPageIndex < totalPages - 1);
    }
    
    nextBtn.click(function() {
        if (currentPageIndex < totalPages - 1) {
            currentPageIndex++;
            updatePage();
        }
    });

    prevBtn.click(function() {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updatePage();
        }
    });
    
    updatePage(); // Iniciar en la primera página

    // --- Lógica de la Pregunta Final (¡NUEVO!) ---

    // Botón SÍ
    $('#yes-btn').click(function() {
        // Ocultar la tarjeta y mostrar el mensaje final
        $('#card').fadeOut(500, function() {
            $('#final-message').css('display', 'flex').hide().fadeIn(1000);
        });
        // Detener la lluvia de corazones del fondo
        $('.falling-hearts').hide();
    });

    // Botón NO (el botón escurridizo)
    $('#no-btn').on('mouseover', function() {
        // Mover el botón a una posición aleatoria dentro del contenedor
        $(this).css({
            left: (Math.random() * 70) + '%',
            top: (Math.random() * 70) + '%',
        });
    });
    
    $('#no-btn').on('click', function() {
        // Por si logran hacerle click en móvil
        alert("¡Respuesta incorrecta! Inténtalo de nuevo ;)");
    });

    // --- Animación de Corazones Cayendo ---
    const fallingHeartsContainer = $('.falling-hearts');
    if (fallingHeartsContainer.length > 0) {
        setInterval(function() {
            const heart = $('<div class="heart-fall">&#10084;</div>');
            heart.css({
                'left': Math.random() * 100 + 'vw',
                'animationDuration': (Math.random() * 2 + 3) + 's',
                'fontSize': (Math.random() * 1 + 1) + 'rem'
            });
            fallingHeartsContainer.append(heart);
            setTimeout(function() { heart.remove(); }, 5000);
        }, 300);
    }
});
