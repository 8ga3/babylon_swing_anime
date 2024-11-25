const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(1, 1, 0), scene);

    var material = new BABYLON.StandardMaterial("texture1", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0.8, 0);

    // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {});

    // Torus
    var torus = BABYLON.MeshBuilder.CreateTorus("torus",
        {thickness: 2, tessellation: 32, diameter: 8}, scene);
    torus.position.x = 25;
    torus.position.z = 30;
    torus.material = material;

    //Create a Vector3 animation at 30 FPS
    const animationTorus = new BABYLON.Animation("torusEasingAnimation",
        "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the torus destination position
    const nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, -80));

    // Animation keys
    const keysTorus = [];
    keysTorus.push({ frame: 0, value: torus.position });
    keysTorus.push({ frame: 120, value: nextPos });
    animationTorus.setKeys(keysTorus);

    // Creating an easing function
    const easingFunction = new BABYLON.SineEase();

    // For each easing function, you can choose between EASEIN (default),
    // EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    // Adding the easing function to the animation
    animationTorus.setEasingFunction(easingFunction);



    //Create a Vector3 animation at 30 FPS
    const animationTorus2 = new BABYLON.Animation("torusEasingAnimation2",
        "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    const keysTorus2 = [];
    keysTorus2.push({ frame: 0, value: nextPos });
    keysTorus2.push({ frame: 120, value: torus.position });
    animationTorus2.setKeys(keysTorus2);

    // Creating an easing function
    const easingFunction2 = new BABYLON.SineEase();

    // For each easing function, you can choose between EASEIN (default),
    // EASEOUT, EASEINOUT
    easingFunction2.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    // Adding the easing function to the animation
    animationTorus2.setEasingFunction(easingFunction2);


    // 往復動作＋イージング
    const nextAnimation1 = function () {
        scene.beginDirectAnimation(torus, [animationTorus], 0, 120, false, 1, nextAnimation2);
    };

    const nextAnimation2 = function () {
        scene.beginDirectAnimation(torus, [animationTorus2], 0, 120, false, 1, nextAnimation1);
    };

    nextAnimation1();

    return scene;
}

const scene = createScene();
engine.runRenderLoop(() => { scene.render();});
window.addEventListener("resize", () => { engine.resize(); });
