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
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    hamburger.classList.toggle('active')
});

navLinksLi.forEach(li => li.addEventListener('click', ()=> {
    navLinksLi.forEach(li => li.classList.remove('active'))
    li.classList.add('active')

    hamburger.classList.remove('active')
    navLinks.classList.remove('active')

}));


document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    "<span class='terminal-colour'>haydennaicker:~$</span> Scanning profile...            ",
    "<span class='terminal-colour'>haydennaicker:~$</span>                                ",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Data Analyst               ",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → BI Specialist              ",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Fullstack Developer        ",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Cloud Developer            ",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Microsoft Certified Trainer",
    "<span class='terminal-colour'>haydennaicker:~$</span>                                ",
    "<span class='terminal-colour'>haydennaicker:~$</span> Launching interface...         "
  ];

  const terminal = document.getElementById("terminal-output");
  let i = 0;

  function printLine() {
    if (i < lines.length) {
      terminal.innerHTML += (i > 0 ? "\n" : "") + lines[i];
      terminal.scrollTop = terminal.scrollHeight; // auto-scroll if needed
      i++;
      setTimeout(printLine, 1000);
    }
  }

  printLine();
});


// AOS
AOS.init();

