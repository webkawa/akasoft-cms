/* Page.
 * Generic page component, manages navigation and content switches.             */

function PageCPN(ctn) {
    var c = new Component(ctn, "build/page.xml");
    
    c.registerMethod(PageCPN.prototype.defineMainHeight, "defineMainHeight", false);
    c.registerMethod(PageCPN.prototype.save, "save", false);
    c.registerMethod(PageCPN.prototype.refresh, "refresh", false);
    c.registerMethod(PageCPN.prototype.to, "to", false);
    c.registerMethod(PageCPN.prototype.toLogin, "toLogin", false);
    c.registerMethod(PageCPN.prototype.toError, "toError", false);
    c.registerMethod(PageCPN.prototype.switchPageIn, "switchPageIn", false);
    
    c.saveInterface(NavigableITF);
    c.qc("definePost@Navigable", "switchPageIn");
    c.qc("defineDefault@Navigable", "toError");
    c.qc("addCaseContains@Navigable", "login", "toLogin");
    c.qc("addCaseContains@Navigable", "error", "toError");
    
    c.register("content", null);
    
    Register.identify(c, "nav");
    
    return c;
}

// Display
PageCPN.prototype.defineMainHeight = function() {
    var h = this.qs("$SELF").height() -
            this.qs("header").outerHeight();
    
    this.register("main_height", h + "px", true);
};

// Loading 
PageCPN.prototype.save = function(component) {
    Toolkit.checkClassOf(component, Component);
    
    // Configure navigable
    if (component.hasInterface("Navigable")) {
        component.registerMethod(PageCPN.prototype.switchScreenIn, "switchScreenIn", false);
        component.qc("definePost@Navigable", "switchScreenIn");
    }
    
    // Changes classes and save
    if (!Toolkit.isNull(this.content)) {
        this.qs("title").removeClass(this.content.title);
        this.qs("subtitle").removeClass(this.content.subtitle);
    }
    this.content = component;
    this.qs("title").addClass(this.content.title);
    this.qs("subtitle").addClass(this.content.subtitle);
};
PageCPN.prototype.refresh = function() {
    this.content.start();
    
    Register.getByName("translator").qc("qb", this);
    Register.getByName("palette").qc("refresh");
};

// Navigation
PageCPN.prototype.to = function(page) {
    Toolkit.checkTypeOf(page, "string");
    
    var base = Toolkit.replaceAll(page, "#", "");
    var cut = base.split("/");
    var left = cut[0];
    var right = Toolkit.isNull(cut[1]) ? "" : cut[1];
    
    var screen = (right !== "");
    if (Toolkit.isNull(this.content)) {
        screen = false;
    } else if (!this.content.hasInterface("Navigable")) {
        screen = false;
    } else if (left !== this.qc("getCurrent@Navigable")) {
        screen = false;
    }
    
    if (screen) {
        this.content.qc("go@Navigable", right);
    } else {
        this.qc("go@Navigable", base);
    }
};
PageCPN.prototype.toLogin = function(address) {
    
};
PageCPN.prototype.toError = function(address) {
    var code = "404";
    if (address.indexOf("/") !== -1) {
        code = address.substr(address.indexOf("/") + 1, address.length - address.indexOf("/"));
    }
    
    
    this.qc("save", new ErrorCPN(this.qs("main"), code));
};

// Directors
PageCPN.prototype.switchPageIn = function() {
    this.qc("go", "SwitchPage");
};
PageCPN.prototype.switchScreenIn = function() {
    this.parent(1).qc("go", "SwitchScreen");
};