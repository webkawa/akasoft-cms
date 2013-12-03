/* Page.
 * Generic page component, manages navigation and content switches.             */

function PageCPN(ctn) {
    var c = new Component(ctn, "build/page.xml");
    
    c.registerMethod(PageCPN.prototype.switchHeader, "switchHeader", false);
    c.registerMethod(PageCPN.prototype.refreshHeader, "refreshHeader", false);
    c.registerMethod(PageCPN.prototype.switchContent, "switchContent", false);
    c.registerMethod(PageCPN.prototype.refreshContent, "refreshContent", false);
    c.registerMethod(PageCPN.prototype.to, "to", false);
    c.registerMethod(PageCPN.prototype.toLogin, "toLogin", false);
    c.registerMethod(PageCPN.prototype.to404, "to404", false);
    
    c.saveInterface(NavigableITF);
    c.qc("defineDefault@Navigable", "to404");
    c.qc("addCaseContains@Navigable", "login", "toLogin");
    
    return c;
}
PageCPN.prototype.init = function() {
    
};

// Navigation
PageCPN.prototype.to = function(page) {
    if (Toolkit.isNull(page)) {
        this.qc("go@Navigable", Toolkit.replaceAll(this.qs("$TRIGGERED").attr("href"), "#", ""));
    } else {
        this.qc("go@Navigable", page);
    }
};
PageCPN.prototype.toLogin = function(a) {
    
};
PageCPN.prototype.to404 = function() {
    //new ErrorCPN(this.qs("bodyCore"), "404").start();
};