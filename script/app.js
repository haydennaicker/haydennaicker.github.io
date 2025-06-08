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
    "<span class='terminal-colour'>haydennaicker:~$</span> Scanning profile...",
    "<span class='terminal-colour'>haydennaicker:~$</span> ",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Data Analyst",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → BI Specialist",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Fullstack Developer",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Cloud Developer",
    "<span class='terminal-colour'>haydennaicker:~$</span>   → Microsoft Certified Trainer",
    "<span class='terminal-colour'>haydennaicker:~$</span> ",
    "<span class='terminal-colour'>haydennaicker:~$</span> Launching interface...",
    "<span class='terminal-colour'>haydennaicker:~$</span> Scroll to continue..."
  ];

  const terminal = document.getElementById("terminal-output");
  let i = 0;

  function printLine() {
    if (i < lines.length) {
      const div = document.createElement("div");
      div.innerHTML = lines[i];
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;

      // Longer delay after the first line
      const delay = (i === 0) ? 2000 : 800;

      i++;
      setTimeout(printLine, delay);
    }
  }

  printLine();
});


// Typed js
var options = {
  strings: ['Hayden Naicker'],
  typeSpeed: 50,
  showCursor: true,
  onComplete: function(self) {
    setTimeout(() => {
      self.cursor.remove(); // or self.cursor.style.display = 'none';
    }, 1500); // wait 2 seconds (2000 ms)
  }
};
  
var typed = new Typed('#hero-titles', options);



// AOS
AOS.init();

