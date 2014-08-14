describe('ns-view-call', function() {

    it('должен вызвать метод вида', function(finish) {
        ns.View.define('app-ns-view-call', {
            methods: {
                someViewMethod: function() {
                    return 'method result';
                }
            }
        });
        ns.layout.define('app', {
            'app-ns-view-call': {}
        });

        var params = {};
        var view = ns.View.create('app-ns-view-call');
        var layout = ns.layout.page('app', params);

        new ns.Update(view, layout, params)
            .start()
            .then(function() {
                var html = view.node.innerHTML;
                expect(html).to.contain('<div class="js-test-call">method result</div>');
                finish();
            });
    });

    it('должен залогировать исключение при вызове метода', function() {
        this.sinon.stub(ns.log, 'exception');
        ns.View.define('app-ns-view-call', {
            methods: {
                someViewMethod: function() {
                    throw 'someViewMethodException';
                }
            }
        });
        ns.layout.define('app', {
            'app-ns-view-call': {}
        });

        var params = {};
        var view = ns.View.create('app-ns-view-call');
        var layout = ns.layout.page('app', params);

        return new ns.Update(view, layout, params)
            .start()
            .then(function() {
                expect(ns.log.exception).to.be.calledWith('ns-view-call', 'someViewMethodException', {
                    id: "app-ns-view-call",
                    key: "view=app-ns-view-call",
                    method: "someViewMethod"
                });
            });
    });

});
