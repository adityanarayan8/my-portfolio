# Personal Portfolio

Website at [anarayan.dev](https://anarayan.dev/), built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **React Three Fiber**.

## Project Structure

- **`src/data/content.ts`**: Page content and portfolio data.
- **`src/data/garage.ts`**: Garage scene and car model configuration.

## 3D Assets

The car models are sourced from the **Khronos glTF Sample Assets**. The Car Concept model is licensed under **CC BY 4.0** and is credited on the portfolio page.

The studio HDRI is sourced from **Poly Haven** and is licensed under **CC0**.

Models are optimized using `gltf-transform` with Meshopt compression, WebP textures, and a maximum texture size of 1024px:

```bash
npx gltf-transform optimize in.glb out.glb \
  --compress meshopt \
  --texture-compress webp \
  --texture-size 1024
```
