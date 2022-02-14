import React from 'react';

import Layout from '@/components/common/Layout';
import SignUpForm from '@/components/signup/SignUpForm';

export default function SignupPage(): JSX.Element {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  );
}
