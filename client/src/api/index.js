import { DATA_API_ENDPOINT } from "../utils/constants";

export const getData = () => {
    return fetch(DATA_API_ENDPOINT)
        .then(res => res.json())
        .then(res => {
            return res;
        }).catch(err => {
            return null
        });
};