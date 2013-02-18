// ==UserScript==
// @name StackOverflow convert to comment
// @namespace adrian@planetcoding.net
// @description Enable convert-to-comment even if there are comments
// @include http://stackoverflow.com/admin/dashboard*
// @version 1.0
// @grant none
// @run-at document-start
// ==/UserScript==

var triggered = false;
document.addEventListener('readystatechange', function() {
    if(document.readyState != 'uninitialized' && document.readyState != 'loading' && !triggered) {
        triggered = true;
        [].forEach.call(document.querySelectorAll('input[disabled][value="convert to comment"]'), function(elem) {
            elem.disabled = false;
            elem.classList.add('convert-to-comment');
            elem.style.boxShadow = '0px 0px 5px rgba(255, 0, 0, 1), 0 1px 0 rgba(255, 255, 255, 0.4) inset';
            elem.title = 'make this answer a comment on the original question (ignores comments on the answer)';
        });
    }
}, true);

var confirm = window.confirm;
window.confirm = function(message) {
    if(message == 'The answer will become a comment on the question; are you sure?') {
        return true;
    }
    return confirm.apply(this, arguments);
};
