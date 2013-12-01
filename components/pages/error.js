/* Error.
 * Key-based generic error page.                                                */

function ErrorCPN(ctn, key) {
    Toolkit.checkTypeOf(key, "string");
    
    var c = new Component(ctn, "build/error.xml");
    
    c.registerMethod(ErrorCPN.prototype.init, "init", false);
    c.register("key", key);
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "wrapper", {}, [1, 2], true);
    
    return c;
}
ErrorCPN.prototype.init = function() {
    this.qs("title").addClass("bundle-" + this.key + "_title");
    this.qs("subtitle").addClass("bundle-" + this.key + "_subtitle");
    this.qs("label").addClass("bundle-" + this.key + "_back");
    
    Register.getByName("translator").qc("qb", this);
    Register.getByName("palette").qc("refresh");
};