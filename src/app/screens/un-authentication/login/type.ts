import {FormLoginType} from '@model/authentication';

export interface FormLoginProps {
  isLoading: boolean;
  onSubmit: (data: FormLoginType) => void;
}
