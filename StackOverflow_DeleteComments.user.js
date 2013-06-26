// ==UserScript==
// @name StackOverflow quick comment deletion
// @namespace adrian@planetcoding.net
// @description Adds a link to quickly delete comments of a user
// @include http://stackoverflow.com/admin/users/*/post-comments*
// @version 1.0
// @grant none
// ==/UserScript==

function withJQuery(f) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = '(' + f.toString() + ')(jQuery)';
    document.body.appendChild(script);
};

withJQuery(function($) {
    function deleteComment(id) {
        return $.ajax({
            url: '/posts/comments/' + id + '/vote/10',
            type: 'POST',
            data: {
                fkey: StackExchange.options.user.fkey
            },
            dataType: 'text'
        });
    }

    $('.meta-row:not(.deleted-row) > td > a').after(' <a href="#" class="delete-comment">(delete comment)</a>');
    $('.delete-comment').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var row = $this.closest('.meta-row');
        var id = row.data('id');
        deleteComment(id).then(function(data) {
            row.addClass('deleted-row');
            row.next('.text-row').addClass('deleted-row');
            $this.remove();
        }, function(xhr, textStatus) {
            alert('Failed ' + id + ': ' + textStatus);
        });
    });
});
