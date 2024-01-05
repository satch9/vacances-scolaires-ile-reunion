let input_annee = document.querySelector("#annee");
//let btn_afficher = document.querySelector("#afficher");
//let visibility_btn = document.querySelector("#visibility_btn");
let visibility_text = document.querySelector("#visibility_text");
let section1 = document.querySelector("#section1");
let section2 = document.querySelector("#section2");
let visibility_calendar = document.querySelector("#visibility_calendar");
let resultat_jours_feries = document.querySelector("#resultat_jours_feries");
let resultat_vacances = document.querySelector("#resultat_vacances");
let btn_text = document.querySelector("#btn_text");
let input_focus = document.querySelector("#annee");
let title_principal = document.querySelector("#title_principal");
let title_jours_feries = document.querySelector("#title_jours_feries");
let title_vacances = document.querySelector("#title_vacances");
let form = document.querySelector("#form");
let containerJoursFeries = document.createElement("div");
const aujourdhui = new Date();
let fetchData;

input_annee.value = "";
visibility_calendar.classList.add("hidden");

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let buttonClicked = document.activeElement.id;
    console.log("buttonClicked", typeof buttonClicked);

    if (e.target[0].value == "" && buttonClicked !== "reset") {
        alert("Merci d'entrée une année au bon format");
        title_principal.classList.add("hidden");
        return;
    } else {

        fetchData = await getData(parseInt(e.target[0].value));
        switch (buttonClicked) {
            case "btn_calendrier":
                //console.log("btn_calendrier cliqué");
                visibility_text.classList.add("hidden");
                visibility_calendar.classList.remove("hidden");
                title_principal.classList.remove("hidden");
                //console.log("fetchDataCalendar", fetchDataCalendar);

                let str = "à l'île de la";
                title_principal.textContent = `${str[0].toUpperCase()}${str.slice(1)} ${fetchData['vacances'][0].location} pour l'année scolaire ${fetchData['vacances'][0].annee_scolaire}`;

                createCalendar(e.target[0].value, fetchData);
                fetchData=[];
                break;
            case "btn_text":
                console.log("btn_text cliqué");
                //fetchData = await getData(parseInt(e.target[0].value));
                //console.log("fetchData form", fetchData);
                visibility_text.classList.remove("hidden");
                title_principal.classList.remove("hidden");
                section1.classList.remove("hidden");
                section2.classList.remove("hidden");

                //console.log("data", data);
                resultat_jours_feries.textContent = "";
                resultat_vacances.textContent = "";

                createText(fetchData);
                
                break;

            default:
                console.log("reset cliqué");
                e.target[0].value = "";
                visibility_text.classList.add("hidden");
                section1.classList.add("hidden")
                section2.classList.add("hidden")
                visibility_calendar.classList.add("hidden");
                title_principal.classList.add("hidden");
                
                break;
        }

    }
});






