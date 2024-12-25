import React from 'react';
import { GLView } from 'expo-gl';
import { Renderer,TextureLoader } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { useLoader } from '@react-three/fiber/native'

export const useTextureLoader = (): THREE.Texture => {
  const texture = useLoader(
    TextureLoader,
    require('../assets/logo1.png')
  )
  if (!texture || texture === null || Array.isArray(texture)) throw new Error("Error on loading texture")
  return texture
}

export default function ThreeDSphere() {
  const renderSphere = async (gl: WebGLRenderingContext) => {
    // Renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Texture loading
    const asset = Asset.fromModule(require('../assets/logo1.png')); // Replace with the path to your logo
    await asset.downloadAsync();
    // const texture = useTextureLoader()
    const texture = new THREE.TextureLoader().load(asset.localUri as string,(tex) => {
      // Center the texture properties directly after loading
      //tex.wrapS = THREE.RepeatWrapping; // Enable repeating in the S direction
      //tex.wrapT = THREE.RepeatWrapping; // Enable repeating in the T direction
      // tex.center.clamp({x:0.2,y:0.5},{x:.5,y:6})
      // tex.offset.set(0.5, 0.5); // Center the texture
      const scalingFactor = .3; // Same as the radius of the sphere
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      // Set repeat values to scale the texture
      //tex.wrapS = THREE.RepeatWrapping;
      //tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 1); // Scale down texture to match the radius

      // Center the texture
      tex.offset.set(0.5 - 1 / (5 * scalingFactor), 0.5 - 1 / (5 * scalingFactor));
      
    });

    // Sphere with texture
    const geometry = new THREE.SphereGeometry(1.3, 87, 87);
    const material = new THREE.MeshBasicMaterial({map:texture,transparent: true});
    // const material = new THREE.LineBasicMaterial( { color: 0x4080ff } );
    // const material = new THREE.LineBasicMaterial( {
    //   color: 0xffffff,
    //   linewidth: 1,
    //   linecap: 'round', //ignored by WebGLRenderer
    //   linejoin:  'round' //ignored by WebGLRenderer
    // } );
    const sphere = new THREE.Mesh(geometry, material);
    // const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
    // const material = new THREE.MeshDepthMaterial(); 
    // const sphere = new THREE.Mesh( geometry, material );

    scene.add(sphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      sphere.rotation.y += 0.009;
      sphere.rotation.x += 0.0015;

      renderer.render(scene, camera);
      gl.endFrameEXP();
      requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <GLView
      style={{ minWidth: 1000, minHeight: 1000, position:'absolute',bottom:-200,zIndex:-1 }}
      onContextCreate={renderSphere}
    />
  );
}
