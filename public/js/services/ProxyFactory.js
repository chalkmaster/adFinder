class ProxyFactory {

    static create(obj, props, action) {

        return new Proxy(obj, {

            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function() {

                        let ret = Reflect.apply(target[prop], target, arguments);
                        action(target);

                        return ret;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let ret = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) action(target);    // só executa action(target) se for uma propriedade monitorada
                return ret;
            }
        })
    }

    static _isFunction(func) {

        return typeof(func) == typeof(Function);
    }
}
