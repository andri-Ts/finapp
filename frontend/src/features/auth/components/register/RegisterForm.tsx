import Input from '@/components/ui/Input';
import styles from './register.module.css';
import { useForm } from 'react-hook-form';
import {
  type IRegisterFormData,
  registerSchema,
} from '../../schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import { registerUser } from '../../api/authApi';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: IRegisterFormData) => {
    try {
      const { confirmPassword, ...payload } = data; // confirmPswd sert juste à la validation front, pas besoin de l'envoier au back
      console.log('Payload envoyé: ', payload);

      await registerUser(payload);
      toast.success('Compte créer avec succes');
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'inscription");
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error('Cet email est déjà utilisé');
          return;
        }
      }

      toast.error('Impossible de créer le compte');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        id="pseudo"
        label="Pseudo"
        type="text"
        placeholder="Votre pseudo"
        autoComplete="username"
        error={errors.pseudo?.message}
        {...register('pseudo')}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Votre email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        autoComplete="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        id="confirmPassword"
        label="Confirmer le mot de passe"
        type="password"
        // placeholder="Confirmer le mot de passe"
        autoComplete="username"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Inscription...' : 'Créer un compte'}
      </Button>
    </form>
  );
}

export default RegisterForm;
