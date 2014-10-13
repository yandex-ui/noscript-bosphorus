(function () {
    ns.View.prototype.patchTree = function () {
        // расширяет дерево экземплярами ns.View и ns.Model
        return {
            bosphorus: this
        };
    };

    /**
     * Хелпер для фактического вызова метода модели и обработки результата
     * @param {ns.View} view вид, инициирующий вызов
     * @param {String} methodName имя метода модели
     * @param {...*} args
     * @returns {*}
     */
    function nsViewCallHelper(view, methodName, p1, p2, p3, p4, p5) {
        var tree = yr.nodeset2data(view);
        view = tree.bosphorus;

        try {
            var result = view[methodName](p1, p2, p3, p4, p5);
        } catch (e) {
            ns.log.exception('ns-view-call', e, {
                id: view.id,
                key: view.key,
                method: methodName
            });
            return yr.object2nodeset({});
        }

        if (Array.isArray(result)) {
            return yr.array2nodeset(result);
        } else {
            return yr.object2nodeset(result);
        }
    }

    /**
     * Мост в JS для вызова метода вида
     * @private
     */
    yr.externals['_ns-view-call'] = function () {
        return nsViewCallHelper.apply(null, arguments);
    };

    /**
     * Мост в JS для вызова метода вида
     * @private
     */
    yr.externals['_ns-view-call-scalar'] = function () {
        return nsViewCallHelper.apply(null, arguments);
    };

    /**
     * Хелпер для фактического вызова метода модели и обработки результата
     * @param {ns.View~UpdateTree} view вид, инициирующий вызов
     * @param {String} modelName имя класса модели
     * @param {String} methodName имя метода модели
     * @param {...*} args
     * @returns {*}
     */
    function nsModelCallHelper(tree, modelName, methodName, p1, p2, p3, p4, p5) {
        tree = yr.nodeset2data(tree);
        /** @type ns.View */
        var view = tree.bosphorus;

        var model = view.getModel(modelName);
        if (model) {

            try {
                var result = model[methodName](p1, p2, p3, p4, p5);
            } catch (e) {
                ns.log.exception('ns-model-call', e, {
                    id: view.id,
                    key: view.key,
                    method: methodName,
                    model: modelName
                });
                return yr.object2nodeset({});
            }

            if (Array.isArray(result)) {
                return yr.array2nodeset(result);
            } else {
                return yr.object2nodeset(result);
            }
        }

        return yr.object2nodeset({});
    }

    /**
     * Мост в JS для вызова метода модели вида
     * @private
     */
    yr.externals['_ns-model-call'] = function(tree, modelName, modelMethod, p1, p2, p3, p4, p5) {
        return nsModelCallHelper(tree, modelName, modelMethod, p1, p2, p3, p4, p5);
    };

    /**
     * Мост в JS для вызова метода модели вида
     * @private
     */
    yr.externals['_ns-model-call-scalar'] = function() {
        return nsModelCallHelper.apply(null, arguments);
    };
})();
