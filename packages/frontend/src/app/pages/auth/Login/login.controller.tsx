import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userActions } from '../../../actions/user-actions';
import { UserContext } from '../../../contexts/user-context';

export const useLoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ email: string; token: string }>({
    email: '',
    token: '',
  });
  const { setToken, setUser } = useContext(UserContext);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const showToast = (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      theme: 'dark',
    });

  const handleSubmit = form.handleSubmit(data => {
    userActions
      .login(data.email, data.password)
      .then(response => {
        if (response.error) {
          showToast(response.error);
          return;
        }

        setToken(response);
        setUserData({ email: data.email, token: response });
      })
      .catch(error => showToast(error));
  });

  useEffect(() => {
    if (userData.token) {
      userActions
        .getByEmail(userData.email, userData.token)
        .then(data => {
          setUser(data);
          navigate('/boxes');
        })
        .catch(error => showToast(error));
    }
  }, [userData, navigate, setUser]);

  return { handleSubmit, form };
};
