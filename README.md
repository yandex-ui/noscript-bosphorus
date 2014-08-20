[![Build Status](https://travis-ci.org/yandex-ui/noscript-bosphorus.png?branch=master)](https://travis-ci.org/yandex-ui/noscript-bosphorus)
[![NPM version](https://badge.fury.io/js/noscript-bosphorus.png)](http://badge.fury.io/js/noscript-bosphorus)
[![Dependency Status](https://david-dm.org/yandex-ui/noscript-bosphorus.png)](https://david-dm.org/yandex-ui/noscript-bosphorus)

noscript-bosphorus
==================

Плагин для [noscript](https://github.com/yandex-ui/noscript), позволяющий вызывать методы View и Model из yate

**Правильно использовать эти методы только как getter**.
Несмотря на то, что испортить процесс шаблонизации и обновления довольно сложно,
**строго запрещается изменять состояние** вида или модели в вызываемых методах.

## ns-model-call

Вызывает метод модели вида. Можно передать до 5-и аргументов.
```
match .my-view ns-view-content {
    <div class="js-test-call">
        ns-model-call('modelName', 'someModelMethod')
    </div>
}
```

## ns-model-call-scalar

Тоже самое, что и `ns-model-call`, только первый аргумент вызова `scalar`.

## ns-view-call

Вызывает метод вида. Можно передать до 5-и аргументов.
```
match .my-view ns-view-content {
    <div class="js-test-call">
        ns-view-call('someViewMethod')
    </div>
}
```

## ns-view-call-scalar

Тоже самое, что и `ns-view-call`, только первый аргумент вызова `scalar`.

## Подключение

1. После подключения `noscript.js` и `noscript-yate-externals.js` надо подключить `noscript-bosphorus.js`
2. В yate-файл после подключения `noscript.yate` надо подключить `noscript-bosphorus.yate`
