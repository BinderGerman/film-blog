import { useForm } from "react-hook-form";

export const Form = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    reset();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[400px] space-y-4 font-sans mx-auto"
    >
      <div>
        <label className="text-white font-bold block mb-1" htmlFor="nombre">
          Tu nombre
        </label>
        <input
          className="w-full p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight-red"
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true, minLength: 2, maxLength: 30 })}
        />
      </div>

      <div>
        <label className="text-white font-bold block mb-1" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="w-full p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight-red"
          type="email"
          placeholder="ejemplo@correo.com"
          {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
      </div>

      <div>
        <label className="text-white font-bold block mb-1" htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          className="w-full p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight-red"
          placeholder="¿Sobre qué te gustaría hablar?"
          rows={6}
          {...register("mensaje", { required: true, minLength: 10 })}
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 p-3 rounded bg-highlight-red text-white font-bold text-lg hover:bg-red-700 transition"
      >
        Enviar
      </button>
    </form>
  );
};




