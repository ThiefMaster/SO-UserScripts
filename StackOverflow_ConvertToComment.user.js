// ==UserScript==
// @name StackOverflow convert to comment
// @namespace adrian@planetcoding.net
// @description Remove the confirmation prompt when converting an answer to a comment
// @include http://stackoverflow.com/admin/dashboard*
// @version 1.1
// @grant none
// ==/UserScript==

var confirm = window.confirm;
window.confirm = function(message) {
    if(message == 'The answer will become a comment on the question; are you sure?') {
        return true;
    }
    return confirm.apply(this, arguments);
};
