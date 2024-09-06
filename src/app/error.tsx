"use client";

import EmptyState from "@/components/rent/EmptyState";
import React from "react";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
    return () => {};
  }, [error]);

  return (
    <div>
      <EmptyState title={"Oh So Soory"} subtitle={"Something went wrong"} />
    </div>
  );
};

export default ErrorState;
