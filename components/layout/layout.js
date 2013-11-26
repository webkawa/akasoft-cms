/* Layout component.
 * Global layout component.                                                     */


function LayoutCPN(ctn) {
    var c = new Component(ctn, "build/layout.xml");
    
    c.registerMethod(LayoutCPN.prototype.init, "init", false);
    c.registerMethod(LayoutCPN.prototype.defineBodyHeight, "defineBodyHeight", false);
    c.registerMethod(LayoutCPN.prototype.buildNavigation, "buildNavigation", false);
    c.registerMethod(LayoutCPN.prototype.startNavigation, "startNavigation", false);
    
    var cb = [
        {method: "buildNavigation"}
    ];
    c.registerSource("navigation", "data/content/navigation.xml", "Minimal", cb);
    
    c.saveInterface(LoadableITF);
    c.qc("addTarget@Loadable", "background");
    c.qc("setState@Loadable", "Minimal");
    
    c.saveInterface(EnhanceableITF);
    c.qc("addForMixedOverflow@Enhanceable", "background");
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "bodyNavigation");
    
    return c;
}

LayoutCPN.prototype.init = function() {
    var t = new TranslatorPI(this.qs("virtuals", "div.translator"));
    t.start();
    t.qc("load", "fr", "bundle_fr");
    t.qc("load", "en", "bundle_en");
    t.qc("switch", "fr");
    
    var p = new PalettePI(this.qs("virtuals", "div.palette"));
    p.start();
    p.qc("switch", "blue", true);
    
    Register.identify(t, "translator");
    Register.identify(p, "palette");
};
LayoutCPN.prototype.buildNavigation = function() {
    var ctx = this;
    $(this.getSourceData("navigation", "s.link")).each(function(i) {
        var n = this;
        setTimeout(function() {
            new NavigationCPN(ctx.qs("bodyNavigationLinks").eq(i), $(n)).start();
        }, 150 * i);
    });
};
LayoutCPN.prototype.startNavigation = function() {
    var ctx = this;
    this.qs("bodyNavigationLinks").each(function(i) {
        var n = this;
        setTimeout(function() {
            Register.getFrom(n).go("Close");
        }, 150 * i);
    });
};
LayoutCPN.prototype.defineBodyHeight = function() {
    var h = this.qs("$BODY").height() - 
            this.qs("header").outerHeight(true) - 
            this.qs("footer").outerHeight(true);
    this.register("body_height", h < 640 ? "640px" : h + "px", true);
};