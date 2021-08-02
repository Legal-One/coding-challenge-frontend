export const getData = () => {
        return fetch("http://localhost:3500/")
        .then(res => res.json())
        .then(res => {
            return res;
        }).catch(err => {
            throw err;
        });
    
};