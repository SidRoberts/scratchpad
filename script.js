$(document).ready(
    function () {
        $('#content').focus();
    }
);

$('#leftAlign').on(
    'click',
    function () {
        $('#content').css('text-align', 'left');
    }
);

$('#centerAlign').on(
    'click',
    function () {
        $('#content').css('text-align', 'center');
    }
);

$('#rightAlign').on(
    'click',
    function () {
        $('#content').css('text-align', 'right');
    }
);

$('#justifyAlign').on(
    'click',
    function () {
        $('#content').css('text-align', 'justify').css('text-justify', 'inter-word');
    }
);

$('#sizePlus').on(
    'click',
    function () {
        $('#content').css(
            'font-size',
            function() {
                return (parseInt($(this).css('font-size')) + 10) + 'px';
            }
        );
    }
);

$('#sizeMinus').on(
    'click',
    function () {
        $('#content').css(
            'font-size',
            function() {
                return (parseInt($(this).css('font-size')) - 10) + 'px';
            }
        );
    }
);
