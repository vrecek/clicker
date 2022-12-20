// Aliases to export
namespace Aliases {
    export type Possible<T> = T | null | undefined



    export type Text<T = string> = {
        children: T
    } 

    export type Form = HTMLFormElement
    export type Input = HTMLInputElement
    export type Elem = HTMLElement

    export type Coll<T extends Element> = HTMLCollectionOf<T> 
    export type Inputs = HTMLCollectionOf<Input>
}

// Custom types
namespace CustomTypes {
    export type LoadingState<T = any> = {
        finished: boolean
        data: T | null
        error: string | null
    }
}

// TextBox types
namespace TB {
    export abstract class TextBox {
        public abstract initializeBox(): this
        public abstract changeStyles(styleObj: React.CSSProperties, type: TB.ElementType): void
        public abstract setDefaultStyles(name: TB.DefaultStyles): void
        public abstract appendTo(element: HTMLElement, removeAfterMs: number, appendFirst?: boolean): void
        public abstract removePreviousBox(element: HTMLElement, removeClass?: string): this
        public abstract removeBox(): void
        public abstract resetStyles(type?: TB.ElementType): void
        public abstract isAppended(element?: HTMLElement): boolean
        public abstract set setMessage(str: string)
        public abstract set setClass(str: string)
    }

    export type ElementType = 'div' | 'p'

    export type ConstructorOptions = {
        message?: string 
        cname?: string
    } | undefined

    export type DefaultStyles = 'fixed-center-top-black-textsize'
}

// DropDown types
namespace DD {
    export abstract class DropDown {
        public abstract expandMenu(hiddenList: HTMLElement, display?: DD.DisplayType): void 
        public abstract shrinkMenu(hiddenList?: HTMLElement, display?: DD.DisplayType): void
        public abstract rotateArrow(arrow: HTMLElement): void
        public abstract switchActive(): void
        public abstract get getActive(): boolean
    }

    export type DisplayType = 'block' | 'flex'

    export type ReturnedHeight = {
        height: number
        marginTop: number
        marginBottom: number
    }

    export type BoxProps = {
        mTop: number
        mBottom: number
    } | null
}

// Loading types
namespace LOAD {
    export abstract class Loading {
        public abstract defaultStyleCircle(circleStyles?: LOAD.CircleStyleType): this
        public abstract defaultStyleDots(dotStyles?: LOAD.DotStyleType): this
        public abstract append(element: HTMLElement, appendFirst?: boolean): void
        public abstract remove(): void
    }

    export type LoadingPosition = 'fixed' | 'containerWidth' | 'containerHeight'

    export type DefaultStyle = {
        backgroundClr?: string,
        width?: string,
        height?: string,
        clr1?: string,
        position?: LoadingPosition 
    }
     
    export type CircleStyleType = DefaultStyle & {
        clr2?: string,
        borderRadius?: string
    }
    
    export type DotStyleType = DefaultStyle & {
    
    }
}

// Fetches types
namespace FETCH {
    export type RequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

    export type MixReturn<T> = {
       json: T,
       code: number,
       msg: string
    }
    
    export type FetchErrorReturn = {
       code: number,
       msg: string
    }
}


