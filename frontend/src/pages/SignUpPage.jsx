import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      // The backend API URL
      await axios.post('http://localhost:3001/api/auth/signup', {
        ispName: data.ispName,
        ownerName: data.ownerName,
        ownerEmail: data.ownerEmail,
        password: data.password,
      });
      setSuccessMessage('Account created successfully! You can now log in.');
      reset();
    } catch (error) {
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create ISP Admin Account</CardTitle>
          <CardDescription>Practice Sign-Up Form</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && <p className="text-sm font-medium text-red-500">{serverError}</p>}
            {successMessage && <p className="text-sm font-medium text-green-500">{successMessage}</p>}

            <div>
              <Label htmlFor="ispName">ISP Name</Label>
              <Input id="ispName" {...register('ispName', { required: 'ISP Name is required' })} />
              {errors.ispName && <p className="text-xs text-red-500 mt-1">{errors.ispName.message}</p>}
            </div>

            <div>
              <Label htmlFor="ownerName">Owner's Full Name</Label>
              <Input id="ownerName" {...register('ownerName', { required: "Owner's Name is required" })} />
              {errors.ownerName && <p className="text-xs text-red-500 mt-1">{errors.ownerName.message}</p>}
            </div>

            <div>
              <Label htmlFor="ownerEmail">Owner's Email</Label>
              <Input id="ownerEmail" type="email" {...register('ownerEmail', { required: 'Email is required' })} />
              {errors.ownerEmail && <p className="text-xs text-red-500 mt-1">{errors.ownerEmail.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}