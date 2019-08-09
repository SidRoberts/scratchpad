$(document).ready(
    function () {
        $('#content').focus();

        getState();
    }
);

$('#content').on('keyup cut paste', saveState);

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

    $('#content').css(
        'column-count',
        window.localStorage.getItem('columnCount')
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
        'columnCount',
        $('#content').css('column-count')
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
        $('#content').css('text-align', 'justify');
    }
);

$('#sizePlus').on(
    'click',
    function () {
        $('#content').css(
            'font-size',
            function() {
                oldFontSize = parseInt($(this).css('font-size'));

                newFontSize = (oldFontSize + 10);

                return newFontSize + 'px';
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
                oldFontSize = parseInt($(this).css('font-size'));

                newFontSize = (oldFontSize - 10);

                if (newFontSize < 1) {
                    newFontSize = oldFontSize;
                }

                return newFontSize + 'px';
            }
        );
    }
);

$('#columns').on(
    'click',
    function () {
        columnCount = parseInt(
            $('#content').css('column-count')
        );

        if (isNaN(columnCount)) {
            columnCount = 1;
        }

        columnCount += 1;

        if (columnCount > 3) {
            columnCount = 1;
        }

        $('#content').css('column-count', columnCount);
    }
);

$('button').on('click', saveState);

$('#reset').on(
    'click',
    function () {
        window.localStorage.removeItem('fontSize');
        window.localStorage.removeItem('textAlign');
        window.localStorage.removeItem('columnCount');
        window.localStorage.removeItem('content');

        location.reload();
    }
);
