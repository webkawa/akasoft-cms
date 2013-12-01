/* Layout component.
 * Global layout component.                                                     */

function LayoutCPN(ctn) {
    var c = new Component(ctn, "build/layout.xml");
    
    c.registerMethod(LayoutCPN.prototype.init, "init", false);
    c.registerMethod(LayoutCPN.prototype.defineBodyHeight, "defineBodyHeight", false);
    c.registerMethod(LayoutCPN.prototype.buildFooter, "buildFooter", false);
    c.registerMethod(LayoutCPN.prototype.buildNavigation, "buildNavigation", false);
    c.registerMethod(LayoutCPN.prototype.startNavigation, "startNavigation", false);
    c.registerMethod(LayoutCPN.prototype.to, "to", false);
    c.registerMethod(LayoutCPN.prototype.toLogin, "toLogin", false);
    c.registerMethod(LayoutCPN.prototype.to404, "to404", false);
    
    c.registerSource("navigation", "data/content/navigation.xml", "Minimal", [
        {method: "buildNavigation"}
    ]);
    
    c.saveInterface(LoadableITF);
    c.qc("addTarget@Loadable", "background");
    c.qc("setState@Loadable", "Minimal");
    
    c.saveInterface(EnhanceableITF);
    c.qc("addForMixedOverflow@Enhanceable", "background");
    
    c.saveInterface(ColumnableITF);
    c.qc("addStatic@Columnable", "bodyNavigation");
    c.qc("addStatic@Columnable", "footerInner", {
        lastexcept: "borderR1px"
    }, [7, 1, 1, 1], false);
    
    c.saveInterface(NavigableITF);
    c.qc("addCaseEquals@Navigable", "login", "toLogin");
    c.qc("defineDefault@Navigable", "to404");
    
    return c;
}

LayoutCPN.prototype.init = function() {
    /* Translator configuration */
    var t = new TranslatorPI(this.qs("virtuals", "div.translator"));
    t.start();
    t.qc("load", "fr", "bundle_fr");
    t.qc("load", "en", "bundle_en");
    t.qc("switch", "fr");
    t.qc("qb", this);
    Register.identify(t, "translator");
    
    /* Palette configuration */
    var p = new PalettePI(this.qs("virtuals", "div.palette"));
    p.start();
    p.qc("switch", "blue", true);
    Register.identify(p, "palette");
};

LayoutCPN.prototype.defineBodyHeight = function() {
    var h = this.qs("$BODY").height() - 
            this.qs("header").outerHeight(true) - 
            this.qs("footer").outerHeight(true);
    this.register("body_height", h < 640 ? "640px" : h + "px", true);
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
            try {
                Register.getFrom(n).qc("go", "Close");
            } catch (e) {
                ErrorManager.process(e);
            }
        }, 150 * i);
    });
};
LayoutCPN.prototype.buildFooter = function() {
    new FootLinkCPN(this.qs("footerInnerLinks").eq(0), {
        link: "x",
        label: "bundle-sample_lorem_short",
        description: "bundle-sample_lorem_short"
    }).start();
    
    new FootLinkCPN(this.qs("footerInnerLinks").eq(1), {
        link: "x",
        label: "bundle-sample_lorem_short",
        description: "bundle-sample_lorem_short"
    }).start();
    
    new FootLinkCPN(this.qs("footerInnerLinks").eq(2), {
        link: "x",
        label: "bundle-sample_lorem_short",
        description: "bundle-sample_lorem_short"
    }).start();
};
LayoutCPN.prototype.to = function(page) {
    if (Toolkit.isNull(page)) {
        this.qc("go@Navigable", Toolkit.replaceAll(this.qs("$TRIGGERED").attr("href"), "#", ""));
    } else {
        this.qc("go@Navigable", page);
    }
};
LayoutCPN.prototype.toLogin = function() {
    new LoginCPN(this.qs("bodyCore")).start();
};
LayoutCPN.prototype.to404 = function() {
    new ErrorCPN(this.qs("bodyCore"), "404").start();
};