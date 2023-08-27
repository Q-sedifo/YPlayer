
// Helping functions for arrays

// export const uniqueArray = (data, property) => {
//     const array = Object.values(data.reduce((acc, obj) => {
//         if (!acc[obj[property]]) {
//           acc[obj[property]] = obj
//         }

//         return acc
//     }, {}))

//     return array
// }

export const uniqueArray = (data, property) => {
    const array = Object.values(data.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
            acc[key] = obj
        }

        return acc
    }, {}))

    return array
}
