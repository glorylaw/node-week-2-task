function classifier(input) {
    //making a copy of the array so as not to mutate the original one
    let arrayObj = input.slice()
    const result = {
        noOfGroups: 0
    }
    let id = 1

    //invoking the ageDta function and sorting the age in ascending order
    ageData(arrayObj)
    const sortedArrayAge = arrayObj.sort((a,b) => a.age - b.age )
    console.log(sortedArrayAge)

    //using a for loop to dynamically create a group with its unique id
    for(let i = 0; i < sortedArrayAge.length; i++){
        //set the initial structure
        result[`group${id}`] =  new Object()
        result[`group${id}`].members = new Array()
        result[`group${id}`].oldest = sortedArrayAge[i].age
        result[`group${id}`].sum = sortedArrayAge[i].age
        result[`group${id}`].regNos = new Array()

        //populate the result with the first value
        let noOfPushedItems = 1
        let currentAge = sortedArrayAge[i].age
        let ageDiff = null 
        result[`group${id}`].members.push(sortedArrayAge[i])
        result[`group${id}`].regNos.push(Number(sortedArrayAge[i].regNo))
       
       //the inner for loop continues from the next element while checking fr the conditions
       //the maximum number of people in a group is 3
       //the age difference between the group members should not be more than 5
       //no 2 candidate should be in more than 1 group
       for(let j = i + 1; j < sortedArrayAge.length; j++ ){
        if (noOfPushedItems < 3){
            
            ageDiff = sortedArrayAge[j].age - currentAge
            if(ageDiff <= 5){
                result[`group${id}`].members.push(sortedArrayAge[j])
                result[`group${id}`].sum += sortedArrayAge[j].age
                result[`group${id}`].regNos.push(Number(sortedArrayAge[j].regNo))

                if(sortedArrayAge[j].age > result[`group${id}`].oldest){
                    result[`group${id}`].oldest = sortedArrayAge[j].age
                }
                //for every member that passes the condition it is removed and replaced by the next untill the loop ends
                //while making sure the loops starts from the replace member.
                let memberIndex = sortedArrayAge.indexOf(sortedArrayAge[j])
                sortedArrayAge.splice(memberIndex, 1)
                noOfPushedItems += 1
                j = i
            }

        }
       } 
       //sorting the regNo in ascending order
       result[`group${id}`].regNos.sort((a,b) => a - b)
       result["noOfGroups"] += 1
       id += 1 


    }

    return result
}

//the function below loops through the array of object,gets the age 
// subtracts it from 2019, updates  and returns it
const ageData = (arr) => {
    arr.forEach((current) => {
        let age = 2019 - new Date(current.dob).getFullYear()
        current.age = age
        return age;
    })
}



// const dataNew = (array) =>{
//     for(let i = 0; i < array.length; i++){
//         let age = 2019 - new Date(array[i].dob).getFullYear() 
//         array[i].age = age

//     }
//     return age;
// }

export default classifier;
