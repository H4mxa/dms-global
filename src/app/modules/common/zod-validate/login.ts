import {FormLoginType, FormRegisterType} from '@model/authentication';
import {z} from 'zod';

export const loginValidation = z.object<ZodShape<FormLoginType>>({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .refine(value => !/\s/.test(value), {
      message: 'Whitespace is not allowed',
    }),
});

export const RegisterValidation = z.object<ZodShape<FormRegisterType>>({
  name: z.string(),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .refine(value => !/\s/.test(value), {
      message: 'Whitespace is not allowed',
    }),
  confirmPassword: z
    .string()
    .min(1, 'confirmPassword is required')
    .refine(value => !/\s/.test(value), {
      message: 'Whitespace is not allowed',
    }),
});
