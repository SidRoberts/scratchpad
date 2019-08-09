$(document).ready(
    function () {
        $('#content').focus();

        getState();
    }
);

$('#content').on('keyup', saveState);

$('#content').on('cut', saveState);
$('#content').on('paste', saveState);

function getState()
{
    $('#content').css(
        'font-size',
        window.localStorage.getItem('fontSize')
    );

    $('#content').css(
        'text-align',
        window.localStorage.getItem('textAlign')
    );

    $('#content').html(
        window.localStorage.getItem('content')
    );
}

function saveState()
{
    window.localStorage.setItem(
        'textAlign',
        $('#content').css('text-align')
    );

    window.localStorage.setItem(
        'fontSize',
        $('#content').css('font-size')
    );

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

$('button').on('click', saveState);

$('#reset').on(
    'click',
    function () {
        window.localStorage.clear();

        location.reload();
    }
);
