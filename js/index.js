"use strict";

window.addEventListener('keyup', function (event) {
    Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function (event) {
    Key.onKeydown(event);
}, false);

var Key = {
    _pressed: {},

    A: 65,
    W: 87,
    D: 68,
    S: 83,
    N: 78,
    M: 77,
    K: 75,
    L: 76,
    H: 72,
    J: 74,
    SPACE: 32,
    SHIFT: 16,


    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    }
};

var Math2 = {

  rangeRandom : function (v1, v2){
    var max = Math.max(v1,v2);
    var min = (max==v1)?v2 : v1;
    return min + Math.random()*(max-min);
  },

  rangeRandomInt : function (v1,v2){
    var max = Math.max(v1,v2);
    var min = (max==v1)?v2 : v1;
    var rnd = min + Math.random()*(max-min);
    return Math.round(rnd);
  },

}

let width = window.innerWidth,
    height = window.innerHeight,
    renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0xddeeff);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
document.body.appendChild(renderer.domElement);


var ambientLight, hemisphereLight, shadowLight;

function createLights() {

    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .6);

    ambientLight = new THREE.AmbientLight(0xffffff, .5);

    shadowLight = new THREE.DirectionalLight(0xffffff, .6);
    // shadowLight.position.set(150, 350, 350);
    // shadowLight.castShadow = true;
    // shadowLight.shadow.camera.left = -400;
    // shadowLight.shadow.camera.right = 400;
    // shadowLight.shadow.camera.top = 400;
    // shadowLight.shadow.camera.bottom = -400;
    // shadowLight.shadow.camera.near = 1;
    // shadowLight.shadow.camera.far = 1000;
    // shadowLight.shadow.mapSize.width = 2048;
    // shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
}


let skyboxGeometry = new THREE.CubeGeometry(50000, 50000, 50000),
    skyboxMaterial = new THREE.MeshBasicMaterial({
        color: 0x227ecc,
        side: THREE.BackSide
    }),
    cubeGeometry = new THREE.CubeGeometry(100, 100, 100),
    cubeMaterial = new THREE.MeshLambertMaterial({color: 0x4a76a8}),
    // planeGeometry = new THREE.PlaneGeometry(3400,3000,30,30),
    // planeMaterial = new THREE.MeshLambertMaterial({color: 0xa69150}),

    scene = new THREE.Scene,
    
    

    skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial),
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.fog = new THREE.FogExp2( 0xffffff, 0.0003 ),
    // plane = new THREE.Mesh(planeGeometry, planeMaterial);

// plane.rotation.x = Math.PI / -2;
// plane.receiveShadow = true;
// plane.position.x = 0;
// plane.position.z = 0;

scene.add(skybox);

createLights();

function Floor()
{       // 3c7e6d
  var floor = new THREE.Mesh( new THREE.PlaneGeometry(24000,20000,300,300), 
                         new THREE.MeshLambertMaterial( {color: 0x99AABB} ));

  var glitch = new THREE.Mesh( new THREE.PlaneGeometry(24000,20000,300,300), 
                         new THREE.MeshLambertMaterial( {color: 0x00555ae} ));

  var water = new THREE.Mesh( new THREE.PlaneGeometry(24000,20000,300,300), 
                         new THREE.MeshLambertMaterial( {color: 0x0077be} ));
  // floor.receiveShadow = true;
  
  floor.geometry.computeFaceNormals();
  
  for ( var i = 0; i < floor.geometry.faces.length; i ++ )
  {
      floor.geometry.faces[i].vertexNormals = [];
      glitch.geometry.faces[i].vertexNormals = [];
  }
     
  var vertices = floor.geometry.vertices;
  var glitchVertices = water.geometry.vertices;
  
  for (var i=0; i<vertices.length; i++)
  {
    var v = vertices[i];
    v.x += Math2.rangeRandom(-0,0);
    v.y += Math2.rangeRandom(-40,40);
    v.z += Math2.rangeRandom(-80,80); //set to 0 for glitch

    var w = glitchVertices[i];
    w.x += Math2.rangeRandom(-0,40);
    w.y += Math2.rangeRandom(-40,40);
    w.z += Math2.rangeRandom(-0,0);
  }
      
  floor.geometry.computeFaceNormals();
  floor.geometry.verticesNeedUpdate = true;
  floor.geometry.colorsNeedUpdate = true;
  
  
  floor.rotation.x = -Math.PI / 2; 
  // floor.receiveShadow = true;
  scene.add(floor);  

  glitch.rotation.x = -Math.PI / 2;
  scene.add(glitch); 

  // water.geometry.computeFaceNormals();
  // water.geometry.verticesNeedUpdate = true;
  // water.geometry.colorsNeedUpdate = true;
  
  
  water.rotation.x = -Math.PI / 2;  
  // water.receiveShadow = true;
  scene.add(water);         
}

