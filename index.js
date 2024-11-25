// Playground
// https://playground.babylonjs.com/#2CTZW8

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(1, 1, 0), scene);

    var material = new BABYLON.StandardMaterial("texture1", scene);
    material.diffuseColor = new BABYLON.Color3(0.4, 0.8, 0);

    // Torus
    var torus = BABYLON.MeshBuilder.CreateTorus("torus",
        {thickness: 2, tessellation: 32, diameter: 8}, scene);
    torus.position.x = 25;
    torus.position.z = 30;
    torus.material = material;

    const animationTorus = new BABYLON.Animation("torusEasingAnimation",
        "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const easingFunction = new BABYLON.SineEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    // Animation keys
    const nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, -80));

    const keysTorus = [];
    keysTorus.push({ frame: 0,   value: torus.position, easingFunction: easingFunction });
    keysTorus.push({ frame: 120, value: nextPos,        easingFunction: easingFunction });
    keysTorus.push({ frame: 240, value: torus.position });
    animationTorus.setKeys(keysTorus);

    scene.beginDirectAnimation(torus, [animationTorus], 0, 240, true);

    return scene;
}

const scene = createScene();
engine.runRenderLoop(() => { scene.render();});
window.addEventListener("resize", () => { engine.resize(); });
