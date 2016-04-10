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

### В браузере

1. После подключения `noscript.js` и `noscript-yate-externals.js` надо подключить `noscript-bosphorus.js`
2. В yate-файл после подключения `noscript.yate` надо подключить `noscript-bosphorus.yate`

### Commonjs

Есть возможность использовать `noscript-bosphorus` как `commonjs`-модуль, точнее набор двух модулей:

- `noscript-bosphorus.ns.js`
- `noscript-bosphorus.externals.js`

Оба модуля экспортируют функции, которые принимают экземпляр `noscript` и рантайма `yate` соответственно, расширяя поведение указанных объектов.

Таким образом, можно подключить босфорус для серверного рендеринга:

```js
var ns = require('ns')();
var yr = require('templates+yr.module.js');

require('noscript-bosphorus/noscript-bosphorus.ns.js')(ns);
require('noscript-bosphorus/noscript-bosphorus.externals.js')(yr);

// создаем новый апдейт, запускаем процессы генерации и получение html
```
