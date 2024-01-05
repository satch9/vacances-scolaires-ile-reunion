function createCalendar(annee, ephemeride, conges) {
    /* const calendrierDiv = document.createElement("div");
    calendrierDiv.className = "calendar"; */

    // Mapper les noms des mois aux indices numériques
    const moisIndices = {
        "Janvier": 0,
        "Février": 1,
        "Mars": 2,
        "Avril": 3,
        "Mai": 4,
        "Juin": 5,
        "Juillet": 6,
        "Août": 7,
        "Septembre": 8,
        "Octobre": 9,
        "Novembre": 10,
        "Décembre": 11
    };

    for (const mois in ephemeride) {
        const jours = ephemeride[mois];
        const moisIndex = moisIndices[mois];
        const moisDiv = document.createElement("div");
        moisDiv.className = "month";
        moisDiv.textContent = mois.charAt(0).toUpperCase() + mois.slice(1); // Janvier, Février, etc.

        jours.forEach((jour, index) => {
            const jourDiv = document.createElement("div");
            jourDiv.className = "day";
            const jourNum = index + 1;
            const texteJour = `${jourNum}: ${jour[0]} ${jour[1]}`;

            // Vérifier les jours fériés
            const jourFerie = conges.jours_feries.find(j => j.dte.getDate() === jourNum && j.dte.getMonth() === moisIndex);
            if (jourFerie) {
                jourDiv.textContent = `${texteJour}`;
                jourDiv.className = "jour_ferie";
            } else {
                jourDiv.textContent = texteJour;
            }

            moisDiv.appendChild(jourDiv);
        });

        visibility_calendar.appendChild(moisDiv);
    }

    //visibility_calendar.appendChild(calendrierDiv);
}