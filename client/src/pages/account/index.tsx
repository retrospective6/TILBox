import React, { useEffect } from 'react';
import Layout from '@/components/common/Layout';
import AccountEditForm, {
  AccountEditFormData,
} from '@/components/account/AccountEditForm';
import { useRouter } from 'next/router';
import useUser from '@/hooks/queries/user/useUser';
import useUpdateUser from '@/hooks/queries/user/useUpdateUser';
import useDeleteUser from '@/hooks/queries/user/useDeleteUser';

export default function AccountPage(): JSX.Element {
  const router = useRouter();
  const { user, loggedOut } = useUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser({
    onSuccess() {
      router.push('/');
    },
  });

  useEffect(() => {
    if (loggedOut) {
      router.push('/');
    }
  }, [user, loggedOut, router]);

  const handleSubmit = async (data: AccountEditFormData) => {
    await updateUser(data);
  };

  const handleSignOut = async () => {
    await deleteUser();
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
