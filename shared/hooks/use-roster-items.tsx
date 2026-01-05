import { RosterItem } from "@/generated/prisma/client";
import { rosterList } from "@/shared/services";
import React from "react";

export const useRosterItems = () => {
  const [rosterItems, setRosterItems] = React.useState<RosterItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getRostersList() {
      try {
        setIsLoading(true);
        const rosterItems = await rosterList();
        setRosterItems(rosterItems);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getRostersList();
  }, []);

  return { rosterItems, isLoading };
};
