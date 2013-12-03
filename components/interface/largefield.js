/* Large textfield.                                                             */


function LargeFieldCPN(ctn, label, description) {
    Toolkit.checkTypeOf(label, "string");
    Toolkit.checkTypeOf(description, "string");
    
    var c = new Component(ctn, "build/largefield.xml");
    
    c.registerMethod(LargeFieldCPN.prototype.init, "init", false);
    
    c.register("label", label);
    c.register("description", description);
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "wrapper", {
        lastexcept: "borderR1px borderWhite"
    }, [1, 4], true);
    
    c.saveInterface(InputableITF);
    
    return c;
}
LargeFieldCPN.prototype.init = function() {
    this.qs("label").addClass("bundle-" + this.label);
    this.qs("description").addClass("bundle-" + this.description);
    Register.getByName("translator").qc("qb", this);
};
LargeFieldCPN.prototype.push = function() {
    this.qc("submit@Inputable", this.qs("input").val());
};