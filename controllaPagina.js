function generaMatrice(r, c) {
    let matrice = document.getElementById("matrice");
    let righeCorrenti = matrice.childElementCount;
    let colonneCorrenti;
    if (matrice.childNodes[0] == undefined)
        colonneCorrenti = 0;
    else
        colonneCorrenti = matrice.childNodes[0].childElementCount;

    //Aggiusta numero di righe
    while (r < righeCorrenti) {
        matrice.removeChild(matrice.childNodes[righeCorrenti - 1]);
        righeCorrenti = matrice.childElementCount;
    }
    while (r > righeCorrenti) {
        let riga = document.createElement("div");
        riga.classList.add("riga");

        for (let i = 0; i < c; i++) {
            let colonna = document.createElement("div");
            colonna.classList.add("colonna");

            let input = document.createElement("input");
            input.type = "number";

            colonna.appendChild(input);
            riga.appendChild(colonna);
        }
        riga.style.gridTemplateColumns = "repeat(" + c + ", 1fr)";
        matrice.appendChild(riga);
        righeCorrenti = matrice.childElementCount;
    }

    //Aggiusta numero di colonne
    while (c < colonneCorrenti) {
        for (let i = 0; i < righeCorrenti; i++) {
            let riga = matrice.childNodes[i];
            riga.removeChild(riga.childNodes[colonneCorrenti - 2]);
            riga.style.gridTemplateColumns = "repeat(" + c + ", 1fr)";
        }
        colonneCorrenti = matrice.childNodes[1].childElementCount;
    }


    if (c > colonneCorrenti) {
        for (let i = 0; i < righeCorrenti; i++) {
            let riga = matrice.childNodes[i];
            colonneNellaRiga = riga.childElementCount;
            while (c > colonneNellaRiga) {
                let colonna = document.createElement("div");
                colonna.classList.add("colonna");

                let input = document.createElement("input");
                input.type = "number";

                colonna.appendChild(input);
                riga.appendChild(colonna);
                colonneNellaRiga = riga.childElementCount;
            }
            riga.style.gridTemplateColumns = "repeat(" + c + ", 1fr)";
        }
    }
}

function aggiornaMatrice() {
    let r = parseInt(document.getElementById("nRighe").value);
    let c = parseInt(document.getElementById("nColonne").value);
    generaMatrice(r, c);
}

function stampaMatriceRisultato(r, c, matrice) {
    document.getElementById("risultatoMatrice").innerHTML = "";
    var html = "<table>";
    for (let i = 0; i < r; i++) {
        html += "<tr>";
        for (let j = 0; j < c; j++) {
            html += "<td>" + frazionizza(matrice[i][j]) + "</td>";
        }
        html += "</tr>";
    }
    document.getElementById("risultatoMatrice").innerHTML = html;

}

//Aggiungi i listener agli input delle dimensioni
window.addEventListener("load", () => {
    document.getElementById("nRighe").addEventListener("change", aggiornaMatrice);
    document.getElementById("nColonne").addEventListener("change", aggiornaMatrice);
    document.getElementById("bottoneRiduci").addEventListener("click", () => {
        document.getElementById("didascaliaRisolto").style.display = "block";

        let r = document.getElementById("nRighe").valueAsNumber;
        let c = document.getElementById("nColonne").valueAsNumber;
        let m = caricaMatrice(r, c, document.getElementById("matrice"));
        riduciGauss(r, c, m);
        stampaMatriceRisultato(r, c, m);
    });
    aggiornaMatrice();
});
