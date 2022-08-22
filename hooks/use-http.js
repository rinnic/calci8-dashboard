import { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        data: null,
        pending: true,
        error: false,
      };
    case "SUCCESS":
      return {
        data: action.data,
        pending: false,
        error: false,
      };
    case "ERROR":
      return {
        data: null,
        pending: false,
        error: action.error,
      };
  }
};

const useHttp = (request, startWithPending = false) => {
  const initialState = {
    data: null,
    pending: startWithPending,
    error: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = async (data) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await request(data);
      const json = await response.json();
      dispatch({ type: "SUCCESS", data: json });
    } catch (error) {
      dispatch({ type: "ERROR", error });
    }
  };

  return [
    makeRequest,
    {
      pending: state.pending,
      data: state.data,
      error: state.error,
    },
  ];
};

export default useHttp;
