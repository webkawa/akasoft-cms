/* Login page.                                                                  */

function LoginCPN(ctn) {
    var c = new Component(ctn, "build/login.xml");
    
    c.registerMethod(LoginCPN.prototype.init, "init", false);
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "leftHeader", {}, [1, 4]);
    c.qc("addStatic@Columnable", "rightHeader", {}, [1, 4]);
    
    c.saveInterface(StandardizableITF);
    c.qc("addComplete@Standardizable", "left", "div.cpnLargeField div.left p");
    
    return c;
}
LoginCPN.prototype.init = function() {
    this.startAndSave("login", new LargeFieldCPN(this.qs("login"), "login_login_label", "login_login_description"));
    this.startAndSave("password", new LargeFieldCPN(this.qs("password"), "login_password_label", "login_password_description"));
    this.startAndSave("recovery", new LargeFieldCPN(this.qs("recovery"), "login_recovery_label", "login_recovery_description"));
    
    Register.getByName("translator").qc("qb", this);
    Register.getByName("palette").qc("refresh", this);
};