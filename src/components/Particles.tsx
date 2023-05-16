import { useEffect, useRef } from "react";
import { Space, SpaceRender } from "../utils/particles";

function Particles() {
  const spaceRef = useRef(null);

  useEffect(() => {
    let spaceRender = new SpaceRender(spaceRef);

    let space = new Space(
      spaceRender, // espacio disponible
      false,
      0.5,
      100, // cantidad de particulas
      10, // vision
      "#404040",
      1, // alineamiento
      0.5, // cohesion
      1 // separacion
    );

    let space2 = new Space(
      spaceRender, // espacio disponible
      true,
      0.5,
      50, // cantidad de particulas
      40, // vision
      "#7B61FF",
      4, // alineamiento
      2, // cohesion
      1 // separacion
    );
    let space3 = new Space(
      spaceRender, // espacio disponible
      false,
      0.3,
      20, // cantidad de particulas
      5, //vision
      "#f8f8f8",
      0.1, // alineamiento
      0.1, // cohesion
      1 // separacion
    );

    space.addToScene();
    space2.addToScene();
    space3.addToScene();
    space.animate();
    space2.animate();
    space3.animate();
    return () => {
      spaceRender.unMount();
    };
  }, []);
  return (
    <>
      <div className="absolute inset-0" ref={spaceRef} />
      <div className="absolute bottom-5 right-5 text-white font-primary opacity-50 font-bold pointer-events-none bg-[#222222] py-2 px-3 rounded-lg">
        Click me
      </div>
    </>
  );
}

export default Particles;
