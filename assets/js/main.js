$(document).ready(function () {
    var music = document.getElementById('valentines-music');
    // Detectamos si el ancho de la pantalla es de móvil
    var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

    // --- Animación del Sobre ---
    $('.valentines-day').click(function () {
        if (music.paused) {
            music.play();
        }

        if (isMobile) {
            // En móvil, hacemos una animación de aparición simple y directa
            $(this).fadeOut(500);
            $('#card').css({ 'visibility': 'visible' }).hide().fadeIn(500);
        } else {
            // La animación original para PC
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
        }
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

    nextBtn.click(function () {
        if (currentPageIndex < totalPages - 1) {
            currentPageIndex++;
            updatePage();
        }
    });

    prevBtn.click(function () {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updatePage();
        }
    });

    updatePage(); // Iniciar

    // --- Lógica de la Pregunta Final ---

    // Botón SÍ
    $('#yes-btn').click(function () {
        $('#card').fadeOut(500, function () {
            $('#final-message').css('display', 'flex').hide().fadeIn(1000);
        });
        $('.falling-hearts').hide();
    });

    // Botón NO (escurridizo)
    $('#no-btn').on('mouseover', function () {
        // La broma del botón solo funciona en PC, en móvil no.
        if (!isMobile) {
            $(this).css({
                left: (Math.random() * 70) + '%',
                top: (Math.random() * 70) + '%',
            });
        }
    });

    $('#no-btn').on('click', function () {
        // Si logran hacerle click (más probable en móvil)
        alert("¡Respuesta incorrecta! Inténtalo de nuevo con el otro botón ;) ");
    });

    // --- Animación de Corazones Cayendo ---
    const fallingHeartsContainer = $('.falling-hearts');
    if (fallingHeartsContainer.length > 0) {
        setInterval(function () {
            const heart = $('<div class="heart-fall">&#10084;</div>');
            heart.css({
                'left': Math.random() * 100 + 'vw',
                'animationDuration': (Math.random() * 2 + 3) + 's',
                'fontSize': (Math.random() * 1 + 1) + 'rem'
            });
            fallingHeartsContainer.append(heart);
            setTimeout(function () { heart.remove(); }, 5000);
        }, 300);
    }
});

