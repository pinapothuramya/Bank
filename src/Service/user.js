import axios from "axios"

export const getStudents1 = async (pageNumber, pageSize) => {
    let response = await axios.get(`http://localhost:8080/students/paging`, {
        params: {
            page: pageNumber,
            size: pageSize
        }
    })
    return response
}

// export const createUser=asunc(bankid,bankName)=>
// {
//     let response=await axios.post(``,{
//         bankId,
//         BankName,
//     }
// }