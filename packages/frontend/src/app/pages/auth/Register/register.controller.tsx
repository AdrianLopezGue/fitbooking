import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { userActions } from '../../../actions/user-actions';

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
    userActions
      .register(data.name, data.email, data.password)
      .catch(error => showToast(error));
  });

  return { handleSubmit, form };
};
