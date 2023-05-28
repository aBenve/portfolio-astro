import * as THREE from 'three'
// import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
// import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import {Clock, Matrix4} from 'three';

const maxVelocity = 200, maxAcceleration = 250, maxForce = 200

export class SpaceRender{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    current: HTMLDivElement;
    // componser: EffectComposer;
    // renderPass: RenderPass;
    constructor(spaceRef: React.RefObject<HTMLDivElement> | HTMLDivElement){
        this.current = spaceRef instanceof HTMLDivElement ? spaceRef : spaceRef.current!
        //Space
        this.scene = new THREE.Scene()
        //Camera
        this.camera = new THREE.OrthographicCamera(

            this.current.clientWidth / -2,
            this.current.clientWidth / 2,
            this.current.clientHeight / -2,
            this.current.clientHeight / 2,
            0.1,
            1000
        )

        this.camera.position.z = 100
        this.scene.add( this.camera)

        //Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha:true})

        this.renderer.setSize(this.current.clientWidth , this.current.clientHeight )
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.current.appendChild(this.renderer.domElement)

        window.addEventListener( 'resize', () => this.onResize(), false );

        // post processing
        // this.componser = new EffectComposer(this.renderer)
        // this.renderPass = new RenderPass(this.scene, this.camera)
        // const bloomPass = new UnrealBloomPass(
        //     new THREE.Vector2(window.innerWidth, window.innerHeight),
        //     3.5,
        //     0.4,
        //     0.85
        //     );
        // this.componser.addPass(this.renderPass)
        // this.componser.addPass(bloomPass)

    }



    onResize(){
        //composer.setSize( current.clientWidth, current.clientHeight );
        this.camera.left = this.current.clientWidth / -2,
        this.camera.right = this.current.clientWidth / 2,
        this.camera.top = this.current.clientHeight / -2,
        this.camera.bottom = this.current.clientHeight / 2,

        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.current.clientWidth, this.current.clientHeight );
    }

    unMount(){
        this.current.removeChild(this.renderer.domElement)
        window.removeEventListener( 'resize', () => this.onResize() );
    }
    render(){
        this.renderer.render(this.scene, this.camera)
        //this.componser.render()
    }
}

export class Space {
    spaceRender: SpaceRender
    needInteraction: boolean
    particlesAmount: number
    size: number
    particlesMesh: THREE.InstancedMesh
    particles: Particle[]
    clock: Clock

    constructor(
        spaceRender: SpaceRender, 
        needInteraction:boolean,
        particleSize:number, 
        particlesAmount: number, 
        vision: number,
        color: string, 
        alingWeight: number, 
        cohesionWeight: number, 
        separationWeigth: number
    ){

        this.spaceRender = spaceRender
        this.needInteraction = needInteraction
        this.spaceRender.renderer.domElement.addEventListener('click', (e) => this.react(e), false)

        this.particlesAmount = particlesAmount
		this.size = particleSize;
        const particleGeometry = new THREE.ConeGeometry(10 * this.size, 25 * this.size, 3)
        const particleMaterial = new THREE.MeshBasicMaterial({color: color})
		this.particlesMesh = new THREE.InstancedMesh(
            particleGeometry,
            particleMaterial,
			particlesAmount
        )
		let {x: width, y: height} = this.spaceRender.renderer.getSize(new THREE.Vector2())
        this.particles = Array(this.particlesAmount)
                .fill(this.particlesAmount)
                .map((e,i) => {
                    return new Particle(
                        vision,
                        alingWeight,
                        cohesionWeight,
                        separationWeigth,
                        width, 
                        height, 
                        i,
                        (pos, vel) => {
                            this.particlesMesh.setMatrixAt(i, 
                            new Matrix4().multiply(
                                new Matrix4().makeTranslation(pos.x, pos.y, 0)
                            )
                            .multiply(new Matrix4().makeRotationZ(vel.angle() - Math.PI/2))
                            )
                        }
                    )
                })
		this.clock = new Clock();
    }

    interact(){
        if(this.needInteraction)
            this.particles.forEach((particle) => particle.interact(this.particles))
    }
    update(){
		let dt = this.clock.getDelta();
		let size = this.spaceRender.renderer.getSize(new THREE.Vector2());
        this.particles.forEach((particle) => particle.update(dt, size.x, size.y))
		//console.log(size);
		// console.log(1/dt);
    }
    addToScene(){
		this.spaceRender.scene.add(this.particlesMesh)
    }
    render(){
        this.particles.forEach((particle) => particle.render())
		this.particlesMesh.instanceMatrix.needsUpdate = true;
    }
    animate(){
        requestAnimationFrame(() => this.animate())
		this.interact()
		this.update()
        this.render()
        this.spaceRender.render()
    }

    react(e: any){
        let rect = e.target!.getBoundingClientRect()
        let mousePosition = new THREE.Vector2(
            e.clientX - rect.left - rect.width/2,
            e.clientY - rect.top - rect.height/2
        )

        this.particles.forEach((particle) => particle.react( mousePosition, 100))
        // Draw a circle pulse
        //this.drawPulse(mousePosition)

    }

    unMount(){
        this.spaceRender.renderer.domElement.removeEventListener('click', (e) => this.react(e))
        this.spaceRender.unMount()
    }

    drawPulse(mousePosition: THREE.Vector2){
        let circle = new THREE.CircleGeometry( 100, 32 );
        let circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        let circleMesh = new THREE.Mesh( circle, circleMaterial );
        circleMesh.position.set(mousePosition.x, mousePosition.y, 0)
        this.spaceRender.scene.add( circleMesh );
        setTimeout(() => this.spaceRender.scene.remove(circleMesh), 100)
    }
}

