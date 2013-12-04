/* Navigation component.
 * Top navigation single item.                                                  */

function NavigationCPN(ctn, source) {
    Toolkit.checkClassOf(source, jQuery);
    
    var c = new Component(ctn, "build/navigation.xml");
    
    c.registerMethod(NavigationCPN.prototype.init, "init", false);
    c.registerMethod(NavigationCPN.prototype.wrapperLeft, "wrapperLeft", false);
    c.registerMethod(NavigationCPN.prototype.wrapperWidth, "wrapperWidth", false);
    
    c.register("source", source);
    c.register("link", $(this.source).children("i.link").text());
    
    return c;
}
NavigationCPN.prototype.init = function() {
    var ctx = this;
    
    // Labelizing
    var label = $(this.source).children("i.label").text();
    this.qs("linkBack", "p").addClass("bundle-" + label);
    this.qs("linkFront", "p").addClass("bundle-" + label);
    this.qs("innerDescription").addClass("bundle-" + $(this.source).children("i.description").text());
    $(this.source).children("s.sublink").each(function() {
        var buff =  '<a href="' + $(this).children("i.to").text() + '">' +
                        '<li>' +
                            '<span class="bundle-' + $(this).children("i.label").text() + '"></span>' +
                            '<span class="bundle-' + $(this).children("i.description").text() + '"></span>' +
                        '</li>' +
                    '</a>';
        ctx.qs("innerList").append(buff);
    });
    Register.getByName("translator").qc("qb", this);
    
    // Colorizing
    var color = $(this.source).children("i.color").text();
    this.qs("link").addClass("force-" + color);
    this.qs("linkFront").addClass("force-" + color);
    this.qs("linkBack").addClass("force-" + color);
    this.qs("wrapper").addClass("force-" + color);
    this.getSelector("innerListElements", true).getNodes().addClass("force-" + color + " spe-colorHover");
    Register.getByName("palette").qc("refresh", this);
    
    // Positionning wrapper
    this.qs("wrapper").css({
        top: this.qs("$SELF").outerHeight(true) + "px",
        left: this.qc("wrapperLeft"),
        width: this.qc("wrapperWidth")
    });
};
NavigationCPN.prototype.wrapperLeft = function() {
    var ctx = this;
    var left = 0;
    this.qs("$SELF").parent().children().each(function(i) {
        if (i < $(ctx.container).index()) {
            left += parseFloat(window.getComputedStyle(this).width);
        }
    });
    return -left + "px";
};
NavigationCPN.prototype.wrapperWidth = function() {
    return this.qs("$SELF").parent().width() + "px";
};