function Draw()
{          
  var geometry = new THREE.DodecahedronGeometry( 20, 0);     
  var material = new THREE.MeshLambertMaterial( {color: 0xffffff } );    
   

  
  // bolder.geometry.computeFaceNormals();
  
  // for ( var i = 0; i < bolder.geometry.faces.length; i ++ )
  // {
  //     bolder.geometry.faces[i].vertexNormals = [];
  // }
  
  // var x = Math.random() * 34000,
  //     y = Math.random() * 30000,
  //     z = Math.random() * 300; 



 
  for (var b=0; b<20; b++) {
    var geometry = new THREE.DodecahedronGeometry( 20, 0);     
    var material = new THREE.MeshLambertMaterial( {color: 0xffffff } );  

    var bolder = new THREE.Mesh(geometry, material);

    for ( var i = 0; i < bolder.geometry.faces.length; i ++ )
      {
          bolder.geometry.faces[i].vertexNormals = [];
      }


    bolder.position.x = Math.random() * 14000;
    bolder.position.x *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    bolder.position.y = (Math.random() * 200) + 200;
    bolder.position.z = Math.random() * 10000; 
    bolder.position.z *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    

    bolder.geometry.computeFaceNormals();
    bolder.geometry.verticesNeedUpdate = true;
    bolder.geometry.colorsNeedUpdate = true;
    
    console.log(bolder);

    scene.add(bolder);
  }
  //Green Rocks
    for (var b=0; b<10; b++) {
    var geometry = new THREE.DodecahedronGeometry( 30, 0);     
    var material = new THREE.MeshLambertMaterial( {color: 0x306127 } );  

    var bolder = new THREE.Mesh(geometry, material);

    for ( var i = 0; i < bolder.geometry.faces.length; i ++ )
      {
          bolder.geometry.faces[i].vertexNormals = [];
      }


    bolder.position.x = Math.random() * 14000;
    bolder.position.x *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    bolder.position.y = (Math.random() * 200) + 200;
    bolder.position.z = Math.random() * 10000; 
    bolder.position.z *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
   

    bolder.geometry.computeFaceNormals();
    bolder.geometry.verticesNeedUpdate = true;
    bolder.geometry.colorsNeedUpdate = true;
    
    console.log(bolder);

    scene.add(bolder);
  }
 
 //Black Rocks
  for (var b=0; b<15; b++) {
    var geometry = new THREE.DodecahedronGeometry( 10, 0);     
    var material = new THREE.MeshLambertMaterial( {color: 0x000000 } );  

    var bolder = new THREE.Mesh(geometry, material);

    for ( var i = 0; i < bolder.geometry.faces.length; i ++ )
      {
          bolder.geometry.faces[i].vertexNormals = [];
      }


    bolder.position.x = Math.random() * 14000;
    bolder.position.x *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    bolder.position.y = (Math.random() * 200) + 200;
    bolder.position.z = Math.random() * 10000; 
    bolder.position.z *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    

    bolder.geometry.computeFaceNormals();
    bolder.geometry.verticesNeedUpdate = true;
    bolder.geometry.colorsNeedUpdate = true;
    
    console.log(bolder);

    scene.add(bolder);
  }

  //   for (var b=0; b<200; b++) {

  //       material = new THREE.MeshLambertMaterial( {color: 0xD4AF37 } );
        
  //       var bolder = new THREE.Mesh(geometry, material);

  //       for ( var i = 0; i < bolder.geometry.faces.length; i ++ )
  //         {
  //             bolder.geometry.faces[i].vertexNormals = [];
  //         }


  //       bolder.position.x = (Math.random() * 700) + 4500;
  //       bolder.position.y = (Math.random() * 200) + 400;
  //       bolder.position.z = (Math.random() * 1000) - 120; 
        

  //       bolder.geometry.computeFaceNormals();
  //       bolder.geometry.verticesNeedUpdate = true;
  //       bolder.geometry.colorsNeedUpdate = true;
        
  //       console.log(bolder);

  //       scene.add(bolder);
  // }


var mountainZ = 0;

for (var b=0; b<3; b++) {

  var mountainWidth = (Math.random() * 1000) + 500;
  // var mountainHeight = (Math.random() * 1000) + 1000;

  var mountainGeometry = new THREE.TetrahedronGeometry(mountainWidth, 1);

  var mountainMaterial = new THREE.MeshPhongMaterial( {color: 0x111111 } );

  var mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
  

  mountain.position.x = -7000;
  mountain.position.z = mountainZ;

    scene.add(mountain);

    mountainZ -= 1000;
  
}

  // bolder.position.x = 400;
  // bolder.position.y = 200;
  // bolder.position.z = 670; 
  // bolder.castShadow = true;


  
//   bolder.geometry.computeFaceNormals();
//   bolder.geometry.verticesNeedUpdate = true;
//   bolder.geometry.colorsNeedUpdate = true;
  
// scene.add( bolder );
       
Floor();  
}