export class Particle {

    vision: number
    alingWeight: number
    cohesionWeight: number
    separationWeigth: number
    id: number
    position: THREE.Vector2
    velocity: THREE.Vector2
    acceleration: THREE.Vector2
    updated: (pos: THREE.Vector2, vel: THREE.Vector2) => void

    constructor(
        vision: number, 
        alingWeight: number, 
        cohesionWeight: number, 
        separationWeigth: number, 
        spaceWidth: number, 
        spaceHeight: number, 
        id: number, 
        updated: (pos: any, vel: any) => void
    ) {

        this.vision = vision

        this.alingWeight = alingWeight
        this.cohesionWeight = cohesionWeight
        this.separationWeigth = separationWeigth


        this.position = new THREE.Vector2(
            THREE.MathUtils.randFloatSpread( spaceWidth ),
            THREE.MathUtils.randFloatSpread( spaceHeight )
        )

        //this.particle.position.set(this.position.x, this.position.y,0)

        // TODO: maybe need to calculate magnitude?
        this.velocity = new THREE.Vector2(
            THREE.MathUtils.randFloatSpread( 250 ),
            THREE.MathUtils.randFloatSpread( 250 )
        )

        this.velocity.setLength(THREE.MathUtils.randFloat(0, maxVelocity))

        //this.particle.rotateZ(this.velocity.angle() - Math.PI/2)
        
        this.acceleration = new THREE.Vector2(
            THREE.MathUtils.randFloatSpread(250),
            THREE.MathUtils.randFloatSpread(250)
        )

        this.acceleration.setLength(THREE.MathUtils.randFloat(0, maxAcceleration))

        this.id = id

		this.updated = updated;
    }

    react(mousePosition: THREE.Vector2, radio: number){
        if(this.position.distanceTo(mousePosition) < radio){
            let repellentForce = this.position.clone()
            repellentForce.sub(mousePosition)

            if(repellentForce.length() > 0){
                repellentForce.normalize()
                repellentForce.multiplyScalar(maxVelocity)
                repellentForce.sub(this.velocity)

                this.velocity.add(repellentForce)

            }
        }
    }

    align(otherParticles: Particle[]){

        let vision = this.vision
        let separation = 25
        let alignCount = 0, coheCount = 0, sepCount = 0

        let align = new THREE.Vector2(0,0)
        let cohe = new THREE.Vector2(0,0)
        let sep = new THREE.Vector2(0,0)


        for(let other of otherParticles){
            let d = this.position.distanceTo(other.position)
            //console.log(this.position.distanceTo(other.position))
            if( d > 0 && d < vision && this.id !== other.id){
                alignCount++
                align.add(other.velocity)
                coheCount++
                cohe.add(other.velocity)    
            }
            if(d > 0 && d < separation){
                sepCount++
                let aux = this.position.clone()
                aux.sub(other.position)
                aux.normalize()
                aux.divideScalar(d)
                sep.add(aux)
            }
        }
        align = this.cleanAlignment(align, alignCount)
        cohe = this.cleanCohesion(cohe, coheCount)
        sep = this.cleanSeparation(sep, sepCount)
        return {align, cohe, sep}
    }

    cleanAlignment(vec: THREE.Vector2, count: number){
        if(count > 0){
            //console.log(align)
            vec.divideScalar(count)
            vec.normalize()
            vec.multiplyScalar(maxVelocity)
            vec.sub(this.velocity)
			vec.clampLength(0, maxForce)
            return vec
        }
        return new THREE.Vector2(0,0)
    }
    cleanCohesion(vec: THREE.Vector2, count: number){
        if(count > 0){
            vec.sub(this.position)
            vec.normalize()
            vec.multiplyScalar(maxVelocity)
            vec.sub(this.velocity)
			vec.clampLength(0, maxForce)
            return vec
        }
        return new THREE.Vector2(0,0)

    }
    cleanSeparation(vec: THREE.Vector2, count: number){
        if(count > 0)
            vec.divideScalar(count)
        if(vec.length() > 0){
            vec.normalize()
            vec.multiplyScalar(maxVelocity)
            vec.sub(this.velocity)
			vec.clampLength(0, maxForce)
        }
        return vec
    }

    interact(otherParticles: Particle[]){
        let {align, cohe, sep} = this.align(otherParticles)

        let random = new THREE.Vector2(THREE.MathUtils.randFloatSpread(100),THREE.MathUtils.randFloatSpread(100)).normalize()

        align.multiplyScalar(this.alingWeight)
        cohe.multiplyScalar(this.cohesionWeight)
        sep.multiplyScalar(this.separationWeigth)
        random.multiplyScalar(50)

        let sumAllForces = new THREE.Vector2(0,0).add(align).add(cohe).add(sep).add(random)
        this.acceleration.add(sumAllForces)
    }

    update(dt: number, width: number, height: number){

        this.checkBorder(width, height)
        

		this.position.add(this.velocity.clone().multiplyScalar(dt))
        this.velocity.add(this.acceleration.clone().multiplyScalar(dt))

		this.velocity.clampLength(0, maxVelocity)
        this.acceleration.multiplyScalar(0)
    }
        
    render(){
		this.updated(this.position, this.velocity);
    }   

    checkBorder(width: number, height: number){
        if(this.position.x > width/2 + 10)
            this.position.x = width/-2 
        if(this.position.y > height/2 + 10)
            this.position.y = height/-2 
        if(this.position.x < -width/2)
            this.position.x = width/2
        if(this.position.y < -height/2 )
            this.position.y = height/2
    }
}