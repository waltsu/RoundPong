function pongEngine() {
    this.renderer = new THREE.CanvasRenderer();
    this.width = 800;
    this.height = 600;
    this.viewAngle = 90;
    this.near = 0.1;
    this.far = 10000;
    this.container = $('#main-canvas');
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.width / this.height, this.near, this.far);
    this.scene = new THREE.Scene();
    this.light =
      new THREE.AmbientLight(0xFFFFFF);

    this.ball = null;
    this.ballMovingVector = new THREE.Vector3(0,0,0);


    this.initializeEngine = function () {
        console.log("Running the thing");
            
        this.scene.add(this.camera)
        this.camera.position.z = 800;
        this.renderer.setSize(this.width, this.height);
        this.container.append(this.renderer.domElement);

        var radius = 50,
            segments = 16,
            rings = 16;

        var sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xCC0000
                });

        this.ball = new THREE.Mesh(
          new THREE.SphereGeometry(
            radius,
            segments,
            rings),

          sphereMaterial);

        // add the sphere to the scene
        this.scene.add(this.ball);

        this.light.position.x = 10;
        this.light.position.y = 50;
        this.light.position.z = 130;

        // add to the scene
        this.scene.add(this.light);

        this.renderScene();
    };

    this.renderScene = function() {
        this.renderer.render(this.scene, this.camera);
    }

    this.startEngine = function() {
        this.initializeEngine();
        setInterval((function(self) {
            return function() { self.runLoop(); } })(this), 33);
        
    }

    this.applyVectorsToScene = function() {
        this.ball.position.addSelf(this.ballMovingVector)
    }

    this.runLoop = function() {
        this.applyVectorsToScene();
        this.renderScene();
    }

}
