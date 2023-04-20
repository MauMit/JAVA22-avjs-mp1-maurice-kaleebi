//gör en get och put på min firebase. Gör en sortering på name och score och lägger dem i li. Gör att namnet användaren skriver inte hamnar på listan flera gånger utan bara poängen uppdateras

const div = document.querySelector('#userContainer');
let userName = '';
let playerScore = 0;
let sortedData = [];
//GET
export async function getFirebase(incomingName, incomingPoints) {
    const url = 'https://miniproject-advjs-default-rtdb.europe-west1.firebasedatabase.app/highscore.json'
    const response = await fetch(url);
    const data = await response.json();


    userName = incomingName;
    playerScore = incomingPoints;

    sortedData = data.sort((a, b) => a.score - b.score);

    div.innerHTML = "";


    if (sortedData.some(obj => obj.name === userName)) {
        for (let i = 0; i < sortedData.length; i++) {
            if (sortedData[i].name == userName && sortedData[i].score < playerScore) {
                sortedData[i].score = playerScore;
                break;
            }
        }
    } else {
        for (let i = 0; i < sortedData.length; i++) {

            if (sortedData[i].score < playerScore) {
                sortedData[i].name = userName;
                sortedData[i].score = playerScore;
                break;
            }
        }
    }

    sortedData = sortedData.sort((a, b) => b.score - a.score);

    for (const { name, score } of sortedData) {
        const li = document.createElement('li');
        li.innerText = `${name}: ${score}`;
        div.append(li);
    }

}


export async function putToFireBase(incomingName, incomingPoints) {

    userName = incomingName;
    playerScore = incomingPoints;
    
    const url = 'https://miniproject-advjs-default-rtdb.europe-west1.firebasedatabase.app/highscore.json';

    const response = await fetch(url);
    const data = await response.json();
    sortedData = data.sort((a, b) => a.score - b.score);

    if (sortedData.some(obj => obj.name === userName)) {
        for (let i = 0; i < sortedData.length; i++) {
            if (sortedData[i].name == userName && sortedData[i].score < playerScore) {
                sortedData[i].score = playerScore;
                break;
            }
        }
    } else {
        for (let i = 0; i < sortedData.length; i++) {

            if (sortedData[i].score < playerScore) {
                sortedData[i].name = userName;
                sortedData[i].score = playerScore;
                break;
            }
        }
    }

    sortedData = sortedData.sort((a, b) => b.score - a.score);

    const options = {
        method: "PUT",
        body: JSON.stringify(sortedData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    };

    const response2 = await fetch(url, options);
    const data2 = await response2.json();

}