export default class Client {
    public static TextBox = class extends TB.TextBox {
        private timeout: NodeJS.Timer | null

        private divStyles: React.CSSProperties
        private pStyles: React.CSSProperties

        private eDiv: HTMLElement | null
        private ePar: HTMLElement | null

        private message: string
        private cname: string


        /**
            * @info Box is created as: div + p 
            * @param options Optional - object { message: string, cname: string }
        */
        public constructor(options?: TB.ConstructorOptions) {
            super()

            const {message, cname} = options ?? {}

            this.eDiv = null
            this.ePar = null

            this.message = message ?? 'Not set'
            this.cname = cname ?? 'default-box-classname'
            this.timeout = null

            this.divStyles = {}
            this.pStyles = {}
        }

        private clearProperties() {
            this.timeout = null
            this.eDiv = null
            this.ePar = null
        }

        /**
            * @info Initializes components 
            * @returns this - to chain together with appendBox()
        */
        public initializeBox(): this {
            const div = document.createElement('div')
            const p = document.createElement('p')
            
            div.appendChild(p)

            this.eDiv = div
            this.ePar = p

            return this
        }

        /**
            * @param styleObj Object of CSSProperties
            * @param type Element to style
        */
        public changeStyles(styleObj: React.CSSProperties, type: TB.ElementType): void {
            const changedEle = type === 'div' 
                                ? this.divStyles
                                : this.pStyles


            for(let [key, value] of Object.entries(styleObj)) {
                Object.assign(changedEle, {
                    [key]: value
                })
            }
        }

        /**
            * @param name Name of default styles. Conception is: 'position-x-y-bg-width'
        */
        public setDefaultStyles(name: TB.DefaultStyles): void {
            switch(name) {
                case 'fixed-center-top-black-textsize':
                    this.divStyles = {
                        transition: '.5s',
                        position: 'fixed',
                        left: '50%',
                        top: '0',
                        translate: '-50% 0',
                        zIndex: '999',
                        borderRadius: '.25em',
                        border: '1px solid #505050',
                        padding: '1.25em 2em',
                        background: '#232323',
                        width: 'max-content'
                    }
        
                    this.pStyles = {
                        fontWeight: '500',
                        fontSize: '1.1rem',
                        color: 'rgb(245, 245, 245)'
                    }
                break;

                default: return
            }
        }

        /** 
            * @param element Element to append box
            * @param removeAfterMs Remove box after miliseconds
            * @param appendFirst Optional - if true, uses prepend(), default appendChild()
            * @info use initializeBox() first
        */
        public appendTo(element: HTMLElement, removeAfterMs: number, appendFirst?: boolean): void {
            if(!this.eDiv || !this.ePar) return

            Object.assign(this.eDiv.style, this.divStyles)
            Object.assign(this.ePar.style, this.pStyles)

            this.eDiv.className = this.cname
            this.ePar.className = 'textbox-p'
            this.ePar.textContent = this.message

            appendFirst
                ? element.prepend(this.eDiv)
                : element.appendChild(this.eDiv)


            setTimeout(() => {

                this.eDiv?.remove()
                this.clearProperties()

            }, removeAfterMs)
        }

        /**
            * @info Removes element with exact same classname. Use if instance of this class is created dynamically
            * @param element Element where box will be appended
            * @returns this 
        */
        public removePreviousBox(element: HTMLElement, removeClass?: string): this {
            if(!this.cname && !removeClass) return this

            for(let x of Array.from(element.children)) {
                if(x.className === removeClass ?? this.cname) {
                    x.remove()

                    return this
                }
            }

            return this
        }

        /**
            * @info Removes box manually 
        */
        public removeBox(): void {
            if(!this.eDiv) return

            clearTimeout(this.timeout!)
            this.eDiv.remove()
            this.clearProperties()
        }

        /**
            * @param type Remove styles of "div" or "p" or both if argument not passed
        */
        public resetStyles(type?: TB.ElementType): void {
            if(!type) {
                this.divStyles = {}
                this.pStyles = {}
            }
            else if(type === 'div') this.divStyles = {}
            else if(type === 'p') this.pStyles = {}
        }


        /**
            * @param element Optional - If present, searches for box in that element children. If not, checks if current class instance box is appended
            * @returns True if element is appended, false otherwise 
        */
        public isAppended(element?: HTMLElement): boolean {
            return element
                ? Array.from(element.children).some(x => x.className === this.cname)
                : !!this.eDiv
        }

        public set setMessage(str: string) {
            this.message = str
        }

        public set setClass(str: string) {
            this.cname = str
        }
    }


