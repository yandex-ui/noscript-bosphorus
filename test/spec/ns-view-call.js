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

    it('должен вызвать метод вида со скаляром', function(finish) {
        ns.View.define('app-ns-view-call-scalar', {
            methods: {
                someViewMethodWithScalar: function(str) {
                    return str + ' aaa';
                }
            }
        });
        ns.layout.define('app', {
            'app-ns-view-call-scalar': {}
        });

        var params = {};
        var view = ns.View.create('app-ns-view-call-scalar');
        var layout = ns.layout.page('app', params);

        new ns.Update(view, layout, params)
            .start()
            .then(function() {
                var html = view.node.innerHTML;
                expect(html).to.contain('<div class="js-test-call">test string aaa</div>');
                finish();
            });
    });

});
