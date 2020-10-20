/*
 * Funzione che analizza l'input e genera una matrice numerica m
 * 
 * @param
 * @returns La matrice contenente i valori immessi nelle celle di input
 * 
 */
function caricaMatrice() {
    let riga;
    let r;
    r = document.getElementById("nRighe").valueAsNumber;

    //Dichiara la matrice
    var m = [];
    for (let i = 0; i < r; i++)
        m[i] = [];

    //Inserisci nella matrice m i valori immessi in input
    matrice = document.getElementById("matrice");
    for (let i = 0; i < matrice.childElementCount; i++) {
        riga = matrice.childNodes[i];
        for (let j = 0; j < riga.childElementCount; j++) {
            if (isNaN(riga.childNodes[j].childNodes[0].valueAsNumber))
                m[i][j] = 0;
            else
                m[i][j] = riga.childNodes[j].childNodes[0].valueAsNumber;
        }
    }

    return m;
}

/*
 * @param   {Number}     La matrice da analizzare
 * @returns {bool}      "true" se la matrice passata come parametro è a scala, "false" altrimenti
 * 
 */
function isAScala(matrice) {
    //Una matrice è a scala se
    // i) Tutte le righe nulle sono in fondo alla matrice
    // ii) Il pivot della riga i è a sinistra di quello della riga i + 1
    let r = matrice.length;
    let c = matrice[0].length;
    let indice_pivot;
    let indice_pivot_precedente = -1;

    for (let i = 0; i < r; i++) {
        indice_pivot = 0;
        fine = false;
        while (matrice[i][indice_pivot] == 0 && indice_pivot != c - 1) {
            indice_pivot++;
        }

        //Controlla che l'indice del pivot precedente sia minore di questo
        if (indice_pivot <= indice_pivot_precedente)
            return false;
        indice_pivot_precedente = indice_pivot;
    }

    //Se sei arrivato fin qui, allora la matrice è a scala!
    return true;
}


function riduciGauss(matrice) {
    let r = matrice.length;
    let c = matrice[0].length;
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

    //Ripeti finché la matrice non è a scala
    while (!isAScala(matrice) && k < r && k < c) {

        //Se la prima cella della riga è 0, scambiala con un'altra riga
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

    //Riordina (scambia) le righe qualora non dovesse risultare ancora a scala
    if (!isAScala(matrice)) {
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
    return;
}