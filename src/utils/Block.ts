import Handlebars from 'handlebars';
import { EventBus } from './EventBus';


class Block<P extends Record<string, any> = any> {
    // component lifecycle-events
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    private eventBus: () => EventBus;
    public id = (Math.random() + 1).toString(36).substring(3);
    public context: object;
    protected props: P;
    public children: Block | Block[];
    private _element: HTMLElement | null = null;
    public template: any;

    constructor(propsWithChildren: P) {
        const eventBus = new EventBus();        
        const { props, children } = this._getChildrenAndProps(propsWithChildren);
        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
                children[key as string] = value;
              } else if (value instanceof Block) {
                children[key as string] = value;
              } else {
                props[key] = value;
              }
        });

        return { props: props as P, children };
    }

    _addEvents() {
        const { events = {} } = this.props as P & { events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            if(eventName === 'focus' || eventName === 'blur' || eventName === 'change') {
                this._element?.addEventListener(eventName, events[eventName], true);
            } else {
                this._element?.addEventListener(eventName, events[eventName]);
            }
            
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    
    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(ch => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P) {
        if(oldProps !== newProps){
            return true;
        }
    }

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
    }

    protected compile(template: any, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
                if(Object.keys(component.children).length){
                    contextAndStubs[name] = `<div data-id="${component.id}"></div>`;

                    Object.entries(component.children).forEach(([key, value]) => {
                        //console.log(`key: ${key}, value: ${value}`)
                        contextAndStubs[key] = `<div data-id="${value.id}"></div>`;
                    });
                    
                } else {
                    contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
                }  
        });

        //debug
        //console.log(`contextAndStubs`);
        //console.log(contextAndStubs)
        //

        template = Handlebars.compile(template);
        const html = template(contextAndStubs);

        // debug
        //console.log(`this`);
        //console.log(this);
        //console.log(`html`);
        //console.log(html);
        //
        
        const temp = document.createElement('template');
        temp.innerHTML = html;

        const replaceStub = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (!stub) {
                return ;
            }
            component.getContent()?.append(...Array.from(stub.childNodes));
            stub.replaceWith(component.getContent()!);
        }



        Object.entries(this.children).forEach(([_, component]) => {
            if (Object.keys(component.children).length) {
                // we got a nested component, TODO: do something
                replaceStub(component);
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: P) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target }

                target[prop as keyof P] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Access denied! Can't delete a property.");
            }
        });
    }
}

export default Block;

