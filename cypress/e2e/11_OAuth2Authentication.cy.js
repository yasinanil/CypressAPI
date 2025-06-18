describe("OAuth 2.0", () => {

    let token = "";

    it("Get Token", () => {
        cy.request({
            method: "Post",
            url: "https://github.com/login/oauth/access_token",
            qs: {
                client_id: "Ov23li857u89INhVhuXC",
                client_secret: "46f3500013dd4a1e788cfed414464130bbd055a9",
                code: "168b6a48faf91961aa17"
            }
        }).then((response) => {

            expect(response.status).to.eq(200)
            token = response.body.split("=")[1].split("&")[0];
        })
    })

    it("Get Repos", ()=>{

        cy.request({
            method:"Get",
            url:"https://api.github.com/user/repos?affiliation=owner",
            headers:{
                Authorization:"Bearer "+token
            }
        }).then((response)=>{
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(0)
            expect(response.body[0].name).to.equal("ContactList")
        })


    })




})