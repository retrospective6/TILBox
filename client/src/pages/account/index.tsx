import React, { useEffect } from 'react';
import Layout from '@/components/common/Layout';
import AccountEditForm, {
  AccountEditFormData,
} from '@/components/account/AccountEditForm';
import { useRouter } from 'next/router';
import useUser from '@/hooks/queries/user/useUser';
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

  const handleSignOut = async () => {
    await apis.users.deleteUser();
    await router.push('/');
  };

  return (
    <Layout>
      {user && (
        <AccountEditForm
          user={user}
          onSubmit={handleSubmit}
          onSignOut={handleSignOut}
        />
      )}
    </Layout>
  );
}
