/*
 * Funzione che analizza l'input e genera una matrice numerica m
 *
 * @param   {Number}    Numero di righe
 * @param   {Number}    Numero di colonne
 * @param   {Element}   Matrice
 * @returns {Matrix}    La matrice contenente i valori immessi nelle celle di input
 *
 */
function caricaMatrice(r, c, element) {
    let m = Array.from(Array(r), () => new Array(c));

    // Inserisci nella matrice m i valori immessi in input
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            let num = element.childNodes[i].childNodes[j].childNodes[0].valueAsNumber;
            if (isNaN(num)) {
                m[i][j] = 0;
            } else {
                m[i][j] = num;
            }
        }
    }

    return m;
}

/*
 * @param   {Number}    Numero di righe
 * @param   {Number}    Numero di colonne
 * @param   {Matrix}    La matrice da analizzare
 * @returns {bool}      Se la matrice passata come parametro è a scala
 *
 */
function isAScala(r, c, matrice) {
    // Una matrice è a scala se
    // 1) Tutte le righe nulle sono in fondo alla matrice
    // 2) Il pivot della riga è a sinistra di quello della riga precedente
    let indice_pivot;
    let indice_pivot_precedente = -1;

    for (let i = 0; i < r; i++) {
        indice_pivot = 0;
        while (matrice[i][indice_pivot] == 0 && indice_pivot != c - 1) {
            indice_pivot++;
        }

        // Controlla che l'indice del pivot precedente sia minore di questo
        if (indice_pivot <= indice_pivot_precedente)
            return false;
        indice_pivot_precedente = indice_pivot;
    }

    // Se sei arrivato fin qui, allora la matrice è a scala!
    return true;
}

/*
 * @param   {Number}    Numero di righe
 * @param   {Number}    Numero di colonne
 * @param   {Matrix}    La matrice da analizzare
 *
 */
function riduciGauss(r, c, matrice) {
    let k = 0;
    /*
     * Se la prima riga ha il primo elemento nullo, scambiala con una riga che ha il primo elemento non nullo.
     * Se tutte le righe hanno il primo elemento nullo, vai al punto 3.
     *
     * Per ogni riga A_i con primo elemento non nullo, eccetto la prima (i > 0), moltiplica la prima riga per un coefficiente
     * scelto in maniera tale che la somma tra la prima riga e A_i abbia il primo elemento nullo.
     * Sostituisci A_i con la somma appena ricavata.
     *
     * A questo punto ritorna al punto 1 considerando la sottomatrice che ottieni cancellando la prima riga e la prima colonna.
     *
     */

    //Ripeti finchè la matrice non è a scala
    while (!isAScala(matrice) && k < r && k < c) {
        // Se la prima cella della riga è 0, scambiala con un'altra riga
        if (matrice[k][k] == 0) {
            for (let i = k + 1; i < r; i++) {
                if (matrice[i][k] != 0) {
                    let tmp = matrice[k];
                    matrice[k] = matrice[i];
                    matrice[i] = tmp;
                }
            }
        }

        for (let i = k + 1; i < r; i++) {
            if (matrice[i][k] != 0) {
                let coeff = matrice[i][k] / matrice[k][k];
                for (let j = 0; j < c; j++) {
                    matrice[i][j] -= (matrice[k][j] * coeff);
                }
            }
        }
        k++;
        matrice.sort((riga1, riga2) => {
            for (let i = 0; i < riga1.length; i++) {
                if (riga1[i] > riga2[i])
                    return -1;
                if (riga1[i] < riga2[i])
                    return 1;
            }
            return 0;
        });
    }

    // Riordina (scambia) le righe qualora non dovesse risultare ancora a scala
    if (!isAScala(r, c, matrice)) {
        matrice.sort((riga1, riga2) => {
            for (let i = 0; i < riga1.length; i++) {
                if (riga1[i] > riga2[i])
                    return -1;
                if (riga1[i] < riga2[i])
                    return 1;
            }
            return 0;
        });
    }
}

/*
 * @param   {Number} num    Il numero da convertire in frazione
 * @returns {String}        Stringa codificante la frazione (del tipo "a/b")
 * 
 */
function frazionizza(num) {
    let denominatore = 1;
    let numeratore = 0.5;
    if (Number.isInteger(num))
        return "" + num;

    while (!Number.isInteger(numeratore)) {
        denominatore++;
        numeratore = num * denominatore;
    }
    return "" + numeratore + "/" + denominatore; 
}