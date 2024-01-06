const createText = (data) => {
    for (const key in data) {
        if (key === "jours_feries") {

            console.log("data.jours_feries", data.jours_feries);

            data.jours_feries.forEach((r) => {
                // Création de la div principale pour un jour férié
                const joursFeriesDiv = createHtmlElement('div', 'shadow appearance-none border rounded w-full py-2 px-3 mb-4');

                // Création du header
                const cardHeader = createHtmlElement('div', 'text-center bg-blue-500 text-white font-bold py-1', r.name);

                // Création du body
                const cardBody = createHtmlElement('div', 'text-center', r.dte.toLocaleDateString("fr-FR", options));

                if (isCloseToDate(aujourdhui, r.dte)) {
                    joursFeriesDiv.classList.add("border-2");
                    joursFeriesDiv.classList.add("border-rose-500");
                }

                // Assemblage des éléments
                joursFeriesDiv.appendChild(cardHeader);
                joursFeriesDiv.appendChild(cardBody);

                // Ajout au DOM
                resultat_jours_feries.appendChild(joursFeriesDiv);
            });

            data[key] = []

        }
        if (key === "vacances") {
            console.log("vacances", data.vacances);
            /* let str = "à l'île de la";

            title_principal.textContent = `${str[0].toUpperCase()}${str.slice(1)} ${data[key][0].location} pour l'année scolaire ${data[key][0].annee_scolaire}`; */

            title_jours_feries.textContent = `Jours fériés`;
            title_vacances.textContent = `Vacances `;

            data.vacances.forEach((r) => {
                // Création de la div principale pour les vacances
                const vacancesDiv = createHtmlElement('div', 'shadow border rounded w-full mb-4', '');

                // Création du header des vacances
                const cardHeader = createHtmlElement('div', 'bg-blue-500 text-white text-center font-bold py-1', r.description);

                // Création du body des vacances
                let dateDebut = new Date(r.start_date).toLocaleDateString("fr-FR", options);
                let dateFin = new Date(r.end_date).toLocaleDateString("fr-FR", options);
                const cardBody = createHtmlElement('div', 'text-center py-1', `${dateDebut} au ${dateFin}`);

                // Ajout de styles conditionnels si la date est aujourd'hui
                if (isTodayBetween(r.start_date, r.end_date)) {
                    vacancesDiv.classList.add('font-bold', 'border-2', 'border-red-500');
                }

                // Assemblage des éléments
                vacancesDiv.appendChild(cardHeader);
                vacancesDiv.appendChild(cardBody);

                // Ajout au DOM
                resultat_vacances.appendChild(vacancesDiv);
            });

            data[key] = [];
        }
    }
}