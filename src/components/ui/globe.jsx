"use client";

import React, { useEffect, useRef } from 'react';

// Minimal wrapper around globe.gl exposing a `World` component used by the
// project's demo and contact card. It accepts either `data` (arcs array)
// or `dataUrl` (GeoJSON with features) and a `globeConfig` object for
// common visual settings.
export function World({ data, dataUrl, globeConfig = {}, style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    let mounted = true;

    // Dynamic imports for SSR compatibility
    Promise.all([
      import('globe.gl'),
      import('three'),
    ]).then(([globeModule, threeModule]) => {
      if (!mounted) return;

      const Globe = globeModule.default;
      const THREE = threeModule;

      try {
        // Default earth textures (CDN). Consumers may override via `globeConfig`.
        const defaultDay = 'https://unpkg.com/three-globe/example/img/earth-day.jpg';
        const defaultBump = 'https://unpkg.com/three-globe/example/img/earth-topology.png';

        const globe = Globe()(ref.current)
          .globeImageUrl(globeConfig.globeImageUrl ?? defaultDay)
          .bumpImageUrl(globeConfig.bumpImageUrl ?? defaultBump)
          .backgroundColor('rgba(0,0,0,0)')
          .polygonsTransitionDuration(300)
          .onGlobeReady(() => {
            try {
              // Ensure renderer clears to transparent so background shows through
              try {
                const renderer = globe.renderer();
                if (renderer && typeof renderer.setClearColor === 'function') {
                  renderer.setClearColor(new THREE.Color(0x000000), 0);
                }
              } catch (e) {}

              // Create a robust PBR material. Use DoubleSide to avoid culling issues
              const themeMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color(globeConfig.globeColor || '#7c3aed'),
                emissive: new THREE.Color(globeConfig.emissive || '#a78bfa'),
                emissiveIntensity: globeConfig.emissiveIntensity ?? 0.25,
                metalness: globeConfig.metalness ?? 0.0,
                roughness: globeConfig.roughness ?? 0.5,
                side: THREE.DoubleSide,
              });

              // Make sure material updates are noticed by three
              themeMaterial.needsUpdate = true;

              // Add stronger, warm/cool lights so colored material is visible
              try {
                const ambient = new THREE.AmbientLight(globeConfig.ambientLight || '#ffffff', globeConfig.ambientIntensity ?? 0.8);
                const dir1 = new THREE.DirectionalLight(globeConfig.directionalLeftLight || '#ffffff', globeConfig.directionalIntensityLeft ?? 0.9);
                dir1.position.set(-200, 100, 200);
                const dir2 = new THREE.DirectionalLight(globeConfig.directionalTopLight || '#ffd9b3', globeConfig.directionalIntensityTop ?? 0.6);
                dir2.position.set(200, 300, 100);
                globe.scene().add(ambient, dir1, dir2);
              } catch (e) {}

              // Helper that attempts to find meshes and replace or tint their material.
              // Some versions of globe.gl create the globe meshes slightly later,
              // so we retry a few times until we actually replace at least one mesh.
              let attempts = 0;
              const maxAttempts = 12;
              const intervalMs = 150;

              const tryReplace = () => {
                attempts += 1;
                let replaced = 0;
                try {
                  const children = (globe.scene && globe.scene().children) || [];
                  console.debug('[Globe] tryReplace attempt', attempts, 'scene children:', children.length);
                } catch (e) {}

                try {
                  globe.scene().traverse((obj) => {
                    if (obj.isMesh && obj.geometry) {
                      try {
                        // If the mesh already has a texture map, ensure correct encoding
                        // and apply a subtle tint by setting the material color/emissive.
                        if (obj.material && obj.material.map) {
                          try {
                            obj.material.map.encoding = THREE.sRGBEncoding;
                            obj.material.map.needsUpdate = true;
                            // Apply tint by multiplying the texture with a color
                            const tint = new THREE.Color(globeConfig.tintColor || globeConfig.globeColor || '#1e40af');
                            const tintIntensity = globeConfig.tintIntensity ?? 0.18;
                            // material.color multiplies the map; lerp towards tint for intensity
                            try {
                              const baseColor = obj.material.color ? obj.material.color.clone() : new THREE.Color('#ffffff');
                              obj.material.color = baseColor.lerp(tint, tintIntensity);
                            } catch (e) {
                              obj.material.color = new THREE.Color(globeConfig.globeColor || '#1e40af');
                            }
                            // emissive accent
                            try {
                              obj.material.emissive = new THREE.Color(globeConfig.emissive || '#ff6b81');
                              obj.material.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.18;
                            } catch (e) {}
                            obj.material.needsUpdate = true;
                          } catch (e) {}
                        }

                        // Replace material only if forceColor is explicitly true
                        if (globeConfig.forceColor) {
                          obj.material = themeMaterial;
                        }
                        // Otherwise keep the existing textured material
                        replaced += 1;
                      } catch (e) {
                        // ignore per-mesh failures
                      }
                    }
                  });
                } catch (e) {}

                console.debug('[Globe] replaced materials on meshes (attempt):', replaced);

                if (replaced === 0 && attempts < maxAttempts) {
                  setTimeout(tryReplace, intervalMs);
                }
              };

              // Start the first attempt shortly after ready; this gives globe.gl a
              // moment to create internals in case they're deferred.
              setTimeout(tryReplace, 80);
            } catch (e) {
              console.error('[Globe] onGlobeReady error:', e);
            }
          });

        // lighting: strong ambient + directional lights so globe is always visible
        const ambient = new THREE.AmbientLight(globeConfig.ambientLight || '#38bdf8', globeConfig.ambientIntensity ?? 1.0);
        const dirLeft = new THREE.DirectionalLight(globeConfig.directionalLeftLight || '#ffffff', globeConfig.directionalIntensityLeft ?? 1.0);
        dirLeft.position.set(-400, 100, 400);
        const dirTop = new THREE.DirectionalLight(globeConfig.directionalTopLight || '#ffffff', globeConfig.directionalIntensityTop ?? 0.8);
        dirTop.position.set(0, 500, 200);
        const pointLight = new THREE.PointLight(globeConfig.pointLight || '#ffffff', globeConfig.pointLightIntensity ?? 1.0);
        pointLight.position.set(200, 100, 200);
        globe.scene().add(ambient);
        globe.scene().add(dirLeft);
        globe.scene().add(dirTop);
        globe.scene().add(pointLight);

        // atmosphere: optional subtle glow sphere (disabled by default so globe is clearly visible)
        let atmosphereMesh = null;
        if (globeConfig.showAtmosphere && !globeConfig.forceColor) {
          try {
            const atmosphereColor = globeConfig.atmosphereColor || '#ffffff';
            const atmosphereAltitude = globeConfig.atmosphereAltitude || 0.1;
            const atmosphereMaterial = new THREE.MeshPhongMaterial({
              color: new THREE.Color(atmosphereColor),
              transparent: true,
              opacity: 0.04,
              side: THREE.BackSide,
              shininess: 0,
              emissive: new THREE.Color('#000000'),
              emissiveIntensity: 0,
            });
            const sphere = new THREE.SphereGeometry(1 + atmosphereAltitude, 64, 64);
            atmosphereMesh = new THREE.Mesh(sphere, atmosphereMaterial);
            globe.scene().add(atmosphereMesh);
          } catch (e) {
            // ignore atmosphere creation failures
          }
        }

        // apply controls-based rotation settings (if provided)
        try {
          const controls = globe.controls();
          if (globeConfig.autoRotate) controls.autoRotate = true;
          if (typeof globeConfig.autoRotateSpeed === 'number') controls.autoRotateSpeed = globeConfig.autoRotateSpeed;
          
          // Disable zoom in/out if specified
          if (globeConfig.disableZoom) {
            controls.enableZoom = false;
          }
          
          // Set min/max zoom distance to prevent zoom
          if (globeConfig.disableZoom && typeof globeConfig.cameraDistance === 'number') {
            controls.minDistance = globeConfig.cameraDistance;
            controls.maxDistance = globeConfig.cameraDistance;
          }
        } catch (err) {
          // ignore if controls aren't available yet
        }
        
        // Scale the globe down if specified
        if (globeConfig.globeScale && typeof globeConfig.globeScale === 'number') {
          try {
            globe.scale(globeConfig.globeScale);
          } catch (e) {
            // ignore if scale method isn't available
          }
        }

        // helper to set polygon visuals when GeoJSON is available
        async function loadGeoJson() {
          if (!dataUrl) return;
          try {
            const res = await fetch(dataUrl);
            if (!res.ok) return;
            const geo = await res.json();
            if (!mounted) return;
            const features = geo.features || geo;
            globe.polygonsData(features || [])
              .polygonCapColor(() => globeConfig.polygonColor || 'rgba(255,255,255,0.7)')
              .polygonSideColor(() => 'rgba(0,0,0,0)')
              .polygonStrokeColor(() => 'rgba(0,0,0,0)')
              .polygonLabel((f) => f.properties?.name || f.properties?.admin || '');
          } catch (err) {
            // network / parse errors are non-fatal here
          }
        }

        // helper to wire arcs (network lines) if provided
        function applyArcs(arcs = []) {
          if (!arcs || !arcs.length) return;
          globe
            .arcsData(arcs)
            .arcColor((d) => d.color || globeConfig.arcColor || '#38bdf8')
            .arcDashLength(globeConfig.arcLength ?? 0.9)
            .arcDashGap(globeConfig.arcDashGap ?? 4)
            .arcDashInitialGap(() => Math.random())
            .arcDashAnimateTime(globeConfig.arcTime ?? 1000)
            .arcAltitude((d) => d.arcAlt ?? 0.2);
        }

        // apply basic visuals
        if (globeConfig.pointSize) globe.pointAltitude((d) => (globeConfig.pointSize / 100) * (d.size || 1));

        // initial view (if provided)
        if (globeConfig.initialPosition && typeof globe.pointOfView === 'function') {
          const pos = globeConfig.initialPosition;
          try {
            globe.pointOfView({ lat: pos.lat, lng: pos.lng, altitude: pos.altitude ?? 1.5 }, 0);
          } catch (e) {}
        }

        // Make container transparent so the page background shows through
        try {
          if (ref.current) ref.current.style.background = 'transparent';
        } catch (e) {}

        // Set initial size
        if (ref.current) {
          const width = ref.current.clientWidth;
          const height = ref.current.clientHeight;
          if (width > 0 && height > 0) {
            globe.width(width).height(height);
          }
        }

        // load data
        loadGeoJson();
        if (data && data.length) applyArcs(data);

        // set responsiveness: resize on parent changes
        const ro = new ResizeObserver(() => {
          try {
            if (ref.current && mounted) {
              globe.width(ref.current.clientWidth);
              globe.height(ref.current.clientHeight);
            }
          } catch (e) {}
        });
        if (ref.current) ro.observe(ref.current);

        // Ensure the canvas itself is transparent (some renderers set a background)
        try {
          const renderer = globe.renderer && globe.renderer();
          if (renderer && renderer.domElement && renderer.domElement.style) {
            renderer.domElement.style.background = 'transparent';
            renderer.setClearColor && renderer.setClearColor(new THREE.Color(0x000000), 0);
          }
        } catch (e) {}

        // Cleanup function
        return () => {
          try {
            ro.disconnect();
          } catch (e) {}
          try {
            const renderer = globe.renderer();
            if (renderer && renderer.dispose) renderer.dispose();
          } catch (e) {}
          try {
            if (atmosphereMesh && globe.scene) globe.scene().remove(atmosphereMesh);
          } catch (e) {}
          if (ref.current) ref.current.innerHTML = '';
        };
      } catch (err) {
        console.error('Error initializing globe:', err);
      }
    }).catch((err) => {
      console.error('Failed to load globe dependencies:', err);
    });

    return () => {
      mounted = false;
    };
  }, [dataUrl, JSON.stringify(globeConfig), JSON.stringify(data || [])]);

  return <div ref={ref} style={{ width: '100%', height: '100%', background: 'transparent', ...style }} />;
}

export default World;
