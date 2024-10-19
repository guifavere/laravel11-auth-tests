import { useForm } from "react-hook-form"
import { Form, FormControl, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from "./components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues = {
  email: 'user@userland.com',
  password: 'password123',
};

export const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const form = useForm<FormValues>({ defaultValues });

  const onSubmit = async ({ email, password }: FormValues) => {
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormControl>
            <Input placeholder="email" {...form.register('email')} />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormControl>
            <Input placeholder="password" type="password" {...form.register('password')} />
          </FormControl>
        </FormItem>
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}
