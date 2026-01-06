import { useEffect, useState } from "react";
import { studiosService } from "../services/studiosService";
import { useParams } from "react-router-dom";

export const Reservation = () => {
  const [studio, setStudio] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchStudio = async () => {
      const res = await studiosService.getStudioById(id);
      setStudio(res);
    };
    fetchStudio();
  }, []);

  return (
    <main class="flex justify-center">
      <div class="bg-sky-800/85 w-[75%] flex flex-col items-center my-15 p-5 pb-15 rounded-md">
        <h2 class="font-bold text-3xl mb-10">{studio.name}</h2>
      </div>
    </main>
  );
};