    public static DropDown = class extends DD.DropDown {
        private active: boolean
        private activeList: HTMLElement | null

        private boxProps: DD.BoxProps

        private transitionMsc: number


        private returnHeight(list: HTMLElement, display?: DD.DisplayType): DD.ReturnedHeight {
            list.style.height = 'auto'
            list.style.display = display ?? 'block'

            const getValueOfProperty = (property: string) => {
                return parseFloat(window.getComputedStyle(list, null).getPropertyValue(property)
                                    .split('')
                                    .filter(x => /[0-9.]/ig.test(x) )
                                    .join('')
                                )
            }
            
            const height: number = getValueOfProperty('height')

            if(!this.boxProps) {
                const marginTop: number = getValueOfProperty('margin-top'),
                      marginBottom: number = getValueOfProperty('margin-bottom')


                this.boxProps = {
                    mTop: marginTop,
                    mBottom: marginBottom
                }
            }

            return {
                height, 
                marginTop: this.boxProps.mTop, 
                marginBottom: this.boxProps.mBottom
            }
        }

        private zeroListProperties(list: HTMLElement): void {
            list.style.marginTop = '0'
            list.style.marginBottom = '0'
            list.style.height = '0'
            list.style.overflow = 'hidden'
        }

        private calculateListProperties(list: HTMLElement, values: DD.ReturnedHeight): void {
            const {marginBottom, marginTop, height} = values

            list.style.marginTop = `${ marginTop }px`
            list.style.marginBottom = `${ marginBottom }px`
            list.style.height = `${ height }px`
        }


        public constructor(transitionMsc: number) {
            super()

            this.active = false
            this.activeList = null
            this.boxProps = null
            this.transitionMsc = transitionMsc
        }


        /**
            * @info Use height: 0, display: none, overflow: hidden IF USED FIRST 
            * @param hiddenList Your list to expand
            * @param display Optional - block or flex
        */
        public expandMenu(hiddenList: HTMLElement, display?: DD.DisplayType): void {
            if(!this.active) return

            const VALUES: DD.ReturnedHeight = this.returnHeight(hiddenList, display)
            
            hiddenList.style.transition = '0'
            this.zeroListProperties(hiddenList)
            
            setTimeout(() => {
                this.activeList = hiddenList
                
                hiddenList.style.transition = `${this.transitionMsc}ms`
                this.calculateListProperties(hiddenList, VALUES)

                setTimeout(() => hiddenList.style.overflow = 'visible', this.transitionMsc)
            }, 5);
        }


        /**
            * @param hiddenList Optional - Pass list to shrink, if you want to shrink list first
            * @param display Optional - block or flex
        */
        public shrinkMenu(hiddenList?: HTMLElement, display?: DD.DisplayType): void {
            if(!this.activeList && hiddenList) {
                const VALUES: DD.ReturnedHeight = this.returnHeight(hiddenList, display)

                this.calculateListProperties(hiddenList, VALUES)

                setTimeout(() => {
                    hiddenList.style.overflow = 'hidden'
                    this.zeroListProperties(hiddenList)

                    setTimeout(() => {
                        hiddenList.style.display = 'none'
                    }, this.transitionMsc);
                }, 5);

                return
            }
            
            if(this.active || !this.activeList) return

            const item = this.activeList

            item.style.overflow = 'hidden'
            this.zeroListProperties(item)

            this.activeList = null

            setTimeout(() => {
                item.style.display = 'none'
            }, this.transitionMsc);
        }  


        /**
            * @param arrow Rotates passed element (presumably arrow icon to indicate expanded list)
        */
        public rotateArrow(arrow: HTMLElement): void {
            this.active
                ? arrow.style.transform = 'rotate(180deg)'
                : arrow.style.transform = 'rotate(0)'
        }


        /**
            * @info Default {active} variable is false 
        */
        public switchActive(): void { 
            this.active = !this.active 
        }


        public get getActive(): boolean { 
            return this.active 
        }
    }


