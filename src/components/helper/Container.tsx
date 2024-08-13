interface ContainerProps {
  children: React.ReactNode;
}

import React from "react";

const Container = ({ children }: ContainerProps) => {
  return (
    <section>
      <div className={"max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4"}>
        {children}
      </div>
    </section>
  );
};

export default Container;
