/**
 * Экспортируем функцию, которая принимает экземпляр ns,
 * для расширения прототипа вида
 * @param {Object} ns
 */
module.exports = function(ns) {
    ns.View.prototype.patchTree = function () {
        // расширяет дерево экземплярами ns.View и ns.Model
        return {
            bosphorus: this
        };
    };
};
