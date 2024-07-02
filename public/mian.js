document.addEventListener("DOMContentLoaded", function() {
    var acc = document.getElementsByClassName("bg-white");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});
document.getElementById('service').addEventListener('click', function() {
    var section2 = document.getElementById('section-3');
    section2.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('faq').addEventListener('click', function() {
    var section2 = document.getElementById('section-5');
    section2.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('home').addEventListener('click', function() {
    var section2 = document.getElementById('section-1');
    section2.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('about1').addEventListener('click', function() {
    var section2 = document.getElementById('section-3');
    section2.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('blog').addEventListener('click', function() {
    var section2 = document.getElementById('section-8');
    section2.scrollIntoView({ behavior: 'smooth' });
});

