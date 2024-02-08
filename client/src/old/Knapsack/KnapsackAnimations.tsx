type Translation = {
    up?: number;
    down?: number;
    left?: number; 
    right?: number;
}

type KeyFrame = {
    target: AnimationElement;
    duration : number;
    action : (...args : any[]) => any;
    params : any[];
}


class AnimationElement {

    element : HTMLElement;
    unchangedElement : HTMLElement;
    label : HTMLElement;
    keyframes: KeyFrame[];

    constructor(id: string) {
        this.keyframes = [];
        this.element = document.getElementById(id) || document.createElement('span');
        this.label =  this.element.lastChild as HTMLElement;

        let clonedElement = this.element.cloneNode() as HTMLElement;

        this.element.childNodes.forEach(function(item) {
            let childClone = item.cloneNode(true);
            clonedElement.appendChild(childClone);
        })

        this.unchangedElement = clonedElement;
    }

    getTranslateXY() {
        var style = window.getComputedStyle(this.element);
        var transform = style.transform;
    
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) {
            return {
                x: parseFloat(mat[1].split(', ')[12]),
                y: parseFloat(mat[1].split(', ')[13])
            };
        }
    
        mat = transform.match(/^matrix\((.+)\)$/);
        if (mat) {
            return {
                x: parseFloat(mat[1].split(', ')[4]),
                y: parseFloat(mat[1].split(', ')[5])
            };
        }
    
        return { x: 0, y: 0 };
    }


    reset() : void {
        this.element.replaceWith(this.unchangedElement);
        this.element = this.unchangedElement;
    }

    show() : void {
        this.element.classList.remove('hidden');
    }



    hide() : void {
        this.element.classList.add('hidden');
    }
    
    scale(scaleFactor: number)  : void {
        this.element.style.transform = `scale(${scaleFactor})`
    }
    
    makeVisible() : void {
        this.show();
        setTimeout(() => {this.element.classList.add('visible');}, 20);
    }

    swipeUpandOut(amount: number): void {
        this.shift({up: amount});
        this.makeInvisible();
        setTimeout(() => {this.shift({down: 150})}, 1000);
    }

    swipeUpandIn(amount: number): void {
        this.element.classList.add("no-animation");
        this.shift({down:amount});
        this.element.classList.remove("no-animation");
        this.makeVisible();
        this.shift({up: amount});

    }
    
    makeInvisible() : void {
        this.element.classList.remove('visible');
        setTimeout(() => {this.hide()}, 1000);
    }
    
    setLabel(text: string) {
        this.label.textContent = text;
        this.showLabel();
    }

    setLabelHTML(html : string) {
        this.label.textContent = "";
        this.label.innerHTML = html;
        this.showLabel();
    }

    showLabel() {
        this.label.classList.add('visible');
    }

    shift({up = 0, down = 0, left = 0, right = 0} : Translation) {
        let {x, y} = this.getTranslateXY();
        console.log(`shifting ${up}${down}${left}${right}`);
        const rect = this.element.getBoundingClientRect();
        console.log(`translateX(${right - left}) translateY(${down - up})`)
        this.element.style.transform = `translateX(${x + right - left}px) translateY(${y + down - up}px)`
    }
    
}

class AnimationManager {
    keyframes : KeyFrame[];

    constructor() {
        this.keyframes = [];
    }

    createKeyframe(target: AnimationElement, duration: number, action: (...params : any[]) => any, ...params : any) : KeyFrame {
        return {target: target, duration: duration, action: action, params: params};
    }

    addKeyframe(keyframe: KeyFrame) {
        this.keyframes.push(keyframe);
    }

    addKeyframes(keyframes : KeyFrame[]) {
        this.keyframes.push(...keyframes);
    }

    runAnimation(start?: number) {
        let currentTime = start ? start : 0;
        this.keyframes.forEach((keyframe: KeyFrame) => {
            setTimeout(() => {
                console.log(`${currentTime}: ${keyframe.action}(${keyframe.params})`)
                keyframe.action.apply(keyframe.target, keyframe.params);
            }, currentTime)

            currentTime = currentTime + keyframe.duration;

        });
    }

    addLoopedKeyframes(keyframes : KeyFrame[], numTimes: number) {
        for (let i = 0; i < numTimes; i++) {
            this.keyframes.push(...keyframes);
        }
        console.log(this.keyframes)
    }
}

interface Animation {
    elements: { [key: string]: AnimationElement };
    populate: () => void;
    play: () => void;
    reset: () => void;
}

class KnapsackAnimation implements Animation {

    elements: { [key: string]: AnimationElement };

    constructor() {
        this.elements = {}
    }

    populate() {
        this.elements["duffle"] = new AnimationElement('duffle');
        this.elements["bracelet"] = new AnimationElement('bracelet');
        this.elements["gold"] = new AnimationElement('gold');
        this.elements["diamond"] = new AnimationElement('diamond');
    }

    play() {

        const duffle = this.elements["duffle"];
        const bracelet = this.elements["bracelet"];
        const gold = this.elements["gold"];
        const diamond = this.elements["diamond"];

        const animMan = new AnimationManager();
    
        const setupScene = [
            animMan.createKeyframe(duffle, 500, duffle.makeVisible, null),
            animMan.createKeyframe(bracelet, 0, duffle.makeVisible, null),
            animMan.createKeyframe(duffle, 2000, duffle.shift, {left: 150}),
            animMan.createKeyframe(bracelet, 0, bracelet.swipeUpandOut, 175),
        ]
    
        const loopItems = [
            animMan.createKeyframe(gold, 2000, gold.swipeUpandIn, 175, null),
            animMan.createKeyframe(gold, 0, gold.swipeUpandOut, 175),
            animMan.createKeyframe(diamond, 2000, diamond.swipeUpandIn, 175),
            animMan.createKeyframe(diamond, 0, diamond.swipeUpandOut, 175),
            animMan.createKeyframe(bracelet, 2000, diamond.swipeUpandIn, 175),
            animMan.createKeyframe(bracelet, 0, diamond.swipeUpandOut, 175),
        ]
    
        animMan.addKeyframes(setupScene);
        animMan.addLoopedKeyframes(loopItems, 2);
    

        animMan.runAnimation(1000);
    }

    reset() {
       
        const values = Object.keys(this.elements).map(key => this.elements[key]);
        console.log(values);
        values.forEach((element : AnimationElement) => {
            element.reset();
        });
    }
}

export default KnapsackAnimation