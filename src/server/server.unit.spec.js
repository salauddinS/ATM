var request = require("request");
var base_url = "http://localhost:9001/api/auth/Authenticate"
describe("Check Authenticate Api", function () {
    it("returns status code 200", function (done) {
        request.post({
            headers: { 'content-type': 'application/json' },
            url: base_url,
            json: { userName: '1111111111111112', password: '1234' }
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBeDefined();
            done();
        });
    });
});