import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { promises as fs } from 'fs'
const loader = new GLTFLoader()
const files = [
  ['house-trad', 'D:/Mon_hoc/Ky_9/HCM/nep-nha-moi/public/models/house-trad.glb', -5.4],
  ['house-modern', 'D:/Mon_hoc/Ky_9/HCM/nep-nha-moi/public/models/house-modern.glb', 5.4],
]
for (const [name, path, hx] of files) {
  const data = await fs.readFile(path)
  const gltf = await loader.parseAsync(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), '')
  const box = new THREE.Box3().setFromObject(gltf.scene)
  const size = box.getSize(new THREE.Vector3())
  const scale = 4.2 / size.y
  const w = size.x * scale, h = size.y * scale, d = size.z * scale
  console.log(`${name}: orig(${size.x.toFixed(2)},${size.y.toFixed(2)},${size.z.toFixed(2)}) -> scaled(${w.toFixed(2)} x ${h.toFixed(2)} x ${d.toFixed(2)})`)
  console.log(`   footprint x [${(hx - w/2).toFixed(2)}..${(hx + w/2).toFixed(2)}], z [${(-0.6 - d/2).toFixed(2)}..${(-0.6 + d/2).toFixed(2)}] (front face at z=${(-0.6 + d/2).toFixed(2)})`)
}
