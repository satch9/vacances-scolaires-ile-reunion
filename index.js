let conges = {
    vacances: [],
    jours_feries: []
}

let input_annee = document.querySelector("#annee");
input_annee.value = "";
let btn_afficher = document.querySelector("#afficher");
let visibility_btn = document.querySelector("#visibility_btn");
let visibility_text = document.querySelector("#visibility_text");
let resultat_jours_feries = document.querySelector("#resultat_jours_feries");
let resultat_vacances = document.querySelector("#resultat_vacances");
let btn_text = document.querySelector("#btn_text");
let input_focus = document.querySelector("#annee");
const title_principal= document.querySelector("#title_principal");
const title_jours_feries = document.querySelector("#title_jours_feries");
const title_vacances = document.querySelector("#title_vacances");
const form = document.querySelector("form");
const containerJoursFeries = document.createElement("div");
const aujourdhui = new Date();

const getData = async (annee) => {

    console.log("année", annee);


    const JourAn = new Date(annee + 1, "00", "01")
    const FeteTravail = new Date(annee + 1, "04", "01")
    const Victoire1945 = new Date(annee + 1, "04", "08")
    const FeteNationale = new Date(annee + 1, "06", "14")
    const Assomption = new Date(annee + 1, "07", "15")
    const Toussaint = new Date(annee, "10", "01")
    const Armistice = new Date(annee, "10", "11")
    const FeteCaf = new Date(annee, "11", "20")
    const Noel = new Date(annee, "11", "25")

    const G = (annee + 1) % 19
    const C = Math.floor((annee + 1) / 100)
    const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    const I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    const J = ((annee + 1) * 1 + Math.floor((annee + 1) / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    const L = I - J
    const MoisPaques = 3 + Math.floor((L + 40) / 44)
    const JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    const Paques = new Date(annee + 1, MoisPaques - 1, JourPaques)
    const VendrediSaint = new Date(annee + 1, MoisPaques - 1, JourPaques - 2)
    const LundiPaques = new Date(annee + 1, MoisPaques - 1, JourPaques + 1)
    const Ascension = new Date(annee + 1, MoisPaques - 1, JourPaques + 39)
    const Pentecote = new Date(annee + 1, MoisPaques - 1, JourPaques + 49)
    const LundiPentecote = new Date(annee + 1, MoisPaques - 1, JourPaques + 50)

    await fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=annee_scolaire%3D%22${annee}-${annee + 1}%22&rows=30&sort=start_date&facet=description&facet=population&facet=start_date&facet=end_date&facet=zones&refine.zones=R%C3%A9union&timezone=Indian%2FReunion`)
        .then((resp) => resp.json())
        .then((resp) => {

            //console.log('resp', resp)

            for (const key in resp) {
                //console.log(resp[key])

                if (Array.isArray(resp[key])) {
                    resp[key].forEach(element => {
                        if (element.fields) {
                            //console.log("element", element.fields)
                            if (element.fields.description === "Vacances après 1ère période") {
                                conges.vacances[0] = (element.fields)
                            }
                            if (element.fields.description === "Vacances d'Été austral") {
                                conges.vacances[1] = (element.fields)
                            }
                            if (element.fields.description === "Vacances après 3ème période") {
                                conges.vacances[2] = (element.fields)
                            }
                            if (element.fields.description === "Vacances après 4ème période") {
                                conges.vacances[3] = (element.fields)
                            }
                            if (element.fields.description === "Vacances d'Hiver austral") {
                                conges.vacances[4] = (element.fields)
                            }

                        }

                    })

                };
            }


            conges.jours_feries.push({
                name: "Toussaint",
                dte: Toussaint
            });
            conges.jours_feries.push({
                name: "Armistice",
                dte: Armistice
            });
            conges.jours_feries.push({
                name: "Fête Caf",
                dte: FeteCaf
            });
            conges.jours_feries.push({
                name: "Noël",
                dte: Noel
            });

            conges.jours_feries.push({
                name: "Jour de l'An",
                dte: JourAn
            });
            conges.jours_feries.push({
                name: "Vendredi Saint",
                dte: VendrediSaint
            })
            conges.jours_feries.push({
                name: "Pâques",
                dte: Paques
            });
            conges.jours_feries.push({
                name: "Lundi de Pâques",
                dte: LundiPaques
            });
            conges.jours_feries.push({
                name: "Fête du travail",
                dte: FeteTravail
            });
            conges.jours_feries.push({
                name: "Victoire de 1945",
                dte: Victoire1945
            });
            conges.jours_feries.push({
                name: "Ascension",
                dte: Ascension
            });
            conges.jours_feries.push({
                name: "Pentecôte",
                dte: Pentecote
            });
            conges.jours_feries.push({
                name: "Lundi de Penteôte",
                dte: LundiPentecote
            });
            conges.jours_feries.push({
                name: "Fête Nationale",
                dte: FeteNationale
            });
            conges.jours_feries.push({
                name: "Assomption",
                dte: Assomption
            });


        })
        .catch((error) => console.log(error))
    return conges;
}

const isCloseToDate = (inputDate, targetDate, proximity = 10) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const diff = Math.abs(new Date(inputDate) - new Date(targetDate)) / ONE_DAY;

    return diff <= proximity;
}

const isTodayBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= aujourdhui && aujourdhui <= end;
}

input_focus.addEventListener('focus', (e) => {
    visibility_btn.classList.add("hidden");
    visibility_text.classList.add("hidden");
});

btn_afficher.addEventListener('click', (e) => {
    e.preventDefault();
    

    if(input_annee.value =="" ){
        alert("Merci d'entrée une année au bon format");
        return;
    }else{
        visibility_btn.classList.remove("hidden");
    }
});


btn_text.addEventListener('click', (e) => {
    visibility_text.classList.remove("hidden");

    data = getData(parseInt(input_annee.value));
    console.log("data", data);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };


    resultat_jours_feries.textContent = "";
    resultat_vacances.textContent = "";

    data.then((result) => {
        console.log("jours feriés", result.jours_feries);

        result.jours_feries.forEach((r) => {

            const joursFeriesDiv = document.createElement("div");
            const cardHeader = document.createElement("div");
            cardHeader.textContent = `${r.name}`;
            cardHeader.style.border = "1px";
            cardHeader.style.backgroundColor = "#5B8CC8";
            cardHeader.style.textAlign = "center";
            cardHeader.style.paddingTop = "0.5rem";
            cardHeader.style.paddingBottom = "0.5rem";
            const cardBody = document.createElement("div");
            cardBody.style.textAlign = "center";
            cardBody.style.paddingTop = "0.5rem";
            cardBody.style.paddingBottom = "0.5rem";
            cardBody.textContent = `${r.dte.toLocaleDateString("fr-FR", options)}`;

            //joursFeriesDiv.classList.add("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight")
            joursFeriesDiv.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
            joursFeriesDiv.style.appearance = "none";
            joursFeriesDiv.style.border = "1px";
            joursFeriesDiv.style.borderRadius = "0.25rem";
            joursFeriesDiv.style.width = "100%";
            /* joursFeriesDiv.style.paddingTop = "0.5rem";
            joursFeriesDiv.style.paddingBottom = "0.5rem";
            joursFeriesDiv.style.paddingLeft = "0.75rem";
            joursFeriesDiv.style.paddingRight = "0.75rem"; */
            joursFeriesDiv.style.marginBottom = "0.5rem";
            joursFeriesDiv.style.width = "150px";

            if (isCloseToDate(aujourdhui, r.dte)) {
                joursFeriesDiv.style.fontWeight = "bold";
                joursFeriesDiv.style.border = "2px solid red";
            }
            joursFeriesDiv.appendChild(cardHeader);
            joursFeriesDiv.appendChild(cardBody);
            resultat_jours_feries.appendChild(joursFeriesDiv);
        });

        result.jours_feries = []
        console.log("vacances", result.vacances[0]);

        title_jours_feries.textContent = `Jours fériés à l'île de la ${result.vacances[0].location} pour l'année scolaire ${result.vacances[0].annee_scolaire}`
        title_vacances.textContent = `Vacances à l'île de la ${result.vacances[0].location} pour l'année scolaire ${result.vacances[0].annee_scolaire}`
        
        result.vacances.forEach((r) => {

            const vacancesDiv = document.createElement("div");
            const cardHeader = document.createElement("div");
            cardHeader.textContent = `${r.description}`;
            cardHeader.style.border = "1px";
            cardHeader.style.backgroundColor = "#5B8CC8";
            cardHeader.style.textAlign = "center";
            cardHeader.style.paddingTop = "0.5rem";
            cardHeader.style.paddingBottom = "0.5rem";
            const cardBody = document.createElement("div");
            cardBody.style.textAlign = "center";
            cardBody.style.paddingTop = "0.5rem";
            cardBody.style.paddingBottom = "0.5rem";
            cardBody.textContent = `${(new Date(r.start_date)).toLocaleDateString("fr-FR", options)} au ${(new Date(r.end_date)).toLocaleDateString("fr-FR", options)}`;

            vacancesDiv.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
            vacancesDiv.style.appearance = "none";
            vacancesDiv.style.border = "1px";
            vacancesDiv.style.borderRadius = "0.25rem";
            vacancesDiv.style.width = "100%";
            /* vacancesDiv.style.paddingTop = "0.5rem";
            vacancesDiv.style.paddingBottom = "0.5rem";
            vacancesDiv.style.paddingLeft = "0.75rem";
            vacancesDiv.style.paddingRight = "0.75rem"; */
            vacancesDiv.style.marginBottom = "0.5rem";
            vacancesDiv.style.width = "150px";

            if (isTodayBetween(r.start_date, r.end_date)) {
                vacancesDiv.style.fontWeight = "bold";
                vacancesDiv.style.border = "2px solid red";
            }

            vacancesDiv.appendChild(cardHeader);
            vacancesDiv.appendChild(cardBody);
            resultat_vacances.appendChild(vacancesDiv);
        });
        result.vacances = [];
    });

    form.reset();
});

