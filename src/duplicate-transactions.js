function findDuplicateTransactions(transactions) {
    //make a copy of the array and ensure to not mutate the original  array using slice method.
    let result = []
    let temporaryArray = []
    const dataCopy = transactions.slice()
    dataCopy.sort((a,b) => a.id - b.id)

    //loop through the incoming transaction according to their sourceAccount`, `targetAccount`, `category`, `amount` and time
    for(let i = 0; i < dataCopy.length; i++ ){
        const sourceAccount = dataCopy[i].sourceAccount
        const targetAccount = dataCopy[i].targetAccount
        const category = dataCopy[i].category
        const amount = dataCopy[i].amount
        const transactionDay = new Date(dataCopy[i].time).getDate()
        const transactionMonth = new Date(dataCopy[i].time).getMonth() + 1
        const transactionYear = new Date(dataCopy[i].time).getFullYear() 

        // push the item into the temporary array
        temporaryArray.push(dataCopy[i])

        //create another for loop that starts from the next element and validates similar transaction.
        //if a similar transaction is found,it is pushed to the temp array, removed and replaced by the next transaction.
        for(let j = i + 1; j < dataCopy.length; j++){
            if(dataCopy[j].sourceAccount === sourceAccount &&
                dataCopy[j].targetAccount === targetAccount &&
                dataCopy[j].category === category &&
                dataCopy[j].amount === amount &&
                new Date(dataCopy[j].time).getDate() === transactionDay &&
                new Date(dataCopy[j].time).getMonth() + 1 === transactionMonth &&
                new Date(dataCopy[j].time).getFullYear() === transactionYear                
            ){
                temporaryArray.push(dataCopy[j])
                let index = dataCopy.indexOf(dataCopy[j])
                dataCopy.splice(index, 1)
                j = i
            }

        }
         //temporary array which contains similar transactions is then pushedinto the result array
         result.push(temporaryArray)
         //empty the temporary array.
         temporaryArray = []
    }

    //every group with a single transaction is removed, this is achieved by looping through the result array
    for (let i = 0; i < result.length; i++){
        if(result[i].length === 1) {
            let index = result.indexOf(result[i])
            result.splice(index, 1)
            i = index - 1 
        }
    }

    //for every group having similar details,difference of time is checked.
    //if the transaction is less than 1 mintute,it is tagged as a duplicate
    for(let i = 0; i < result.length; i++){
        let firstTransac = result[i][i].time
        for(let j = 0; j < result[i].length; j++){
            let secondTransac = result[i][j].time
            let valid = compareTime(firstTransac, secondTransac)
            if(valid){
                firstTransac = secondTransac
            }else{
                let index = result[i].indexOf(result[i][j])
                result[i].splice(index, 1)
            }
        }
    }
    
    return result

}
// create a function that accepts two arguments(objects),gets their time and compares if the difference is less than a minute
const compareTime = (timeA, timeB) => {
    let seconds = 0
    let time = new Date(timeB).getMinutes() - new Date(timeA).getMinutes()

    if(time > 1){
        return false
    }else if( time === 1){
        seconds = new Date(timeB).getSeconds() - new Date(timeA).getSeconds()
        return seconds < 0
    }
    return true
}

export default findDuplicateTransactions;
