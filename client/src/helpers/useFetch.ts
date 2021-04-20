import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import _ from "lodash";

export const useFetch = (item: string, length: number) => {
  const [state, setState] = useState<{ data: any[] | null; loading: boolean }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    fetch(API_URL)
      .then((x) => x.json())
      .then((y) => {
        console.log(y["Time Series (5min)"]);
        setState({
          data: _.values(y["Time Series (5min)"])
            .slice(0, length)
            .map((e) => Number(e[item])),
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [item, length]);
  return state;
};
