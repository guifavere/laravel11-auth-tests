import { useForm } from "react-hook-form"
import { Form, FormControl, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from "./components/ui/input";
import { api } from "./lib/api";
import { useNavigate } from "react-router-dom";

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
  
  const form = useForm<FormValues>({ defaultValues });

  const onSubmit = async (data: FormValues) => {
    await api.post('/login', data);

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
