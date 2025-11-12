document.addEventListener("DOMContentLoaded", function () {
    const source = document.getElementById('header-template').innerHTML;
    const template = Handlebars.compile(source);

    const context = {
        homeUrl: "index.html",
        siteTitle: "The Lord of the Rats",
        navLinks: [
            { label: "Home", url: "index.html" },
            { label: "About", url: "public/main-pages/about.html" },
            { label: "Gallery", url: "public/main-pages/gallery.html" },
            { label: "Contact", url: "public/main-pages/contact.html" }
        ]
    };

    const html = template(context);
    document.getElementById('header-container').innerHTML = html;
});