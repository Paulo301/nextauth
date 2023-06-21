import { AuthContext } from "@/contexts/AuthContext";
import { useCan } from "@/hooks/useCan";
import { setupAPIClient } from "@/services/api";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { useContext } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const userCanSeeMetrics = useCan({
    permissions: ['metrics.create']
  });

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      { userCanSeeMetrics && <div>Métricas</div> }
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');
  console.log(response.data)
  return {
    props: {}
  };
});