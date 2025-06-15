const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false });

describe("XML Parser", () => {


    const xmlPayload = "<booking>     <firstname>Jim</firstname>     <lastname>Brown</lastname>     <totalprice>111</totalprice>     <depositpaid>true</depositpaid>     <bookingdates>         <checkin>2018-01-01</checkin>         <checkout>2019-01-01</checkout>     </bookingdates>     <additionalneeds>Breakfast</additionalneeds> </booking>";
    let bookingId = null;

    it("Create Booking", () => {

        cy.request({

            method: "Post",
            url: "https://restful-booker.herokuapp.com/booking",
            body: xmlPayload,
            headers: {
                "Content-Type": "text/xml",
                "Accept": "application/xml"
            }

        }).then((response) => {

            //cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            parser.parseString(response.body, (err, result) => {
                bookingId = result["created-booking"].bookingid;
            })
        })
    })


    it("GetBooking And Validate XML Body", () => {

        cy.request({
            method: "Get",
            url: "https://restful-booker.herokuapp.com/booking/" + bookingId,
            headers: {
                "Accept": "application/xml"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            parser.parseString(response.body, (err, result) => {
                expect(result.booking.firstname).to.equal("Jim");
                expect(result.booking.lastname).to.equal("Brown");
                expect(result.booking.totalprice).to.equal("111");
                expect(result.booking.depositpaid).to.equal("true");
                expect(result.booking.bookingdates.checkin).to.equal("2018-01-01");
                expect(result.booking.bookingdates.checkout).to.equal("2019-01-01");
                expect(result.booking.additionalneeds).to.equal("Breakfast");

            })

        })

    })

})