describe('ns-model-call', function() {

    it('должен вызвать метод модели', function(finish) {
        ns.Model.define('model', {
            methods: {
                getFoo: function() {
                    return this.get('.foo');
                }
            }
        });
        var model = ns.Model.get('model').setData({foo: 'bar'});

        ns.View.define('app-ns-model-call', {
            models: ['model']
        });
        ns.layout.define('app', {
            'app-ns-model-call': {}
        });

        var params = {};
        var view = ns.View.create('app-ns-model-call');
        var layout = ns.layout.page('app', params);

        new ns.Update(view, layout, params)
            .start()
            .then(function() {
                var html = view.node.innerHTML;
                expect(html).to.contain('<div class="js-model-call">bar</div>');
                finish();
            });
    });

    it('должен залогировать исключение при вызове метода', function() {
        this.sinon.stub(ns.log, 'exception');

        ns.Model.define('model', {
            methods: {
                getFoo: function() {
                    throw 'getFooException';
                }
            }
        });
        var model = ns.Model.get('model').setData({foo: 'bar'});

        ns.View.define('app-ns-model-call', {
            models: ['model']
        });
        ns.layout.define('app', {
            'app-ns-model-call': {}
        });

        var params = {};
        var view = ns.View.create('app-ns-model-call');
        var layout = ns.layout.page('app', params);

        return new ns.Update(view, layout, params)
            .start()
            .then(function() {
                expect(ns.log.exception).to.be.calledWith('ns-model-call', 'getFooException', {
                    id: "app-ns-model-call",
                    key: "view=app-ns-model-call",
                    method: "getFoo",
                    model: "model"
                });
            });
    });

    it('должен вызвать метод вида со скаляром', function(finish) {
        ns.Model.define('model', {
            methods: {
                getFooWithScalar: function(str) {
                    return this.get('.foo') + str;
                }
            }
        });

        var model = ns.Model.get('model').setData({foo: 'bar'});

        ns.View.define('app-ns-model-call-scalar', {
            models: ['model']
        });
        ns.layout.define('app', {
            'app-ns-model-call-scalar': {}
        });

        var params = {};
        var view = ns.View.create('app-ns-model-call-scalar');
        var layout = ns.layout.page('app', params);

        new ns.Update(view, layout, params)
            .start()
            .then(function() {
                debugger;
                var html = view.node.innerHTML;
                expect(html).to.contain('<div class="js-model-call">bartest string</div>');
                finish();
            });
    });

});
