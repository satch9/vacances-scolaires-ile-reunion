const createText = (data) => {
    for (const key in data) {
        if (key === "jours_feries") {
            //console.log("jours_feries", data[key]);

            data[key].forEach((r) => {

                //console.log("r", r)
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

                joursFeriesDiv.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
                joursFeriesDiv.style.appearance = "none";
                joursFeriesDiv.style.border = "1px";
                joursFeriesDiv.style.borderRadius = "0.25rem";
                joursFeriesDiv.style.width = "100%";
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

            data[key] = []

        }
        if (key === "vacances") {
            //console.log("vacances", data[key]);

            let str = "à l'île de la";

            title_principal.textContent = `${str[0].toUpperCase()}${str.slice(1)} ${data[key][0].location} pour l'année scolaire ${data[key][0].annee_scolaire}`;

            title_jours_feries.textContent = `Jours fériés`;
            title_vacances.textContent = `Vacances `;

            data[key].forEach((r) => {

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

            data[key] = [];
        }
    }
}