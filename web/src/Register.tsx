import { useForm } from "react-hook-form"
import { Form, FormControl, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from "./components/ui/input";
import { csrf, register } from "./lib/api";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const defaultValues = {
  name: 'super-user',
  email: 'user@userland.com',
  password: 'password123',
};

export const Register = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({ defaultValues });

  const onSubmit = async ({ name, email, password }: FormValues) => {
    await csrf();
    await register({ name, email, password });
    navigate('/login');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormControl>
            <Input placeholder="name" {...form.register('name')} />
          </FormControl>
        </FormItem>
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
        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}
