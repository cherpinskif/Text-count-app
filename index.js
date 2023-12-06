let textAreaQuantity
let textAreaQuantityArray
let QuantityArray
let objectEntries
let i = 0




document.getElementById("countButton").onclick = function () {


    textAreaQuantity = document.getElementById("wordCounter").value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

    if (document.getElementById("wordCounter").value === "") {
        alert("Área de texto vazia, por favor incluir seu texto")
    } else {

        const regexpWords = /\b\w+\b/uig

        textAreaQuantityArray = textAreaQuantity.match(regexpWords)

        document.getElementById("countedTextQuantity").innerHTML = textAreaQuantity.match(regexpWords).length + " words"

        QuantityArray = textAreaQuantityArray.reduce(function (allWords, textAreaQuantityArray) {
            if (textAreaQuantityArray in allWords) {
                allWords[textAreaQuantityArray]++;
            } else {
                allWords[textAreaQuantityArray] = 1;
            }
            return allWords;
        }, {});

        let labels = [];
        let values = [];
        
        let objectEntriesLength = Object.entries(QuantityArray).length

        for (i = 0; i < objectEntriesLength; i += 1) {
            let trWord = document.createElement("tr")
            trWord.setAttribute("id", "trWordFrequency" + i)
            document.getElementById("tableWordFrequency").appendChild(trWord)

            let tdWordWord = document.createElement("td")
            tdWordWord.setAttribute("id", "trWordWord" + i)
            document.getElementById("trWordFrequency" + i).appendChild(tdWordWord)

            let tdWordQuantity = document.createElement("td")
            tdWordQuantity.setAttribute("id", "tdWordQuantity" + i)
            document.getElementById("trWordFrequency" + i).appendChild(tdWordQuantity)

            tdWordWord.innerHTML = Object.keys(QuantityArray)[i]
            tdWordQuantity.innerHTML = Object.entries(QuantityArray)[i][1];

        }

        let ctx = document.createElement("canvas")
        ctx.setAttribute("id", "myChart")
        ctx.setAttribute("style","display:inline-block","width:50%")
        ctx.setAttribute("style","width:100%")
        document.getElementById("myCanvas").appendChild(ctx)

        for (const [word, quantity] of Object.entries(QuantityArray)) {
            labels.push(word);
            values.push(quantity);
        }

        for (i = 0; i < objectEntriesLength; i += 1) {

            let ctx = document.getElementById("myChart").getContext("2d");
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of words',
                        data: values,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    };
}
