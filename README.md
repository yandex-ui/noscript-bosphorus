noscript-bosphorus
==================

Плагин для noscript, позволяющий вызывать методы View и Model из yate

**Правильно использовать эти методы только как getter**.
Несмотря на то, что испортить процесс шаблонизации и обновления довольно сложно,
**строго запрещается изменять состояние** вида или модели в вызываемых методах.

## ns-model-call

Вызывает метод модели вида. Можно передать до 5-и аргументов.
```
match .my-view ns-view-content {
    <div class="js-test-call">
        ns-view-call('modelName', 'someModelMethod')
    </div>
}
```

## ns-view-call

Вызывает метод вида. Можно передать до 5-и аргументов.
```
match .my-view ns-view-content {
    <div class="js-test-call">
        ns-view-call('someViewMethod')
    </div>
}
```
