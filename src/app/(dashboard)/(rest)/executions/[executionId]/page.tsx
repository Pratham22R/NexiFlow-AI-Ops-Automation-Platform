interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const Page =async ({params}: PageProps) => {
    const {executionId} = await params;
  return (
    <div>Execution id is :{executionId} </div>
  )
}

export default Page