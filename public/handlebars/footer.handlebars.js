document.addEventListener("DOMContentLoaded", function () {
  const source = document.getElementById('footer-template').innerHTML;
  const template = Handlebars.compile(source);

  const context = {
    contactUrl: "/public/main-pages/contact.html",
    copyright: "Nick O'Brien 2025",
    socialLinks: [
      {
        url: "https://www.instagram.com/the.lord.of.the.rats/",
        icon: "/public/logos/instagram-logo.png",
        alt: "Instagram logo",
        class: "pr-5"
      },
      {
        url: "https://www.tiktok.com/@the.lord.of.the.rats96",
        icon: "/public/logos/tiktok-logo.png",
        alt: "TikTok logo",
        class: "pr-5"
      },
      {
        url: "https://www.youtube.com/@The_Lord_Of_The_Rats",
        icon: "/public/logos/youtube-logo.png",
        alt: "YouTube logo",
        class: ""
      }
    ]
  };

  const html = template(context);
  document.getElementById('footer-container').innerHTML = html;
});