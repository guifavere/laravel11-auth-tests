import { useForm } from "react-hook-form"
import { Form, FormControl, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from "./components/ui/input";
import { api } from "./lib/api";

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

const csrf = () => api.get('/sanctum/csrf-cookie');

export const Register = () => {
  const form = useForm<FormValues>({ defaultValues });

  const onSubmit = async (data: FormValues) => {
    await csrf();

    const response = await api.post('/register', data);

    console.log('onSubmit', response.data);
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
