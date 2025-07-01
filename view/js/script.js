fetch('include/templates.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    document.getElementById('header').innerHTML = doc.getElementById('header-template').innerHTML;
    //document.getElementById('menu').innerHTML = doc.getElementById('menu-template').innerHTML;
    document.getElementById('footer').innerHTML = doc.getElementById('footer-template').innerHTML;
  });
