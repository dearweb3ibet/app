import BetCreateForm from "components/bet/BetCreateForm";
import BetCreatedMessage from "components/bet/BetCreatedMessage";
import Layout from "components/layout";
import { useState } from "react";

/**
 * Page to make a new bet.
 */
export default function NewBet() {
  const [createdBetId, setCreatedBetId] = useState<string | undefined>();

  return (
    <Layout>
      {createdBetId ? (
        <BetCreatedMessage id={createdBetId} />
      ) : (
        <BetCreateForm
          onSuccessCreate={(createdBetId) => setCreatedBetId(createdBetId)}
        />
      )}
    </Layout>
  );
}
