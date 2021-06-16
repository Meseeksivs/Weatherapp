
describe('GET /api/weather/', function() {
    it('Returns weather information', function(done) {
        request.get('/api/weather/?city=Copenhagen')
            .expect(200)
            .end(function(err, res) {

                expect(res.body.humidity).to.exist;
                done(err);
            });
    });
});