    public static Loading = class extends LOAD.Loading {
        private className: string

        private div: HTMLDivElement
        private currentAppended: HTMLElement | null


        public constructor(className?: string) {
            super()

            this.currentAppended = null
            this.className = className ?? 'loading-default-class'
            this.div = document.createElement('div')
        } 

        /**
            * @info Sets default loading styles 
            * @param circleStyles Optional - Object of optional circle styles
        */
        public defaultStyleCircle(circleStyles?: LOAD.CircleStyleType): this {
            const appliedStyles: LOAD.CircleStyleType = { 
                backgroundClr: circleStyles?.backgroundClr ?? 'rgba(30, 30, 30, .9)',
                clr1: circleStyles?.clr1 ?? 'royalblue',
                clr2: circleStyles?.clr2 ?? 'cornflowerblue',
                position: circleStyles?.position ?? 'fixed',
                width: circleStyles?.width ?? '',
                height: circleStyles?.height ?? '',
                borderRadius: circleStyles?.borderRadius ?? '2.5em'
            }

            const { backgroundClr, clr1, clr2, position, width, height, borderRadius } = appliedStyles

            const span1 = document.createElement('span'),
                  span2 = document.createElement('span')


            const id: string = Math.random().toString(36).substring(2, 12)
            this.div.id = id

            let pos: number | string | undefined, 
                w: number | string | undefined, 
                h: number | string | undefined,
                mw: string = '100px'


            if(position === 'fixed') {
                pos = 'fixed'
                w = width || 'clamp(120px, 30vw, 180px)'

            }else if(position === 'containerWidth') {
                pos = 'absolute'
                w = width || '50%'

            }else if(position === 'containerHeight') {
                pos = 'absolute'
                h = height || '80%'
                mw = 'auto'
            }


            if(!pos) throw new Error('Position not set')


            Object.assign(this.div.style, {
                position: pos,
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                background: backgroundClr,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999'
            })

            Object.assign(span1.style, {
                background: clr1,
                borderRadius,
                position: 'relative',
                width: w ?? 'auto',
                height: h ?? 'auto',
                minWidth: mw,
                aspectRatio: 1
            })

            Object.assign(span2.style, {
                background: clr2,
                position: 'absolute',
                left: '50%',
                top: '50%',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%'
            })

            span1.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ], {
                duration: 3000,
                iterations: Infinity
            })

            span1.appendChild(span2)
            this.div.appendChild(span1)

