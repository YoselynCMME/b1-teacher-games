/**
 * Created by Clandor on 16/02/2019.
 */

document.oncontextmenu = function() {
    return false
};
function right(e) {
    if (navigator.appName == 'Netscape' && e.which == 3) {
        return false;
    }
    else if (navigator.appName == 'Microsoft Internet Explorer' && event.button==2) {
        return false;
    }
    return true;
}
document.onmousedown = right;

$(document).keydown(function (event) {
    if (event.keyCode == 123) {
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        return false;
    }
});