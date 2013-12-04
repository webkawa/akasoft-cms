/* Foot link component.
 * Footer navigation single item.                                               */

function FootLinkCPN(ctn, cfg) {
    Toolkit.checkTypeOf(cfg.link, "string");
    Toolkit.checkTypeOf(cfg.label, "string");
    Toolkit.checkTypeOf(cfg.description, "string");
    
    var c = new Component(ctn, "build/footlink.xml");
    
    c.registerMethod(FootLinkCPN.prototype.init, "init", false);
    
    c.register("params", cfg);
    c.register("link", cfg.link);
    
    return c;
}
FootLinkCPN.prototype.init = function() {
    this.qs("label").addClass(this.params.label);
    this.qs("description").addClass(this.params.description);
    Register.getByName("translator").qc("qb", this);
};