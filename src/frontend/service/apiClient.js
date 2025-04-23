

class Apiclient {
    constructor() {
        this.baseUrl = "http://localhost:8000/api/v1";
        this.defaultHeaders = {
            'Content-Type': "application/json",
            "Accept": "application/json"
        }
    }
    async customFetch(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const headers = { ...this.defaultHeaders, ...options.headers };

            const config = {
                ...options,
                headers,
                credentials: 'include'
            }
            console.log(`fetching ${url}`);
            const response = await fetch(url, config);
            //chck if response.ok===value
            const data = await response.json()
            return data;

        }
        catch (err) {
            console.log("Api Error", err);
            throw err

        }
    }
    //Auth end points

    async singup(fullname,usename, email, password) {
        return this.customFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ fullname,usename, email, password })
        });
    }
    //for login
    async login(email, password) {
        return this.customFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })

        })
    }
    //get my profile
    async getprofile(){
        return this.customFetch("/auth/me")
    }

}
const apiclint= new Apiclient()
export default apiclint;