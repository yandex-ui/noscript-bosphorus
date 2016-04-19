/**
 * Экспортирует external-функции в yate-runtime.
 * @param {Object} yr yate-runtime
 */
module.exports = function(yr) {
    /**
     * Мост в JS для вызова метода вида
     * @private
     */
    yr.externals['_ns-view-call'] = nsViewCallHelper;

    /**
     * Мост в JS для вызова метода вида
     * @private
     */
    yr.externals['_ns-view-call-scalar'] = nsViewCallHelper;

    /**
     * Мост в JS для вызова метода модели вида
     * @private
     */
    yr.externals['_ns-model-call'] = nsModelCallHelper;

    /**
     * Мост в JS для вызова метода модели вида
     * @private
     */
    yr.externals['_ns-model-call-scalar'] = nsModelCallHelper;

    /**
     * Хелпер для фактического вызова метода модели и обработки результата
     * @param {ns.View~UpdateTree} updateTree вид, инициирующий вызов
     * @param {String} methodName имя метода модели
     * @param {...*} args
     * @returns {*}
     */
    function nsViewCallHelper(updateTree, methodName, p1, p2, p3, p4, p5) {
        var tree = yr.nodeset2data(updateTree);
        var view = tree.bosphorus;

        var result = view[methodName](p1, p2, p3, p4, p5);
        return result2nodeset(result);
    }

    /**
     * Хелпер для фактического вызова метода модели и обработки результата
     * @param {ns.View~UpdateTree} updateTree вид, инициирующий вызов
     * @param {String} modelName имя класса модели
     * @param {String} methodName имя метода модели
     * @param {...*} args
     * @returns {*}
     */
    function nsModelCallHelper(updateTree, modelName, methodName, p1, p2, p3, p4, p5) {
        var tree = yr.nodeset2data(updateTree);
        /** @type ns.View */
        var view = tree.bosphorus;

        var model = view.getModel(modelName);
        if (!model) {
            throw new Error('[ns-bosphorus] ' +
                'Model "' + modelName + '" in not defined for View "' + [view.id, view.key].join('#') + '"'
            );
        }

        var result = model[methodName](p1, p2, p3, p4, p5);
        return result2nodeset(result);
    }

    function result2nodeset(result) {
        if (Array.isArray(result)) {
            return yr.array2nodeset(result);
        }
        return yr.object2nodeset(result);
    }
};
