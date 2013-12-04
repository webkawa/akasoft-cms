/* Error.
 * Key-based generic error page.                                                */

function ErrorCPN(ctn, code) {
    Toolkit.checkTypeOf(code, "string");
    
    var c = new Component(ctn, "build/error.xml");
    
    c.registerMethod(ErrorCPN.prototype.init, "init", false);
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "wrapper", {}, [1, 5], true);
    
    c.register("code", code);
    c.register("title", "bundle-error_title", false);
    
    return c;
}
ErrorCPN.prototype.init = function() {
    this.qs("code").html(this.code);
    
    var label, description;
    switch (this.code) {
        case "500":
            label = "bundle-error_500_label";
            description = "bundle-error_500_description";
            break;
        default:
            this.qs("code").html("404");
            
            label = "bundle-error_404_label";
            description = "bundle-error_404_description";
            break;
    }
    this.qs("button").addClass("bundle-error_back");
    this.qs("label").addClass(label);
    this.qs("description").addClass(description);
    this.qs("link").attr("href", this.getParent(1).qc("getPrevious@Navigable"));
    
    Register.getByName("translator").qc("qb", this);
    Register.getByName("palette").qc("refresh");
};