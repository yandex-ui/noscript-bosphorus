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

    var result = safeViewCall(view, methodName, p1, p2, p3, p4, p5);

    if (Array.isArray(result)) {
        return yr.array2nodeset(result);
    } else {
        return yr.object2nodeset(result);
    }
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
    ns.assert(model, 'noscript-bosphorus', 'Model is undefined');

    var result = safeModelCall(view, model, methodName, p1, p2, p3, p4, p5);

    if (Array.isArray(result)) {
        return yr.array2nodeset(result);
    } else {
        return yr.object2nodeset(result);
    }
}

/**
 * Безопасно вызываем метод вида
 */
function safeViewCall(view, methodName, p1, p2, p3, p4, p5) {
    try {
        return view[methodName](p1, p2, p3, p4, p5);
    } catch (e) {
        ns.log.exception('ns-view-call', e, {
            id: view.id,
            key: view.key,
            method: methodName
        });
        return [];
    }
}

/**
 * Безопасно вызываем метод модели
 */
function safeModelCall(view, model, methodName, p1, p2, p3, p4, p5) {
    try {
        return model[methodName](p1, p2, p3, p4, p5);
    } catch (e) {
        ns.log.exception('ns-model-call', e, {
            id: view.id,
            key: view.key,
            method: methodName,
            model: model.id
        });
        return [];
    }
}

/**
 * Экспортируем функцию, которая принимает рантайм яте,
 * для расширения его экстерналами
 * @param {Object} yr
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
};
