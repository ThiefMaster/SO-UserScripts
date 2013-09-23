// ==UserScript==
// @name StackOverflow flag utils
// @namespace adrian@planetcoding.net
// @description Utilities to improve mod flag handling
// @include http://stackoverflow.com/admin/dashboard*
// @version 1.1.1
// @grant none
// ==/UserScript==

function withJQuery(f) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = '(' + f.toString() + ')(jQuery)';
    document.body.appendChild(script);
};

withJQuery(function($) {
    var BAD_PHRASES = [
        'thank you',
        'thanks',
        'similar problem',
        'similar issue',
        'same problem',
        'same error',
        'the same',
        'need this too',
        'how can',
        'can you',
        'please help',
        'please assist',
        'please suggest',
        'do you know',
        'i tried'
    ];

    function improveFlagList() {
        // Highlight posts containing "bad" phrases
        $('.post-summary-body').filter(function() {
            var $this = $(this);
            var ret = false;
            $.each(BAD_PHRASES, function(i, phrase) {
                if(~$this.text().toLowerCase().indexOf(phrase)) {
                    var html = $this.html();
                    html = html.replace(new RegExp(phrase, 'gi'), '<span style="background: #fe0;">$&</span>');
                    $this.html(html);
                    ret = true;
                    return false;
                }
            });
            return ret;
        }).closest('.m-flag').detach().prependTo('.flagged-posts > tbody');

        // Move flags with delete votes and already-deleted posts to the top
        var quickFlags = $('.delete-post').filter(function() {
            return ~$(this).val().indexOf('(');
        });
        quickFlags = quickFlags.add('.answer-link.deleted-answer');
        quickFlags.closest('.m-flag').detach().prependTo('.flagged-posts > tbody');
    }

    $('<button>Improve Flag List</button>').on('click', function() {
        improveFlagList();
        this.disabled = true;
    }).prependTo('.flag-container');
});
