document.addEventListener("DOMContentLoaded", () =>{

    // ======== menu hamburger ========
    const burger = document.querySelector(".menu-burger");
    const menu = document.querySelector(".menu");
    burger.addEventListener("click", () =>{
        menu.classList.toggle("nav-active");        // Création de classe CSS
    });


    // ======== Dark Mode / Light Mode =========
    const btnDark = document.querySelector(".btn-dark");
    if (localStorage.getItem("theme") === "dark" ){
        document.documentElement.setAttribute("data-theme", "dark")
    };
    // Changement de thème au clic
    btnDark.addEventListener("click", () => {
        const darkMode = document.documentElement.getAttribute("data-theme");
        if (darkMode === "dark") {
            document.documentElement.removeAttribute("data-theme");
            // Sauvegarde
            localStorage.setItem("theme", "light");

        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            // Sauvegarde
            localStorage.setItem("theme", "dark");
        }
    });


    //======= Changement de style du navbar au scroll =======
    const navbar = document.querySelector("header");
    window.addEventListener("scroll", () => {                       
        if(window.scrollY > 80) {                                   
            navbar.classList.add("navbar-scroll")                   
        }else{
            navbar.classList.remove("navbar-scroll")
        }
    });


    //========== Bouton retour en haut ==========
    const btnHaut = document.querySelector("#btn-Top");       
    window.addEventListener("scroll", () => {                       
        if(window.scrollY > 400) {                                  
            btnHaut.style.display = "block"             
        }else{
            btnHaut.style.display = "none"              
        }
    });

    btnHaut.addEventListener("click", () => {                       
        window.scrollTo({           // Methode qui Fait remonter la page
            top : 0,                                                    
            behavior : "smooth"     // defilement fluide
        }); 
    });

    //==== Setion chiffres clés ====
    //======= Les compteurs qui s'animent de 0 à leur valeur au scroll ======
    function animerCompteur(selecteur, pas, valeurArret, vitesse) {
        const element = document.querySelector(selecteur);
        if (!element) return; // on sort si l'élément n'existe pas

        const observeur = new IntersectionObserver((entrer) => {
            entrer.forEach((entre) => {
                if (entre.isIntersecting) {
                    let cpt = 0;
                    let interval = setInterval(() => {
                        cpt += pas;
                        element.textContent = cpt ;
                        if (cpt >= valeurArret) {
                            clearInterval(interval);
                        }
                    }, vitesse);
                }
            });
        });

        observeur.observe(element);
    }

    // Appels de la fonction
    animerCompteur("#nbr1", 1, 8, 10);     
    animerCompteur("#nbr2", 10, 150, 20);     
    animerCompteur("#nbr3", 5, 50, 10);
})