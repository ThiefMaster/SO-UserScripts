// ==UserScript==
// @name StackOverflow flag utils
// @namespace adrian@planetcoding.net
// @description Utilities to improve mod flag handling
// @include http://stackoverflow.com/admin/dashboard*
// @version 1.0
// ==/UserScript==

function withJQuery(f) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = '(' + f.toString() + ')(jQuery)';
    document.body.appendChild(script);
};

withJQuery(function($) {
    function moveQuickFlagsUp() {
        var quickFlags = $('.delete-post').filter(function() {
            return ~$(this).val().indexOf('(');
        });
        quickFlags = quickFlags.add('.answer-link.deleted-answer');
        quickFlags.closest('.m-flag').detach().prependTo('.flagged-posts > tbody');
    }

    $('<button>Move easy flags up</button>').on('click', function() {
        moveQuickFlagsUp();
        this.disabled = true;
    }).prependTo('.flag-container');
});
