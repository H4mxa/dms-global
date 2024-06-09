import {useEventCallback} from '@common/hooks';
import {dispatch} from '@common/redux';
import {FormLoginType} from '@model/authentication';
import {loginActions} from '@redux/login';
import {selectIsFetching} from '@redux/login/selector';
import {useSelector} from 'react-redux';

export const useLogin = () => {
  // selectors
  const getIsFetching = useSelector(selectIsFetching);

  /*
    =================================================================
    --------------------- Login  Methods Start ----------------------
    =================================================================
  */

  const onSubmitLogin = useEventCallback((data: FormLoginType) => {
    dispatch(loginActions.processLoginApp(data as any));
  });

  /*
    =================================================================
    --------------------- Login  Methods End ------------------------
    =================================================================
  */
  const loginMethods = {
    onSubmitLogin,
  };

  return {
    isLoading: getIsFetching,
    loginMethods,
  };
};
