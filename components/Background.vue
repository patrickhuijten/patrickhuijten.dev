<template>
  <canvas id="3js" ref="3js" @mousemove="onPointerMove" />
</template>
<script>
import * as THREE from "three";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      geometry: null,
      material: null,
      mesh: null,
      renderer: null,
      canvas: null,
      particles: null,
      max_particles: 10,
      count: 0,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: 0,
      windowHalfY: 0,
      AMOUNTX: 20,
      AMOUNTY: 20,
      scaleFactor: 1.4,
      accentColor: "#fff",
      vertexShader: ` 
        attribute float scale;

        void main() {

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

            gl_PointSize = scale * ( 300.0 / - mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;

        }`,
      fragmentShader: `
        uniform vec3 color;

        void main() {

            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

            gl_FragColor = vec4( color, 1.0 );

        }
        `,
    };
  },
  methods: {
    init() {
      this.accentColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--highlight");

      this.canvas = this.$refs["3js"];
      this.camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.01,
        10000
      );

      this.scene = new THREE.Scene();
      this.camera.position.z = 125;
      this.camera.position.y = 75;
      this.camera.position.x = 125;
      this.camera.lookAt(this.scene.position);

      this.generateParticles();

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs["3js"],
      });

      this.renderer.setClearColor(0xffffff, 0);

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.windowHalfX / window.innerWidth / 2;
      this.windowHalfY / window.innerHeight / 2;

      this.renderer.setPixelRatio(window.devicePixelRatio);

      window.addEventListener("resize", this.onResize);
      window.addEventListener("pointermove", this.onPointerMove);

      this.update();
    },
    enableGrid() {
      const size = 10;
      const divisions = 10;

      const gridHelper = new THREE.GridHelper(size, divisions);
      this.scene.add(gridHelper);
    },
    generateParticles() {
      const SEPARATION = 10;
      const numParticles = this.AMOUNTX * this.AMOUNTY;

      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);

      let i = 0;
      let j = 0;

      for (let ix = 0; ix < this.AMOUNTX; ix++) {
        for (let iy = 0; iy < this.AMOUNTY; iy++) {
          positions[i] = ix * SEPARATION - (this.AMOUNTX * SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] = iy * SEPARATION - (this.AMOUNTY * SEPARATION) / 2; // z

          scales[j] = 0.1;

          i += 3;
          j++;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
      const accentColorHex = parseInt(this.accentColor.replace("#", "0x"), 16);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(accentColorHex) },
        },
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
      });
      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    },
    update() {
      this.animatePoints();
      requestAnimationFrame(this.update);
      this.renderer.render(this.scene, this.camera);
    },
    animatePoints() {
      const positions = this.particles.geometry.attributes.position.array;
      const scales = this.particles.geometry.attributes.scale.array;

      let i = 0,
        j = 0;

      for (let ix = 0; ix < this.AMOUNTX; ix++) {
        for (let iy = 0; iy < this.AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + this.count) * 0.3) * 5 +
            Math.sin((iy + this.count) * 0.5) * 5;

          scales[j] =
            (Math.sin((ix + this.count) * 0.3) + 1) * this.scaleFactor +
            (Math.sin((iy + this.count) * 0.5) + 1) * this.scaleFactor;

          i += 3;
          j++;
        }
      }

      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.geometry.attributes.scale.needsUpdate = true;

      this.count += 0.04;
    },
    onResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onPointerMove(event) {
      if (event.isPrimary === false) return;

      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
canvas {
  position: absolute;
  width: 100% !important;
  height: 100% !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -5;
}
</style>