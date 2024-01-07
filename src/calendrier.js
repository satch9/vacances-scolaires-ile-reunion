function checkRentree(jourDate, conges) {
    const jourDateFormat = `${String(jourDate.getDate()).padStart(2, '0')}/${String(jourDate.getMonth() + 1).padStart(2, '0')}/${jourDate.getFullYear()}`;

    const rentreeEleve = conges.rentree_scolaire.data.some(e => e.date_de_rentree_eleve === jourDateFormat);
    const rentreeEnseignant = conges.rentree_scolaire.data.some(e => e.date_de_rentree_enseignant === jourDateFormat);

    if (rentreeEleve) {
        return {
            date: rentreeEleve.date_de_rentree_eleve,
            type: 'Élèves'
        };
    }
    if (rentreeEnseignant) {
        return {
            date: rentreeEnseignant.date_de_rentree_enseignant,
            type: 'Enseignants'
        };
    }

    return null;
}

function createCalendar(annee, ephemeride, conges) {
    // Effacer le contenu précédent
    visibility_calendar.innerHTML = '';

    console.log("conges", conges);

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

    const moisOrdre = [
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
    ];

    let anneeMois;
    let moisIndex;

    moisOrdre.forEach((mois, moisOrdreIndex) => {
        const jours = ephemeride[mois];
        if (moisOrdreIndex === 12) {
            moisIndex = moisIndices[mois];
            anneeMois = parseInt(annee) + 1;
        } else {
            moisIndex = moisIndices[mois];
            anneeMois = moisIndex >= 7 ? annee : parseInt(annee) + 1;
        }


        const moisDiv = createHtmlElement('div', 'bg-white shadow overflow-hidden rounded-lg mb-6', '');
        const moisHeader = createHtmlElement('div', 'px-4 py-5 sm:px-6 border-b border-gray-200 text-lg font-medium text-gray-900', mois + ' ' + anneeMois);
        moisDiv.appendChild(moisHeader);

        // Ajouter les jours de la semaine sous le titre du mois
        const daysOfWeekDiv = createDaysOfWeek();
        moisDiv.appendChild(daysOfWeekDiv);

        // Déterminer le premier jour du mois
        const firstDayOfMonth = getFirstDayOfMonth(anneeMois, moisIndex);
        const gridDiv = createHtmlElement('div', 'grid grid-cols-7 gap-4 p-4 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7', '');

        // Ajouter des jours du mois précédent si nécessaire
        if (firstDayOfMonth !== 1) { // 1 représente Lundi
            const daysToAdd = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
            for (let i = 0; i < daysToAdd; i++) {
                const emptyDayDiv = document.createElement('div');
                gridDiv.appendChild(emptyDayDiv);
            }
        }


        jours.forEach((jour, index) => {
            const jourNum = index + 1;
            const jourDivClass = "flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white border rounded-lg text-center cursor-pointer hover:bg-gray-100";

            const jourDiv = createHtmlElement('div', jourDivClass, jourNum.toString());

            const jourDate = new Date(anneeMois, moisIndex, jourNum);
            const isJourFerie = conges.jours_feries.find(j => j.dte.getDate() === jourNum && j.dte.getMonth() === moisIndex);
            const rentreeInfo = checkRentree(jourDate, conges); // Fonction à créer pour vérifier les jours de rentrée

            if (isJourFerie) {
                jourDiv.classList.add('bg-red-100', 'text-red-800');
            } else if (rentreeInfo) {
                jourDiv.classList.add('bg-blue-100', 'text-blue-800');
            }

            // Vérifier si c'est un jour de vacances
            const inVacationPeriod = conges.vacances.some(v => {
                const startDate = new Date(v.start_date);
                const endDate = new Date(v.end_date);
                endDate.setDate(endDate.getDate() - 1); // Les vacances s'arrêtent à date de fin -1
                return jourDate >= startDate && jourDate <= endDate;
            });

            if (inVacationPeriod) {
                jourDiv.classList.add('border-2', 'border-green-500');
            }

            jourDiv.onclick = () => {
                let popupText = `${jourNum}: ${jour[1]} ${jour[0]}`;
                if (rentreeInfo) {
                    popupText += ` / Rentrée scolaire: ${rentreeInfo.type}`;
                }
                openPopup(popupText);
            }

            gridDiv.appendChild(jourDiv);
        });

        moisDiv.appendChild(gridDiv);
        visibility_calendar.appendChild(moisDiv);
    });

}