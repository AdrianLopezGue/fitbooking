import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useRegisterPage = () => {
  const showToast = (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      theme: 'dark',
    });
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(data => {
    fetch('http://localhost:3333/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then(data => data.json())
      .then(data => {
        if (data.status !== 201) {
          showToast(data.message);
        }
      })
      .catch(error => showToast(error));
  });

  return { handleSubmit, form };
};