            return this
        }

        /**
            * @info Sets default loading styles 
            * @param dotStyles Optional - Object of optional dot styles
        */
        public defaultStyleDots(dotStyles?: LOAD.DotStyleType): this {
            const spans: HTMLElement[] = [...Array(3)].map(x => document.createElement('span'))
            const cont: HTMLElement = document.createElement('section')

            const appliedStyles: LOAD.DotStyleType = { 
                backgroundClr: dotStyles?.backgroundClr ?? 'rgba(30, 30, 30, .9)',
                clr1: dotStyles?.clr1 ?? 'royalblue',
                position: dotStyles?.position ?? 'fixed',
                width: dotStyles?.width ?? '',
                height: dotStyles?.height ?? '',
            }

            const { backgroundClr, clr1, position } = appliedStyles
            let { width, height } = appliedStyles
            
            if(!width) width = position === 'fixed' ? '25px' : '15px'
            if(!height) height = position === 'fixed' ? '25px' : '15px'

            Object.assign(this.div.style, {
                position: position === 'fixed' ? 'fixed' : 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                background: backgroundClr,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999'
            })

            Object.assign(cont.style, {
                display: 'flex'
            })

            let i: number = 200
            for(let x of spans) {
                cont.appendChild(x)

                Object.assign(x.style, {
                    background: clr1,
                    width,
                    height,
                    borderRadius: '50%',
                    marginRight: '.75em'
                })

                x.animate(
                    [
                    { transform: 'scale(1)' },
                    { transform: 'scale(.5)' },
                    { transform: 'scale(1)' }
                    ],
                    { duration: 800, iterations: Infinity, delay: i }
                )

                i += 200
            }

            this.div.appendChild(cont)

            return this
        }

        /**
            * @param element Element which loading will be appended to 
            * @param appendFirst Optional - if true, loading will be appended at the beginning of the container, otherwise as a last element (default)
        */
        public append(element: HTMLElement, appendFirst?: boolean): void {
            this.div.className = this.className
            this.currentAppended = this.div

            appendFirst 
                ? element.prepend(this.div) 
                : element.appendChild(this.div)
        }

        /**
            * Remove appended image
        */
        public remove(): void {
            if(!this.currentAppended) return

            this.currentAppended.remove()
            this.currentAppended = null
        }
    }


    public static Fetches = class {
        private async getReturnedData<T>(res: Response): Promise<FETCH.MixReturn<T>> {
            let json: T,
                msg: string = res.statusText


            const code: number = res.status
        
            try { json = await res.json() }
            catch(err) { json = null as any }
        
            const returnObj: FETCH.MixReturn<T> = {
                code,
                msg,
                json
            }
        
            if(!res.ok) throw returnObj
        
            return returnObj
        }

        /**
            * @info Use when you want to do regular request
            * @param url URL to fetch from
            * @param type HTTP method. GET, POST, PATCH, PUT, DELETE
            * @param body Optional - any object, array which will be passed as body 
            * @returns Object { json: T, code: number, msg: string } 
        */
        public async mix<T = any>(url: string, type: FETCH.RequestType, body?: any): Promise<FETCH.MixReturn<T>> {
            const res = await fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        
            return await this.getReturnedData(res)
        }
        
        /**
            * @info Use when you want to pass FormData as a body, eg. use this together with multer
            * @param url URL to fetch from
            * @param type HTTP method. GET, POST, PATCH, PUT, DELETE
            * @param formDataBody FormData object which will be passed as body
            * @returns Object { json: T, code: number, msg: string } 
        */
        public async multer<T = any>(url: string, type: FETCH.RequestType, formDataBody: FormData): Promise<FETCH.MixReturn<T>> {
            const res = await fetch(url, {
                method: type,
                body: formDataBody
            })
        
            return await this.getReturnedData(res)
        }
        
        /**
            * @param err Error catched in "catch" block. 
            * @param defaultMsg Default message if on backend's side JSON object with "msg" field was not set
            * @returns Object { code: number, msg: string }
        */
        public returnFetchErrorState(err: any, defaultMsg?: string): FETCH.FetchErrorReturn {
            return { 
                code: err?.code ?? 500, 
                msg: err.json?.msg 
                    ?? defaultMsg 
                    ?? 'Error message was not set' 
            }
        }
    
        /**
            * @param item Element to set pointerEvents: none
        */
        public disableButton(item: HTMLElement): void {
            item.style.pointerEvents = 'none'
        }
    
        /**
            * @param item Element to set pointerEvents: all
        */
        public enableButton(item: HTMLElement): void {
            item.style.pointerEvents = 'all'
        }
    }




    public static getDefaultMsgFromErrorCode(code: number): string {
        switch(code) {
            case 400: return 'Bad request'
            case 401: return 'Unauthorized'
            case 403: return 'Forbidden'
            case 404: return 'Not found'
            case 500: return 'Internal server error'

            default: return 'Unkown error'
        }
    }


    public static numberToDateString(num: number): string {
        const diff: number = Date.now() - num
        const days: number = diff / 1000 / 60 / 60 / 24 

        if(days <= 1) return 'Today'
        if(days > 1 && days < 2) return '1 day ago'

        return `${Math.floor(days)} days ago`
    }


    public static shuffleArray<T>(array: T[]): T[] {
        let currentIndex = array.length,
            randomIndex


        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [array[currentIndex], array[randomIndex]] = 
            [array[randomIndex], array[currentIndex]]
        }

        return array;
    }
}

export type {
    Aliases,
    CustomTypes,
    FETCH,
    TB,
    LOAD,
    DD
}