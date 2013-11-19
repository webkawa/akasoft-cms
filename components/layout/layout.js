/* Layout component.
 * Global layout component.                                                     */

function LayoutCPN(ctn) {
    var cpn = new Component(ctn, "build/layout.xml");
    
    cpn.registerMethod(LayoutCPN.prototype.defineBodyHeight, "defineBodyHeight", false);
    
    cpn.saveInterface(LoadableITF);
    cpn.qc("addTarget@Loadable", "background");
    cpn.qc("setState@Loadable", "Minimal");
    
    cpn.saveInterface(EnhanceableITF);
    cpn.qc("addForMixedOverflow@Enhanceable", "background");
    
    return cpn;
}
LayoutCPN.prototype.defineBodyHeight = function() {
    var h = this.qs("$BODY").height() - 
            this.qs("header").outerHeight(true) - 
            this.qs("navigation").outerHeight(true) - 
            this.qs("footer").outerHeight(true);
    this.register("body_height", h < 640 ? "640px" : h + "px", true);
};