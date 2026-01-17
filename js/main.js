// 1. Logic cho Dark Mode
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Kiểm tra theme đã lưu hoặc mặc định hệ thống
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    html.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.theme = 'light';
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. Logic cho Progress Bar
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
};

// 3. Logic cho Copy Code
function copyToClipboard() {
    const codeText = document.getElementById("codeBlock").innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.getElementById("copyBtn");
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i> Copied!';
        btn.classList.add('border-green-500', 'text-green-600');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('border-green-500', 'text-green-600');
        }, 2000);
    });
}

// 4. Logic Highlighting Mục lục (Table of Contents)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section, header').forEach((section) => {
    observer.observe(section);
});