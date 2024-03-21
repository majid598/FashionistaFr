import { useState } from "react";
import AdminLayout from "../../../Components/Admin/AdminLayout";

const Toss = () => {
  const [angle, setAngle] = useState(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <AdminLayout>
      <div className="admin-container w-fix h-calc bg-white/10 flex flex-col items-center justify-center">
        <h1 className="text-4xl">Toss</h1>
        <section>
          <article
            className="tosscoin m-[2rem] w-44 h-44 relative cursor-pointer transition-all duration-500"
            onClick={flipCoin}
            style={{
              transform: `rotateY(${angle}deg)`,
            }}
          >
            <div className="bg-[url('../assets/heads.png')] w-full h-full bg-no-repeat absolute rounded-full grid place-items-center bg-contain"></div>
            <div className="bg-[url('../assets/tails.png')] -rotate-180 w-full h-full bg-no-repeat absolute rounded-full grid place-items-center bg-contain"></div>
          </article>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Toss;
