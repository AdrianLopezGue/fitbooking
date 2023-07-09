import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/user-context';
import { boxActions } from '../../actions/box-actions';

export const useBoxCreationPage = () => {
  const [_boxData, setBoxData] = useState<{ name: string; location: string }>({
    name: '',
    location: '',
  });
  const { user, token } = useContext(UserContext);

  const form = useForm({
    defaultValues: {
      name: '',
      location: '',
    },
  });

  const handleSubmit = form.handleSubmit(data => {
    boxActions.createBox(data.name, data.location, user._id, token).then(() => {
      setBoxData({ name: data.name, location: data.location });
    });
  });

  return { handleSubmit, form, user };
};
