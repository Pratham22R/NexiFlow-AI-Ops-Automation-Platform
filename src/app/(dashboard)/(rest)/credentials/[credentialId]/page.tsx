interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { credentialId } = await params;
  return <div>CredentialId is: {credentialId}</div>;
};

export default Page;
