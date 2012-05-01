YUI.add('moodle-theme_decaf-editbuttons', function(Y) {

/**
 * Splash theme colour switcher class.
 * Initialise this class by calling M.theme_splash.init
 */
var EditButtons = function() {
    EditButtons.superclass.constructor.apply(this, arguments);
};
EditButtons.prototype = {
    initializer : function(config) {
        var editbutton = Y.Node.create('<a></a>');
        editbutton.set('innerHTML', 'Edit');
        editbutton.addClass('decaf-editbutton');
        // Find all sets of icons and convert them to edit buttons
        Y.all('.commands').each(function(icons) {
            if(icons.all('a').getDOMNodes().length) {
                var thisbutton = editbutton.cloneNode(true);
                thisbutton.on('click', function(e, params) {
                    e.preventDefault();
                    var button = params[0];
                    var icons = params[1];
                    icons.setStyle('left', button.get('offsetLeft')+button.get('offsetWidth')+'px');
                    icons.setStyle('display', icons.getComputedStyle('display')=='none'?'block':'none');
                    button.toggleClass('active');
                }, this, [thisbutton, icons]);
                icons.all('a').each(function(tag) {
                    var caption = tag.get('title') || tag.one('img').get('title') || tag.one('img').get('alt');
                    tag.append('<span>' + caption + '</span>');
                });
                icons.wrap('<div class="decaf-editbutton-wrap"></div>').insert(thisbutton, icons);
            }
        });
    }
};
// Make the colour switcher a fully fledged YUI module
Y.extend(EditButtons, Y.Base, EditButtons.prototype, {
    NAME : 'Decaf theme edit buttoniser',
    ATTRS : {
        // No attributes at present
    }
});
// Our splash theme namespace
M.theme_decaf = M.theme_decaf || {};
// Initialisation function for the colour switcher
M.theme_decaf.initEditButtons = function(cfg) {
    return new EditButtons(cfg);
}

}, '@VERSION@', {requires:['base','node']});