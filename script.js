$(document).ready(
    function () {
        $('#content').focus();

        $('#content').html(
            window.localStorage.getItem('content')
        );
    }
);

$('#content').on('keyup', saveContent);

$('#content').on('cut', saveContent);
$('#content').on('paste', saveContent);

function saveContent()
{
    window.localStorage.setItem(
        'content',
        $('#content').html()
    );
}

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
