import React, { useEffect } from 'react';
import Layout from '@/components/common/Layout';
import AccountEditForm, {
  AccountEditFormData,
} from '@/components/account/AccountEditForm';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import apis from '@/apis';

export default function AccountPage(): JSX.Element {
  const { user, loggedOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loggedOut) {
      router.push('/');
    }
  }, [user, loggedOut, router]);

  const handleSubmit = async (data: AccountEditFormData) => {
    await apis.users.updateUser(data);
    router.reload();
  };

  return (
    <Layout>
      {user && <AccountEditForm user={user} onSubmit={handleSubmit} />}
    </Layout>
  );
}
