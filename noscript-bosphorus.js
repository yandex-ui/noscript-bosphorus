ns.View.prototype.patchTree = function() {
    // расширяет дерево экземплярами ns.View и ns.Model
    return {
        bosphorus: this
    };
};

/**
 * Мост в JS для вызова метода вида
 * @private
 */
yr.externals['_ns-view-call'] = function(view, methodName, p1, p2, p3, p4, p5) {
    view = yr.nodeset2data(view);

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
};

/**
 * Мост в JS для вызова метода модели вида
 * @private
 */
yr.externals['_ns-model-call'] = function(view, modelName, methodName, p1, p2, p3, p4, p5) {
    view = yr.nodeset2data(view);
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
};

