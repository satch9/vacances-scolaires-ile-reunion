let conges = {
    vacances: [],
    jours_feries: []
}




const getData = (date_depart) => {

    const JourAn = new Date(date_depart + 1, "00", "01")
    const FeteTravail = new Date(date_depart + 1, "04", "01")
    const Victoire1945 = new Date(date_depart + 1, "04", "08")
    const FeteNationale = new Date(date_depart + 1, "06", "14")
    const Assomption = new Date(date_depart + 1, "07", "15")
    const Toussaint = new Date(date_depart, "10", "01")
    const Armistice = new Date(date_depart, "10", "11")
    const FeteCaf = new Date(date_depart, "11", "20")
    const Noel = new Date(date_depart, "11", "25")

    const G = (date_depart + 1) % 19
    const C = Math.floor((date_depart + 1) / 100)
    const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    const I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    const J = ((date_depart + 1) * 1 + Math.floor((date_depart + 1) / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    const L = I - J
    const MoisPaques = 3 + Math.floor((L + 40) / 44)
    const JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    const Paques = new Date(date_depart + 1, MoisPaques - 1, JourPaques)
    const VendrediSaint = new Date(date_depart + 1, MoisPaques - 1, JourPaques - 2)
    const LundiPaques = new Date(date_depart + 1, MoisPaques - 1, JourPaques + 1)
    const Ascension = new Date(date_depart + 1, MoisPaques - 1, JourPaques + 39)
    const Pentecote = new Date(date_depart + 1, MoisPaques - 1, JourPaques + 49)
    const LundiPentecote = new Date(date_depart + 1, MoisPaques - 1, JourPaques + 50)

    fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=annee_scolaire%3D%22${date_depart}-${date_depart+1}%22&rows=30&sort=start_date&facet=description&facet=population&facet=start_date&facet=end_date&facet=zones&refine.zones=R%C3%A9union&timezone=Indian%2FReunion`)
        .then((resp) => resp.json())
        .then((resp) => {

            console.log('resp', resp)

            for (const key in resp) {
                //console.log(resp[key])

                if (Array.isArray(resp[key])) {
                    resp[key].forEach(element => {
                        if (element.fields) {
                            //console.log("element", element.fields)
                            if (element.fields.description === "Vacances après 1ère période") {
                                conges.vacances.push(element.fields)
                            }
                            if (element.fields.description === "Vacances d'Été austral") {
                                conges.vacances.push(element.fields)
                            }
                            if (element.fields.description === "Vacances après 3ème période") {
                                conges.vacances.push(element.fields)
                            }
                            if (element.fields.description === "Vacances après 4ème période") {
                                conges.vacances.push(element.fields)
                            }
                            if (element.fields.description === "Vacances d'Hiver austral") {
                                conges.vacances.push(element.fields)
                            }

                        }

                    })

                };
            }

            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            conges.jours_feries.push({
                name: "Jour de l'An",
                dte: JourAn.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Fête du travail",
                dte: FeteTravail.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Victoire de 1945",
                dte: Victoire1945.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Fête Nationale",
                dte: FeteNationale.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Assomption",
                dte: Assomption.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Toussaint",
                dte: Toussaint.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Armistice",
                dte: Armistice.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Fête Caf",
                dte: FeteCaf.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Noël",
                dte: Noel.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Pâques",
                dte: Paques.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Vendredi Saint",
                dte: VendrediSaint.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Lundi de Pâques",
                dte: LundiPaques.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Ascension",
                dte: Ascension.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Pentecôte",
                dte: Pentecote.toLocaleDateString("fr-FR", options)
            })
            conges.jours_feries.push({
                name: "Lundi de Penteôte",
                dte: LundiPentecote.toLocaleDateString("fr-FR", options)
            })



        })
        .catch((error) => console.log(error))
    return conges
}

let input_annee = document.querySelector("#annee")

input_annee.value=""
let btn_afficher = document.querySelector("#afficher")

btn_afficher.addEventListener('click', (e) => {
    console.log('clicked')
    
    console.log("input_annee", input_annee.value)
    let vac = getData(parseInt(input_annee.value))

    console.log("vac", vac)

})