Draw();


const cockpitGeometry = [
    [
        {
            'id': 4,
            'type': 'y',
            'size': -10
        },
        {
            'id': 4,
            'type': 'z',
            'size': 20
        },
        {
            'id': 5,
            'type': 'y',
            'size': -10
        },
        {
            'id': 5,
            'type': 'z',
            'size': -20
        },
        {
            'id': 6,
            'type': 'y',
            'size': 25
        },
        {
            'id': 6,
            'type': 'z',
            'size': 20
        },
        {
            'id': 7,
            'type': 'y',
            'size': 25
        },
        {
            'id': 7,
            'type': 'z',
            'size': -20
        }
    ]

]


const engeneGeometry = [
    [
        {
            x: 50,
            y: 25,
            z: 0,
            size: [0.4, 0.2, 0.2],
            rotation: 'z',
            angle: Math.PI / -2
        },
        {
            x: 50,
            y: -25,
            z: 0,
            size: [0.4, 0.2, 0.2],
            rotation: 'z',
            angle: Math.PI / -2
        },
        {
            x: 50,
            y: 0,
            z: 25,
            size: [0.4, 0.2, 0.2],
            rotation: 'y',
            angle: Math.PI / -2
        },
        {
            x: 50,
            y: 0,
            z: -25,
            size: [0.4, 0.2, 0.2],
            rotation: 'y',
            angle: Math.PI / -2
        }
    ],
    [
        {
            x: 30,
            y: 5,
            z: 27,
            size: [0.2, 0.5, 0.15],
            rotation: 'z',
            angle: Math.PI / -2.2
        },
        {
            x: 30,
            y: 5,
            z: -27,
            size: [0.2, 0.5, 0.15],
            rotation: 'z',
            angle: Math.PI / -2.2
        },
        {
            x: 30,
            y: -10,
            z: 27,
            size: [0.2, 0.5, 0.15],
            rotation: 'z',
            angle: Math.PI / -2.2
        },
        {
            x: 30,
            y: -10,
            z: -27,
            size: [0.2, 0.5, 0.15],
            rotation: 'z',
            angle: Math.PI / -2.2
        }
    ]
]

var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
};


const AirPlane = function (cockpitGeometry, engeneGeometry) {

    this.mesh = new THREE.Object3D();

    var geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});



    var i = cockpitGeometry.length;

    while (i-- > 0) {
        var size = cockpitGeometry[i].size,
            id = cockpitGeometry[i].id,
            type = cockpitGeometry[i].type;

        if (size < 0) {
            geomCockpit.vertices[id][type] -= (size * -1);
        } else {
            geomCockpit.vertices[id][type] += size;
        }
    }

    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    
   
    this.mesh.add(cockpit);

    // Создаем двигатель
    var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    var matEngine = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading});
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 50;
    //engine.position.x = 100;

 
    this.mesh.add(engine);

    if (engeneGeometry !== undefined && engeneGeometry.length > 0) {
        let eng = engeneGeometry.length;

        while (eng-- > 0) {
            let _eg = engeneGeometry[eng],
                bolt = new THREE.Mesh(geomEngine, matEngine);
            bolt.scale.set(_eg.size[0], _eg.size[1], _eg.size[2]);
            bolt.position.x = _eg.x;
            bolt.position.y = _eg.y;
            bolt.position.z = _eg.z;
            bolt.rotation[_eg.rotation] = _eg.angle;
            this.mesh.add(bolt);
        }
    }


    // Создаем хвост
    var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-40, 20, 0);

    this.mesh.add(tailPlane);

    // Создаем крыло
    var geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, 15, 0);

    this.mesh.add(sideWing);

    // Создаем пропеллер
    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    geomPropeller.vertices[4].y -= 5;
    geomPropeller.vertices[4].z += 5;
    geomPropeller.vertices[5].y -= 5;
    geomPropeller.vertices[5].z -= 5;
    geomPropeller.vertices[6].y += 5;
    geomPropeller.vertices[6].z += 5;
    geomPropeller.vertices[7].y += 5;
    geomPropeller.vertices[7].z -= 5;
    var matPropeller = new THREE.MeshPhongMaterial({color: Colors.brown, shading: THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);



    // Создаем лопасть
    var geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({color: Colors.brownDark, shading: THREE.FlatShading});
    var blade1 = new THREE.Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);



    var blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;


    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(60, 0, 0);
    this.mesh.add(this.propeller);


    //Колеса

    var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
    var wheelProtecMat = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
    var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.mesh.add(wheelProtecR);

    var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
    var wheelTireMat = new THREE.MeshPhongMaterial({color: Colors.brownDark, shading: THREE.FlatShading});
    var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);

    var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
    var wheelAxisMat = new THREE.MeshPhongMaterial({color: Colors.brown, shading: THREE.FlatShading});
    var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    this.mesh.add(wheelTireR);

    var wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.mesh.add(wheelProtecL);

    var wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    var wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(.5, .5, .5);
    wheelTireB.position.set(-35, -8, 0);
    this.mesh.add(wheelTireB);

    var suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
    var suspensionMat = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
    var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(-35, -8, 0);
    suspension.rotation.z = -.3;
    this.mesh.add(suspension);
};


