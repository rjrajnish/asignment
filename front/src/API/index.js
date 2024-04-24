import axios from "axios"

const backendUrl = "http://localhost:5501"

export const API = axios.create({ baseURL: backendUrl })
API.defaults.headers.common["Accept"] = "application/json"
API.defaults.headers.common["Content-Type"] = "application/json"



const makeRequest = async (method, url, data) => {
    try {
        const response = await API.request({
            method,
            url,
            data
        })
        return response
    } catch (error) {
        return error
    }
}


// ---------------------add data api------------------------
export const createNewDataAPI = async data =>
    await makeRequest("post", `/api/add`, data)
// -------------------update data by id api----------------
export const updateByIdAPI = async (id, payload) =>
    await makeRequest("put", `/api/update/${id}`, payload);
// -------------------get all data api----------------
export const getDataAPI = async () =>
    await makeRequest("get", `/api/get`)

// ------get counts api------
export const getCountAPI = async () =>
    await makeRequest("get", `/api/counts`)
