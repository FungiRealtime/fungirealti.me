import * as React from "react";

function NestedNestedDemo({ children }: { children: React.ReactElement }) {
  return (
    <>
      <div>Here are your nested nested demo children: {children}</div>
      <div>And this was changed locally!. Woo</div>
    </>
  );
}

export default NestedNestedDemo;