let airplane1,
    camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);



function createPlane() {
    airplane1 = new AirPlane(cockpitGeometry[0], engeneGeometry[0]);
    airplane1.mesh.scale.set(0.5, 0.5, 0.5);
    airplane1.mesh.position.y = 200;

    airplane1.mesh.rotation.y = Math.PI / 2;

  //  airplane1.mesh.position.x = 0;


    scene.add(airplane1.mesh);
}



createPlane();

var left = 0,
    right = 0,
    moveS = 0,
    j=0,
    i=0,
    moveW = 0;

function render() {
    renderer.render(scene, camera);
    camera.lookAt(airplane1.mesh.position);


    left = Key.isDown(Key.A) ? 0.01 : 0;
    right = Key.isDown(Key.D) ? -0.01 : 0;
    moveW = Key.isDown(Key.W) ? 5 : 0;
    moveS = Key.isDown(Key.S) ? 0 : 0;

   if (Key.isDown(Key.SPACE) && Key.isDown(Key.W)) {
        airplane1.mesh.position.y -= 1;
   } 

   // else if (Key.isDown(Key.SPACE) && Key.isDown(Key.W) && airplane1.mesh.position.y === 200) {
   //      airplane1.mesh.position.y = 200;
   // } else 

  if (airplane1.mesh.position.y === 400){
    airplane1.mesh.position.y = airplane1.mesh.position.y;  
   } else {
    airplane1.mesh.position.y += .5;
   }

   // if (Key.isDown(Key.SPACE) && Key.isDown(Key.W) && airplane1.mesh.position.y < 401) {
   //      airplane1.mesh.position.y += 1;
   // } else if (Key.isDown(Key.SPACE) && Key.isDown(Key.W) && airplane1.mesh.position.y === 200) {
   //      airplane1.mesh.position.y = 200;
   // } 

    j+=left + right;

    if((moveW>0&&i<3)||i<3){
        i+=moveW/300;
    } else{
        i=3;
    }

    if (Key.isDown(Key.N)) {
        airplane1.mesh.rotation.x +=.02;
        // camera.rotation.x +=Math.PI / 2;
    }  
    if (Key.isDown(Key.M)) {
        airplane1.mesh.rotation.x -=.02;
        // camera.rotation.x -=Math.PI / 2;
    } 
     if (Key.isDown(Key.H)) {
        airplane1.mesh.rotation.y +=.01;
        // camera.rotation.y +=Math.PI / 2;
    } 
     if (Key.isDown(Key.J)) {
        airplane1.mesh.rotation.y -=.01;
        // camera.rotation.y -=Math.PI / 2;
    } 
     if (Key.isDown(Key.K)) {
        airplane1.mesh.rotation.z +=.02;
        // camera.rotation.z +=Math.PI / 2;
    } 
     if (Key.isDown(Key.L)) {
        airplane1.mesh.rotation.z -=.02;
        // camera.rotation.z -=Math.PI / 1;
    }

    if (Key.isDown(Key.SPACE)) {
        
   
    }


    if(moveW===0&&i>0){
        i-=0.01;

        if(i<=0){
            i=0
        }
    }

    airplane1.propeller.rotation.x += i/3+i/30;
   // airplane1.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), left + right)

    airplane1.mesh.rotation.y += left + right;

   // console.log(j);

    airplane1.mesh.translateOnAxis(new THREE.Vector3(1, 0, 0), 3+i);
    camera.position.z -= moveW + moveS;

    camera.position.y = airplane1.mesh.position.y;
    camera.position.z = airplane1.mesh.rotation.z;

    //
    //
    camera.position.x = Math.sin(j) * 100 +  airplane1.mesh.position.x;
    camera.position.z = Math.cos(j) * 100 +  airplane1.mesh.position.z;
    // camera.position.y = Math.cos(j) * 100 +  airplane1.mesh.position.y;


    requestAnimationFrame(render);
}

render();