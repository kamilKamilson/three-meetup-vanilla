/* Step1: Prepare the canvas and get WebGL context */

const canvas = document.getElementById('renderer');
const gl = canvas.getContext('experimental-webgl');

/* Step2: Define the geometry and store it in buffer objects */

const vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];
const vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/* Step3: Create and compile Shader programs */

const vertCode =
  'attribute vec2 coordinates;' + 
  'void main(void) { gl_Position = vec4(coordinates,0.0, 1.0); }';

const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

const fragCode = 'void main(void) { gl_FragColor = vec4(0.0, 0.87, 0.72, 1); }';
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader); 
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

/* Step 4: Associate the shader programs to buffer objects */

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
const coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

/* Step5: Drawing the required object (triangle) */

gl.clearColor(0.008, 0.08, 0.177, 1);
gl.enable(gl.DEPTH_TEST); 
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0,0,canvas.width,canvas.height);
gl.drawArrays(gl.TRIANGLES, 0, 3);