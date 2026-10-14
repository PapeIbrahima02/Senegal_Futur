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


    // ========== Animations fade-in, slide-in, zoom-in au scroll ==========
    const sections = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in");
    const observer = new IntersectionObserver((mesSections) => {

        mesSections.forEach((section) => {
            if (section.isIntersecting) {
                // Fade In
                if (section.target.classList.contains("fade-in")) {
                    section.target.classList.add("fade-in-active");
                }
                // Slide In
                if (section.target.classList.contains("slide-in-left")) {
                    section.target.classList.add("slide-in-left-active");
                }

                if (section.target.classList.contains("slide-in-right")) {
                    section.target.classList.add("slide-in-right-active");
                }
                // Zoom In
                if (section.target.classList.contains("zoom-in")) {
                    section.target.classList.add("zoom-in-active");
                }
            }
        });

    });

    // Observer toutes les sections
    sections.forEach((section) => {
        observer.observe(section);
    });


    //========== Validation du formulaire ===========
    const form = document.getElementById('inscriptionForm');
    const nomPrenom = document.getElementById('nom');
    const email = document.getElementById('mail');
    const tel = document.getElementById('telephone');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');
    const confirmation = document.getElementById('confirmation');

    if (form) {                     // if, permet de verifier d'abord avant d'executer
        form.addEventListener('submit', function(event) {       // event, parametre permettant de stocker les infos declanchees par l'evenement submit 
            let valid = true;
            // Réinitialiser les messages d'erreur
            document.getElementById("nomPrenomErreur").textContent = '';
            document.getElementById("mailErreur").textContent = '';
            document.getElementById("telErreur").textContent = '';
            document.getElementById("sujetErreur").textContent = '';
            document.getElementById("messageErreur").textContent = '';

            // Validation du nom
            if (nomPrenom.value.trim() === "") {             // .trim(), permet de supprimer les espaces du debut et du fin
                document.getElementById("nomPrenomErreur").textContent = 'Le nom et le prenom sont requis.';
                document.getElementById("nom").style.borderColor = 'red';
                valid = false;
            }

            // Validation de l'email
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email.value)) {                  //.test(), permet de verifier si la valeur du champ est respecte
                document.getElementById('mailErreur').textContent = 'Email invalide.';
                document.getElementById("mail").style.borderColor = 'red';
                valid = false;
            }

            // Validation du tel
            if (tel.value.length < 9) {
                document.getElementById("telErreur").textContent = 'Le numéro doit contenir au moins 9 chiffres.';
                document.getElementById("telephone").style.borderColor = 'red';
                valid = false;
            }

            // Validation du sujet
            if (sujet.value === 'choix') {           
                document.getElementById('sujetErreur').textContent = 'Le sujet est requis.';
                valid = false;
            }

            // Validation du message
            if (message.value.length < 20) {
                document.getElementById("messageErreur").textContent = 'Le message doit contenir au moins 20 caractères.';
                document.getElementById("message").style.borderColor = 'red';
                valid = false;
            }

            if (!valid) {               // Si le formulaire n’est PAS valide
                event.preventDefault(); // Empêche la soumission du formulaire
            } else {
                // Empêche la soumission immédiate
                event.preventDefault();
                // Affiche le message
                confirmation.textContent = "Message envoyé avec succès !";

                // Attend 0.5 secondes puis soumet le formulaire
                setTimeout(() => {
                    form.submit();
                }, 500);
            }
        });
    };


    //========== Année dynamique ==========
    const annee = document.getElementById("annee");
    annee.textContent = new Date().getFullYear();
})