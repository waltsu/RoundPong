var PI = 3.14159265359

function pongEngine() {
    this.renderer = new THREE.CanvasRenderer();
    this.width = 800;
    this.height = 600;
    this.viewAngle = 45;
    this.near = 0.1;
    this.far = 10000;
    this.container = $('#main-canvas');
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.width / this.height, this.near, this.far);
    this.scene = new THREE.Scene();
    this.light =
      new THREE.AmbientLight(0xFFFFFF);

    this.ball = null;
    this.ballMovingVector = new THREE.Vector3(0,0,0);
    this.paddle = null;
    this.paddleMovingVector = new THREE.Vector3(0,0,0);
    this.level = null;

    this.initializeEngine = function () {
        this.camera.position.z = 1500;
        this.scene.add(this.camera)
        this.renderer.setSize(this.width, this.height);
        this.container.append(this.renderer.domElement);

        this.scene.add(this.light);

        var basicRedMaterial =
            new THREE.MeshBasicMaterial(
                {
                    color: 0xFF0000
                });
        var basicGreenMaterial =
            new THREE.MeshBasicMaterial(
                {
                    color: 0x00FF00
                });
        var basicBlackMaterial =
            new THREE.MeshBasicMaterial(
                {
                    color: 0x000000
                });

        this.level = new THREE.Mesh(new THREE.CylinderGeometry(500, 500, 500, 50, 50, false), basicGreenMaterial);
        this.level.rotation.x = PI / 2;
        this.level.position.z = -400;
        this.scene.add(this.level);

        this.ball = new THREE.Mesh(
          new THREE.SphereGeometry(20, 16, 16), basicRedMaterial);
        this.ball.position.z = 500;
        this.scene.add(this.ball);


        this.paddle = new THREE.Mesh(new THREE.CubeGeometry(200, 20, 10), basicBlackMaterial);
        this.paddle.position.y = -450;
        this.scene.add(this.paddle);

    };

    this.renderScene = function() {
        this.renderer.render(this.scene, this.camera);
    }

    this.startEngine = function() {
        console.log("Starting the beast");
        this.initializeEngine();
        var runLoop = _.bind(this.runLoop, this);
        setInterval(runLoop, 33);
        
    }

    this.applyVectorsToScene = function() {
        this.ball.position.addSelf(this.ballMovingVector);
    }

    this.runLoop = function() {
        this.applyVectorsToScene();
        this.renderScene();
    }

}
