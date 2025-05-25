const navbar = document.querySelector('.navbar')
const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.nav-links')
const navLinksLi = document.querySelectorAll('.nav-links li')


window.addEventListener('scroll', () => {
    if(this.scrollY >= 100) {
        navbar.classList.add('scrolled')
    } else {
        navbar.classList.remove('scrolled')
    }
})

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    hamburger.classList.toggle('active')
})

navLinksLi.forEach(li => li.addEventListener('click', ()=> {
    navLinksLi.forEach(li => li.classList.remove('active'))
    li.classList.add('active')

    hamburger.classList.remove('active')
    navLinks.classList.remove('active')

}))


// Typed js
var options = {
    strings: [
        'Data Analyst',
        'BI Specialist',
        'Fullstack Developer',
        'Cloud Developer',
        'Microsoft Certified Trainer'
    ],
    loop: true,
    loopCount: Infinity,
    typeSpeed: 0,
    backDelay: 3500,
  };
  
var typed = new Typed('#hero-titles', options);

// AOS
AOS.init();


// emailJS send button function
function SendMail() {
    emailjs.send("service_yc4hdkj", "template_w6gujsm",{
        from_name : document.getElementById("name").value,
        from_email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    })
    setTimeout(() => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "Message Sent!";
    }, 2000);
}
