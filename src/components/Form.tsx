import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  nombre: string;
  email: string;
  mensaje: string;
};

export const Form = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('email', data.email);
      formData.append('mensaje', data.mensaje);
      formData.append('_subject', 'Nuevo mensaje desde Los Olvidos de Cronos');
      formData.append('_template', 'box');
      formData.append('_captcha', 'false');
      formData.append('_autoresponse', 'Gracias por tu mensaje. Te responderé a la brevedad.');
      formData.append('_format', 'plain');
      formData.append('_no_ads', 'true');

      const response = await fetch('https://formsubmit.co/ajax/romanganuza@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
          {...register("nombre", { 
            required: "El nombre es requerido", 
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 30, message: "Máximo 30 caracteres" }
          })}
        />
        {errors.nombre && (
          <span className="text-red-500 text-sm mt-1">{errors.nombre.message}</span>
        )}
      </div>

      <div>
        <label className="text-white font-bold block mb-1" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="w-full p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight-red"
          type="email"
          placeholder="ejemplo@correo.com"
          {...register("email", { 
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo electrónico inválido"
            }
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label className="text-white font-bold block mb-1" htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          className="w-full p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight-red resize-none overflow-y-auto"
          placeholder="Hablemos"
          rows={6}
          {...register("mensaje", { 
            required: "El mensaje es requerido",
            minLength: { value: 10, message: "Mínimo 10 caracteres" }
          })}
        />
        {errors.mensaje && (
          <span className="text-red-500 text-sm mt-1">{errors.mensaje.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 p-3 rounded-lg bg-highlight-red text-highlight-white font-bold text-lg hover:bg-primary hover:text-highlight-white transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>

      <div className="h-8 mt-4">
        {submitStatus === 'success' && (
          <div className="text-emerald-700 text-center">
            ¡Mensaje enviado con éxito!
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-highlight-red text-center">
            Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
          </div>
        )}
      </div>
    </form>
  );
};




