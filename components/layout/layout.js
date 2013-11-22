/* Layout component.
 * Global layout component.                                                     */


function LayoutCPN(ctn) {
    var c = new Component(ctn, "build/layout.xml");
    
    c.registerMethod(LayoutCPN.prototype.init, "init", false);
    c.registerMethod(LayoutCPN.prototype.defineBodyHeight, "defineBodyHeight", false);
    
    c.saveInterface(LoadableITF);
    c.qc("addTarget@Loadable", "background");
    c.qc("setState@Loadable", "Minimal");
    
    c.saveInterface(EnhanceableITF);
    c.qc("addForMixedOverflow@Enhanceable", "background");
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "navigationInner");
    
    return c;
}
LayoutCPN.prototype.init = function() {
    var t = new TranslatorPI(this.qs("virtuals", "div.translator"));
    
    Register.identify(t, "translator");
    t.start();
    t.qc("load", "fr", "bundle_fr");
    t.qc("load", "en", "bundle_en");
    
    t.qc("addAlways", "testA", this, "bodyCore", "p:first()");
    t.qc("addAlways", "testB", this, "bodyCore", "p:last()");
    
    t.qc("switch", "fr");
};
LayoutCPN.prototype.defineBodyHeight = function() {
    var h = this.qs("$BODY").height() - 
            this.qs("header").outerHeight(true) - 
            this.qs("navigation").outerHeight(true) - 
            this.qs("footer").outerHeight(true);
    this.register("body_height", h < 640 ? "640px" : h + "px", true);
};